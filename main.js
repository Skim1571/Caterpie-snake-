////////////Global Variables////////////
const boardSection = document.getElementById('board-grid')
const directionInput = document.getElementById('input')
let sNum = null;
let square = document.querySelectorAll('.sq')
let head = null;
let segment = null;
let tail = null;
let headDiv = null;
let segmentDiv = null;
let berry = null;
let newBerry = null;
const caterpiePosition = [];
let size =  prompt(`'what is the  board size?`)
const berryPosition = [];

// Init Game


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
    headDiv.innerHTML = 'H'
    caterpiePosition.push(3)
  }
  eat(){
  if(caterpiePosition[0] === berryPosition[0]){
    console.log(`eat active`)
    newBerry.removeBerry(caterpiePosition[0])
    // can't make the segment grow because it would either push the head forward or the tail backwards which could lead to it hitting a wall / body part. Only thing that would work is for the last place of where the tail was to be repopulated with the tail.
    console.log(`eat method`, caterpiePosition)
    segment.makeSegment()
    console.log(`eat method2`, caterpiePosition)
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
    console.log(`make segment2`, caterpiePosition)
  }
}

// class Tail extends Caterpie {
//   constructor(positionId){
//     super(positionId)
    
//     }
//     makeTail(){
//     tailDiv = document.createElement('div')
//     tailDiv.innerHTML = 'T'
//     console.log(`initial tail`, caterpiePosition)
//     caterpiePosition.splice(caterpiePosition.length,0,parseInt(caterpiePosition[caterpiePosition.length-1]-1,10))
//     console.log(`make tail2`, caterpiePosition)
//   }
//   //tail needs to follow the last body part
// }

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
  console.log(`num`, num)
  let  isPositionTaken = false; 
  caterpiePosition.forEach((cP) => {
    if(cP === num){
      isPositionTaken = true;
      } else { 
        berryPosition.pop()
    }
  })
  console.log(`berryposition`, berryPosition)
  if(isPositionTaken){
    ranBerry()}else{
    newBerry.createBerry(num)
  }
}

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
  caterpiePosition.forEach((cP, i) => {
    if(i === 0){
      document.getElementById(`s${cP}`).appendChild(headDiv)
    } else if(i !== 0) {
      segmentDiv = document.createElement('div')
      segmentDiv.setAttribute('class','seg')
      segmentDiv.setAttribute('id', `seg${caterpiePosition.length-1}`)
      segmentDiv.innerHTML = 'S'
      document.getElementById(`s${cP}`).appendChild(segmentDiv)
      } else{}
    })
    berryPosition.forEach((bP,i)=>{
      berry = document.createElement(`img-div`)
      berry.setAttribute('id','berry')
      berry.innerHTML = `<img src=<https://static.wikia.nocookie.net/pokemon/images/c/c9/Dream_Starf_Berry_Sprite.png/revision/latest?cb=20210118073109>`
      document.getElementById(`s${bP}`).appendChild(berry)
    })
    }
  
// collison check function
const collison = () => {
  if(caterpiePosition[0] < 0 || (caterpiePosition[0] === size+1 && caterpiePosition[1] === size) || (caterpiePosition[0] === size && caterpiePosition[1]+1 === size) ){
    alert(`you lose`)
  }
}

////////////start game////////////
createBoard(parseInt(size))
createCaterpie()
createBerries()
ranBerry()
render()
////////////event listeners////////////
//movement input listener
directionInput.addEventListener('keydown', (keyEvent) => {
  if(keyEvent.code === 'ArrowUp'){
    caterpiePosition.unshift((parseInt(caterpiePosition[0]-parseInt(size))));
    caterpiePosition.pop();
  } else if(keyEvent.code === 'ArrowDown'){
    caterpiePosition.unshift(parseInt(caterpiePosition[0]+parseInt(size)));
    caterpiePosition.pop();
  } else if(keyEvent.code === 'ArrowLeft'){
    caterpiePosition.unshift(parseInt((caterpiePosition[0]-1)));
    caterpiePosition.pop();
  } else if(keyEvent.code === 'ArrowRight'){
    caterpiePosition.unshift(parseInt((caterpiePosition[0]+1)));
    caterpiePosition.pop();
  }  
  head.eat();
  render()
  collison()
});

////////////Credit & Source////////////
// Keyboard eventListener Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
