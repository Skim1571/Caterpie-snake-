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
let tailDiv = null;
let newBerry = null;
const caterpiePosition = [];
let size =  prompt(`'what is the  board size?`)
let berryPosition = [];

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
    console.log(`before`, caterpiePosition[0])
    console.log(`before`, berryPosition[0])
  if(caterpiePosition[0] === berryPosition[0]){
    newBerry.removeBerry(caterpiePosition[0])
    // can't make the segment grow because it would either push the head forward or the tail backwards which could lead to it hitting a wall / body part. Only thing that would work is for the last place of where the tail was to be repopulated with the tail.
    segment.makeSegment
    ranBerry()
  }
  }
}

class Segment extends Caterpie {
  constructor(positionId){
    super(positionId)
    
  }
  makeSegment(){
    segmentDiv = document.createElement('div')
    segmentDiv.innerHTML = 'S'
    console.log(caterpiePosition)
    caterpiePosition.splice(caterpiePosition.length,0,caterpiePosition[caterpiePosition.length])
    console.log(caterpiePosition)
    
  }
}

class Tail extends Caterpie {
  constructor(positionId){
    super(positionId)
    
    }
    makeTail(){
    tailDiv = document.createElement('div')
    tailDiv.innerHTML = 'T'
    caterpiePosition.splice(caterpiePosition.length,0,caterpiePosition[caterpiePosition.length-1])
    
    }
  //tail needs to follow the last body part
}

// berry class object
class Berry {
  constructor(){
    this.berryPosition = berryPosition
  }
  createBerry(num){
    const berry = document.createElement(`img-div`)
    berry.setAttribute('id','berry')
    berry.innerHTML = `<img src=<https://static.wikia.nocookie.net/pokemon/images/c/c9/Dream_Starf_Berry_Sprite.png/revision/latest?cb=20210118073109>`
    document.getElementById(`s${num}`).appendChild(berry)
    berryPosition.push(num)
}
  removeBerry(num){
    console.log(document.getElementById(`s${num}`).children[0])
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
  if(document.getElementById(`s${num}`).innerHTML === ""){
  newBerry.createBerry(num)} else { 
    console.log(document.getElementById(`s${num}`).innerHTML)
    ranBerry();
  }
}

const randomNum = () => {
  return Math.round(Math.random()*Math.pow(size,2))
}

//function to create caterpie
const createCaterpie = () => {
  head = new Head()
  segment = new Segment()
  tail = new Tail()
  head.makeHead()
  segment.makeSegment()
  tail.makeTail()
}

const render = () => {
  caterpiePosition.forEach((cP, i) => {
    if(i === 0){
      document.getElementById(`s${cP}`).appendChild(headDiv)
    } else if(i !== caterpiePosition.length-1){
      document.getElementById(`s${cP}`).appendChild(segmentDiv)
    } else {
      document.getElementById(`s${cP}`).appendChild(tailDiv)
    }
    }
    )
  }

////////////start game////////////
createBoard(parseInt(size))
createCaterpie()
render()
createBerries()
ranBerry()
////////////event listeners////////////
//movement input listener
directionInput.addEventListener('keydown', (keyEvent) => {
  if(keyEvent.code === 'ArrowUp'){
    caterpiePosition.unshift((parseInt(caterpiePosition[0]-parseInt(size))));
    caterpiePosition.pop();
    head.eat();
  } else if(keyEvent.code === 'ArrowDown'){caterpiePosition.unshift(parseInt(caterpiePosition[0]+parseInt(size)));
    caterpiePosition.pop();
    head.eat();
  } else if(keyEvent.code === 'ArrowLeft'){caterpiePosition.unshift(parseInt((caterpiePosition[0]-1)));
    caterpiePosition.pop();
    head.eat();
  } else if(keyEvent.code === 'ArrowRight'){caterpiePosition.unshift(parseInt((caterpiePosition[0]+1)));
    caterpiePosition.pop();
    head.eat();
  }  
  render()
});

////////////Credit & Source////////////
// Keyboard eventListener Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
