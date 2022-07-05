////////////Global Variables////////////
const boardSection = document.getElementById('board-grid')
const tileArr = []
const caterpiePosition = []
let size =  prompt(`'what is the  board size?`)

// Init Game


// Caterpie Classes
class Caterpie {
  constructor(){
this.id = snake
  }

}

class Head extends Caterpie{
  constructor(){
    super()
    this.position =  caterpiePosition.push(Math.ceil(Math.pow(size,2))/2)
  }
  eat(){
  //when eventListener triggers, (head goes into position where berry is), then the body will replicate and append to the head.
  }
}

class Body extends Caterpie {
  constructor(){
    super()
  }
  createBody(){
//create a new body part.

  }
  follow(){
//needs to follow the part that's 1 position ahead
  }
}

class Tail extends Caterpie {
  constructor(){
    super()
  }
  //tail needs to follow the last body part
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
}

createBoard(parseInt(size))

////////////event listeners////////////