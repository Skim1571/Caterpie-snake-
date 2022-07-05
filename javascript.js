////////////Global Variables////////////
const boardSection = document.getElementById('board-grid')
const tileArr = []
const tileObj = {}
// for in loop
// need a unique key to 'mimic' a key ; call on the tiles by using something like tileObj[0]


// Init Game


// Caterpie Classes
class Caterpie {
  constructor(){
  }
}

class Head extends Caterpie{
  constructor(){
    super()
  }
}

class Body extends Caterpie {
  constructor(){
    super()
  }
}

class Tail extends Caterpie {
  constructor(){
    super()
  }
}


////////////functions////////////
const createBoard = (size) => {
let sqAmount = parseInt(size, 10)
  for (let i = 0; i < Math.pow(size,2); i++){
    let div = document.createElement(`div`)
    div.setAttribute('class','sq')
    div.setAttribute('id',`sq${i}`)
    boardSection.appendChild(div)
  }
  boardSection.style.gridTemplateColumns = `repeat(${size}, minmax(25px, 25px))`;
  boardSection.style.gridTemplateRows = `repeat(${size}, minmax(25px, 25px))`;
  }

createBoard(3)

////////////event listeners////////////