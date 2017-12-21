class Brain {

  static smartMove(board, depth, slotIndicator, winFn = Board.pureCheckWinner){
    if (typeof winFn !== 'function'){
      throw new Error('Parameter winFn must be a function!')
    }

    // TODO: Remove the emergency brakes 😱
    let emergencyBrake = 0

    // let stateCopy = deepCopy(board.state)
    // let moveIterator = stateCopy[Symbol.iterator]()
    // for (let move of board.possibleMoves){
    //   stateCopy[move].findIndex((slot) => {
    //     return (slot === 0)
    // })
    // }


    let search = testIterator(board.possibleMoves, board.state, slotIndicator)

    let moveToMake = recursor(search, winFn)

    return moveToMake

    // while (emergencyBrake < 10){
      // console.log(search.next())
      // console.log(winFn(search.next().value))
      // console.log(recursor(search, winFn))
      // recursor(search, winFn).value != 'undefined'
      // emergencyBrake++
    // }

  }
}

function recursor(iterator, winFn){

  //TODO: gör ny winfn utan co++
  return winFn(iterator.next().value) === 0 ? recursor(iterator, winFn) : iterator.next(true)

  // if (winFn(iterator.next().value) != 0){
  //   return iterator.next(true)
  // } else {
  //   recursor(iterator, winFn)
  // }

}

/**
 * Hc Svnt Dracones
 *
 * @param {any} moves
 * @param {any} state
 * @param {any} insertValue
 * @param {any} [move=moves.findIndex((x) => x === 1)]
 */
function* testIterator(moves, state, insertValue, move = moves.findIndex((x) => x === 1)){

  let nextArrayFn = deepCopyCurry(state)(insertValue)

  if (moves[move] === 0){
    yield* testIterator(moves, state, insertValue, move+1)
  }

  if (move < moves.length){
    let y = state[move].findIndex((slot) => {
      return (slot === 0)
    })
    let peekAMove = yield nextArrayFn(move)(y) || false
      if (peekAMove) {
        yield move
        peekAMove = false
      }
    yield* testIterator(moves, state, insertValue, move+1)
}
}


function deepCopy(array){
  return array.map((arr) => {
    return arr.slice();
});
}

function deepCopyCurry(array){
  return function(newValue){
    return function(x){
      return function(y){
        let newArray = deepCopy(array)
        newArray[x][y] = newValue
        return newArray
      }
    }
  }
}

function testSmartMove(){
  let slotIndicator = game.board.currentPlayer < 2 ? 1 : -1
  let prediction = Brain.smartMove(game.board, 1, slotIndicator)
  let move = prediction.value
  console.log(prediction)
  console.log(move)
  if (typeof move !== 'number'){
    move = ~~(Math.random() * 7)
  }
  // let parent = $('#column-' + move.toString())
  // game.board.createSingleSlot(parent, move);
  // game.board.checkWinner(game.board.state);

  let element = $($('#column-' + move.toString()).children()[0])
  game.board.click(element, game.board)

}
