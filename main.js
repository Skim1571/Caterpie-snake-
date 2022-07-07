////////////Global Variables////////////
// play button
const btn = document.getElementById('btn')
// board information
const boardSection = document.getElementById('board-grid')
let boardMap = []
let square = document.querySelectorAll('.sq')
// snake information
let caterpiePosition = [];
let head = null;
let segment = null;
let tail = null;
let headDiv = null;
let segmentDiv = null;
// berry information
let berryPosition = [];
let berry = null;
let newBerry = null;
// movement information
const directionInput = document.getElementById('input')
let lastKeyDown = null;
let autoTime = null;
// score information
let playerName = null;
let score = 0;
let highscore = 0;

// Caterpie Classes
class Caterpie {
  constructor(positionId){
this.positionId = positionId
this.isHead = false;
  }
}
class Head extends Caterpie{
  constructor(positionId){
    super(positionId)
    this.isHead = true;
  }
  makeHead(){
    headDiv = document.createElement('div')
    headDiv.setAttribute('class','cHead')
    headDiv.innerHTML = 'V'
    caterpiePosition.push(3)
  }
  eat(){
  if(caterpiePosition[0] === berryPosition[0]){
    newBerry.removeBerry(caterpiePosition[0])
    score++
    scoreUpdater()
    // can't make the segment grow because it would either push the head forward or the tail backwards which could lead to it hitting a wall / body part. Only thing that would work is for the last place of where the tail was to be repopulated with the tail.
    segment.makeSegment()
    ranBerry()
  }
  }
}

class Segment extends Caterpie {
  constructor(positionId){
    super(positionId)
    
  }
  initSegment(){
    caterpiePosition.splice(caterpiePosition[caterpiePosition.length-1],0,caterpiePosition[caterpiePosition.length-1]-1)
  }
  makeSegment(){
    caterpiePosition.push(caterpiePosition[caterpiePosition.length-1])
  }
}

// berry class object
class Berry {
  constructor(){
  }
  createBerry(num){
    berryPosition.push(num)
}
  removeBerry(){
    this.berryObj = document.getElementById(`berry`)
    this.berryObj.remove()
    // newBerry.remove()
    berryPosition.pop()
  }
}

////////////functions////////////

//function to create board
const createBoard = (size) => {
  for (let i = 0; i < Math.pow(size,2); i++){
    let div = document.createElement(`div`)
    div.setAttribute('class','sq')
    div.setAttribute('id',`s${i}`)
    boardSection.appendChild(div)
  }
  boardSection.style.gridTemplateColumns = `repeat(${size}, minmax(25px, 25px))`;
  boardSection.style.gridTemplateRows = `repeat(${size}, minmax(25px, 25px))`;
  }

// create berry object
const createBerries = () => {
  newBerry = new Berry()
}

//randomize and create berry
const ranBerry = () => {
  let num = randomNum()
  let  isPositionTaken = false; 
  caterpiePosition.forEach((cP) => {
    if(cP === num){
      isPositionTaken = true;
      } else { 
        berryPosition.pop()
    }
  })
  if(isPositionTaken){
    ranBerry()}else{
    newBerry.createBerry(num)
  }
}
//random Number per boardsize
const randomNum = () => {
  return Math.round(Math.random()* Math.pow(size,2))
}

// create caterpie
const createCaterpie = () => {
  head = new Head()
  segment = new Segment()
  // tail = new Tail()
  head.makeHead()
  segment.initSegment()
  segment.initSegment()
  // tail.makeTail()
}

//render Caterpie & berry
const render = () => {
  square = document.querySelectorAll('.sq')
  square.forEach(sq => {
    sq.innerHTML = ''
  })
  collision()
  //restart needs to be in here
  caterpiePosition.forEach((cP, i) => {
    if(i === 0){
      document.getElementById(`s${cP}`).appendChild(headDiv)
    } else if(i !== 0) {
      segmentDiv = document.createElement('div')
      segmentDiv.setAttribute('class','cSeg')
      segmentDiv.setAttribute('id', `cSeg${caterpiePosition.length-1}`)
      segmentDiv.innerHTML = 'H'
      document.getElementById(`s${cP}`).appendChild(segmentDiv)
      } else{}
    })
    berryPosition.forEach((bP)=>{
      berry = document.createElement(`img-div`)
      berry.setAttribute('id','berry')
      berry.innerHTML = `<img src='https://archives.bulbagarden.net/media/upload/a/a9/Bag_Starf_Berry_Sprite.png'>`
      document.getElementById(`s${bP}`).appendChild(berry)
    })
    }
  
  // get boardMap
  const mapBoard = () => {
    square = document.querySelectorAll('.sq')
    square.forEach(sq => {
      boardMap.push(parseInt(sq.id.charAt(1)+sq.id.charAt(2)+sq.id.charAt(3)))
      
    })
  }

// collision check function
const collision = () => {
  const collisionTest = caterpiePosition.lastIndexOf(caterpiePosition[0])
  if( boardMap.includes(caterpiePosition[0])  &&  collisionTest === 0){
  } else {
    let prompt = confirm(`You Lose!\r\nPlay Again?`)
    if(prompt) {
      scoreUpdater()
      resetGame()
}
  }
  for(let i =1; i <= size; i++){
    if((caterpiePosition[0] === (parseInt(size)*i) && caterpiePosition[1] === ((parseInt(size)*i)-1)) || (caterpiePosition[1] === (parseInt(size)*i) && caterpiePosition[0] === ((parseInt(size)*i)-1)))
  {
    let prompt = confirm(`You Lose!\r\nPlay Again?`)
    if(prompt) {
      scoreUpdater()
      resetGame()
    }
}
}}

//directional input converted to movement
const directionalInput = (keyEvent) =>{ 
  if(keyEvent === 'ArrowUp'){
  caterpiePosition.unshift((parseInt(caterpiePosition[0]-parseInt(size))));
  caterpiePosition.pop();
  headDiv.style.transform = 'rotate(180deg)'
  segmentDiv.style.transform = 'rotate(90deg)'
} else if(keyEvent === 'ArrowDown'){
  caterpiePosition.unshift(parseInt(caterpiePosition[0]+parseInt(size)));
  caterpiePosition.pop();
  headDiv.style.transform = 'rotate(0deg)'
  segmentDiv.style.transform = 'rotate(90deg)'
} else if(keyEvent === 'ArrowLeft'){
  caterpiePosition.unshift(parseInt((caterpiePosition[0]-1)));
  caterpiePosition.pop();
  headDiv.style.transform = 'rotate(90deg)'
  segmentDiv.style.transform = 'rotate(180deg)'
} else if(keyEvent === 'ArrowRight'){
  caterpiePosition.unshift(parseInt((caterpiePosition[0]+1)));
  caterpiePosition.pop();
  headDiv.style.transform = 'rotate(-90deg)'
  segmentDiv.style.transform = 'rotate(180deg)'
}  
}

// takes last recorded key input and mimics another key press 
const keyPress = (lastKeyDown) => {
  directionalInput(lastKeyDown)
  head.eat();
  render()
  clearTimeout(autoTime)
  autoMove()
}

// automated movement
const autoMove = async () => {
  autoTime = await setTimeout(function(){
    keyPress(lastKeyDown)
  }, 500)
}

// win condition
const winCondition = () => {
  let sum;
  if(boardMap.forEach(bM => {
    sum += (parseInt(bM.charAt(1))+parseInt(bM.charAt(2))+parseInt(bM.charAt(3)))
  }) = caterpiePosition.forEach(cP => {
    sum += (parseInt(cP.charAt(1))+parseInt(cP.charAt(2))+parseInt(cP.charAt(3)))
  })){
    let prompt = confirm(`You win! Play Again?`)
    if(prompt) {
      scoreUpdater()
      resetGame()
    }
  }
}

//score
const scoreUpdater = () => {
  document.getElementById('score').innerHTML = score
  if(score > highscore){
    highscore = score
  }
  document.getElementById('highScore').innerHTML = highscore
}

////////////Init Game ////////////
const resetGame = () => {
// board information
boardSection.innerHTML = '';
boardMap = []
size =  prompt(`'what is the  board size?`)
square = null;
// snake information
caterpiePosition = [];
head = null;
segment = null;
tail = null;
headDiv = null;
segmentDiv = null;
// berry information
berryPosition = [];
berry = null;
newBerry = null;
// movement information
lastKeyDown = null;
autoTime = null;
// score information
playerName = null;
score = 0;
scoreUpdater()

////////////start game////////////
createBoard(parseInt(size))
mapBoard()
createCaterpie()
createBerries()
ranBerry()
render()
}

////////////event listeners////////////
//movement input listener
directionInput.addEventListener('keydown', (keyEvent) => {
  if(keyEvent.code !== lastKeyDown){
    directionalInput(keyEvent.code)
    lastKeyDown = keyEvent.code
    head.eat();
    render()
    clearTimeout(autoTime)
    autoMove()
  }
});

// Play game button listner
btn.addEventListener('click', resetGame)