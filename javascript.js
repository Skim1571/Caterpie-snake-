////////////Global Variables////////////
const boardSection = document.getElementById('board-grid')
const directionInput = document.getElementById('input')
let sNum = null;
let square = document.querySelectorAll('.sq')
let head = null;
let segment = null;
let tail = null;
const caterpiePosition = [0];
let size =  prompt(`'what is the  board size?`)
let berryPosition;

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
    head = document.createElement('div')
    head.innerHTML = 'H'
  }
  eat(){
  if(`s${caterpiePosition} === s${berryPosition}`){
    removeBerry()
    makeSegment()
  }
  //when eventListener triggers, (head goes into position where berry is), then the body will replicate and append to the head.
  }
  // movement(input){
  //     if(input === 'ArrowUp'){
  //       caterpiePosition.unshift(parseint(caterpiePosition[0]+size,10))
  //       caterpiePosition.pop();
  //     } else if(input === 'ArrowDown'){caterpiePosition.unshift(parseint(caterpiePosition[0]-size,10))
  //       caterpiePosition.pop();
  //     } else if(input === 'ArrowLeft'){caterpiePosition.unshift(parseint(caterpiePosition[0]-1,10));
  //       caterpiePosition.pop();
  //     } else if(input === 'ArrowRight'){caterpiePosition.unshift(parseint(caterpiePosition[0]+1,10));
  //       caterpiePosition.pop()
  //     }  
// }
}

class Segment extends Caterpie {
  constructor(positionId){
    super(positionId)
    
  }
  makeSegment(){
    segment = document.createElement('div')
    segment.innerHTML = 'S'
    caterpiePosition.splice(1,0,1)
    
  }
}

class Tail extends Caterpie {
  constructor(positionId){
    super(positionId)
    
    }
    makeTail(){
    tail = document.createElement('div')
    tail.innerHTML = 'T'
    caterpiePosition.splice(2,0,2)
    
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
    document.getElementById(`s${berryPosition}`).appendChild(berry)
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
    div.setAttribute('id',`s${i}`)
    boardSection.appendChild(div)
  }
  boardSection.style.gridTemplateColumns = `repeat(${size}, minmax(25px, 25px))`;
  boardSection.style.gridTemplateRows = `repeat(${size}, minmax(25px, 25px))`;
  }

// randomized berry
const createBerry = (random) => {
  const newBerry = new Berry()
  newBerry.createBerry(random)
}

const random = () => {
  randomPosition = Math.round(Math.random()*Math.pow(size,2))
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

// function to render caterpie
// const render = () => {
//   console.log(square)
//   square.forEach((sq)=>{
//     sq.innerHTML = ''
//     if( caterpiePosition[0] === sq.id){
//       sq.appendChild(head)
//       console.log(caterpiePosition[0])
//     } else if(sq.id !== caterpiePosition.length){
//       document.getElementById(`${caterpiePosition}`).appendChild(segment)
//     } else if(sq.id === caterpiePosition.length){
//       document.getElementById(`${caterpiePosition}`).appendChild(tail)
//     } else{
//     }
//     }
//     )
  // }
const render = () => {
  caterpiePosition.forEach((cP, i) => {
    if(i === 0){
      document.getElementById(`s${cP}`).appendChild(head)
    } else if(i !== caterpiePosition.length-1){
      document.getElementById(`s${cP}`).appendChild(segment)
    } else {
      document.getElementById(`s${cP}`).appendChild(tail)
    }
    }
    )
  }





////////////event listeners////////////
//movement input listener
directionInput.addEventListener('keydown', (keyEvent) => {
  console.log(caterpiePosition)
  console.log(keyEvent)
  if(keyEvent.code === 'ArrowUp'){
    caterpiePosition.unshift((parseInt(caterpiePosition[0]-parseInt(size))))
    caterpiePosition.pop();
  } else if(keyEvent.code === 'ArrowDown'){caterpiePosition.unshift(parseInt(caterpiePosition[0]+parseInt(size)))
    caterpiePosition.pop();
  } else if(keyEvent.code === 'ArrowLeft'){caterpiePosition.unshift(parseInt((caterpiePosition[0]-1)));
    caterpiePosition.pop();
  } else if(keyEvent.code === 'ArrowRight'){caterpiePosition.unshift(parseInt((caterpiePosition[0]+1)));
    caterpiePosition.pop()
  }  
  console.log(caterpiePosition)
  render()
});



////////////start game////////////
createBoard(parseInt(size))
createCaterpie()
render()
// createBerry(random())


////////////Credit & Source////////////
// Keyboard eventListener Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
