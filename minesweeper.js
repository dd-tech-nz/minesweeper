document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = initBoard()



function startGame() {
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
  document.getElementById("reset").onclick = function () {
    play("myAudio"); setTimeout(function () { location.reload(); }, 2000);
  }
 
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  var mineCount = 0
  var markedCount = 0
  var cellShow = 0
  

  for (var j = 0; j < board.cells.length; j++) {
    if (board.cells[j].isMine) {
      mineCount++
    }
    if (board.cells[j].isMarked) {
      markedCount++

    }
    if (board.cells[j].hidden == false) {
      cellShow++
    }
  }

  if ((mineCount !== markedCount) || (markedCount + cellShow < 16)) {
    return
  } else {
    play("hope")
    lib.displayMessage('You win!')
    
  }
}

 

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  
  var count = 0
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  //console.log(surrounding)
  for (var i = 0; i < surrounding.length; i++) {
    surrounding[i].isMine ? count ++ : count
          
  }

  
  
  return count
}

function initBoard() {
  var board = {}
  board.cells = []
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      
       board.cells.push({ row: i, col: j, isMine: (Math.random() >= 0.7), isMarked: false, hidden: true })
    }
      
    
    
  }
  return board
}

function play(clipId) {
  var x = document.getElementById(clipId);
  x.play();
}




