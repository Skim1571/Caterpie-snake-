////////////Global Variables////////////
const boardSection = document.getElementById('board-grid')
const square = document.getElementsByClassName('sq')
const tileArr = []
const caterpiePosition = [0]
let size =  prompt(`'what is the  board size?`)
let berryPosition;

// Init Game


// Caterpie Classes
class Caterpie {
  constructor(){
this.id = 'snake'
this.isHead = false;
  }
  follow(){
    if(!this.isHead)
    
    //needs to follow the part that's 1 position ahead
      }
}

class Head extends Caterpie{
  constructor(){
    super()
    this.isHead = true;
  }
  makeHead(){
    const head = document.createElement('div')
    head.innerHTML = 'H'
    document.getElementById(`sq${caterpiePosition}`).appendChild(head)
  }
  eat(){
  if(`sq${caterpiePosition} === sq${berryPosition}`){
    removeBerry()
    makeSegment()
  }
  //when eventListener triggers, (head goes into position where berry is), then the body will replicate and append to the head.
  }
}

class Segment extends Caterpie {
  constructor(){
    super()
    
  }
  makeSegment(){
    const segment = document.createElement('div')
    segment.innerHTML = 'S'
    caterpiePosition.splice(1,0,1)
    document.getElementById(`sq${caterpiePosition[1]}`).appendChild(segment)
  }
}

class Tail extends Caterpie {
  constructor(){
    super()
    }
    makeTail(){
    const segment = document.createElement('div')
    segment.innerHTML = 'T'
    caterpiePosition.splice(2,0,2)
    document.getElementById(`sq${caterpiePosition[2]}`).appendChild(segment)
    }
  //tail needs to follow the last body part
}

// berry class object
class Berry {
  constructor(){
    this.berryPosition = berryPosition
  }
  createBerry(berryPosition){
    const berry = document.createElement(`img-div`)
    berry.setAttribute('class','berry')
    berry.innerHTML = `<img src=<https://static.wikia.nocookie.net/pokemon/images/c/c9/Dream_Starf_Berry_Sprite.png/revision/latest?cb=20210118073109>`
    document.getElementById(`sq${berryPosition}`).appendChild(berry)
  }
  removeBerry(){
    berry.remove()
  }
}


////////////functions////////////

//function to create board
const createBoard = (size) => {
  for (let i = 0; i < Math.pow(size,2); i++){
    let div = document.createElement(`div`)
    div.setAttribute('class','sq')
    div.setAttribute('id',`sq${i}`)
    boardSection.appendChild(div)
  }
  boardSection.style.gridTemplateColumns = `repeat(${size}, minmax(25px, 25px))`;
  boardSection.style.gridTemplateRows = `repeat(${size}, minmax(25px, 25px))`;
  }

//function to create caterpie
const createCaterpie = () => {
  const head = new Head()
  const segment = new Segment()
  const tail = new Tail()
  head.makeHead()
  segment.makeSegment()
  tail.makeTail()
  
}

// randomized berry
const createBerry = (random) => {
    const newBerry = new Berry()
    newBerry.createBerry(berryPosition)
  }

  const random = () => {
    berryPosition = Math.round(Math.random()*Math.pow(size,2))
  }

createBoard(parseInt(size))
createCaterpie()
createBerry(random())

////////////event listeners////////////