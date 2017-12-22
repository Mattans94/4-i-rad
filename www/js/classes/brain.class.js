class Brain {

/**
 * Calculates a move
 *
 * @static
 * @param {number} [depth=2] How far ahead to look, higher means more difficult
 * @param {Object} [board=game.board] The current board
 * @param {number} [slotIndicator=game.board.currentPlayer < 2 ? 1 : -1] Player identifier, 1 or -1
 * @param {any} [winFn=Board.pureCheckWinner] Function to check for wins
 * @returns a move to make or null if none is found
 * @memberof Brain
 */
static smartMove(depth = 2, board = game.board, slotIndicator = game.board.currentPlayer < 2 ? 1 : -1, winFn = Board.pureCheckWinner){
    if (typeof winFn !== 'function'){
      throw new Error('Parameter winFn must be a function!');
    }

    let generator = stateGenerator(board.state, slotIndicator, board.possibleMoves);

    let moveToMake = depth < 2 ? Brain.easyMove(generator, winFn) : Brain.mediumMove(generator, winFn);

    return moveToMake;

  }


  /**
   * Figures out a medium difficulty move.
   * Tries to win or at least block the opponent.
   *
   * @param {Generator} generator
   * @param {function} winFn
   * @memberof Brain
   */
  static mediumMove(generator, winFn){

    let index = generator.next()
      .value.concat(generator // Run twice and concat
        .next().value)
        .map((state) => winFn(state))
        .findIndex((move) => !!move);

    if (index != -1){
      return index % 7;
    } else {
      return null;
    }
  }

  /**
   * Figures out an easy difficulty move.
   * Only tries to win in a single move.
   *
   * @param {Generator} generator
   * @param {function} winFn
   * @memberof Brain
   */
  static easyMove(generator, winFn){

    let index = generator.next()
      .value
        .map((state) => winFn(state))
        .findIndex((move) => !!move);

    if (index != -1){
      return index;
    } else {
      return null;
    }
  }
}
/**
 * Hc Svnt Dracones
 *
 * @generator
 * @param {Array.<Array.<number>>} state original state
 * @param {number} insertValue value to insert, 1 or -1
 * @param {number|Array.<number>} moves where to insert
 * @yields {Array.<Array.<number>>|Array.<Array.<Array.<number>>>} New clones of states with inserted values
 */
function* stateGenerator(state, insertValue, moves){

  let nextArrayFn = deepCopyCurry(state)
  let moveFns = Array.isArray(moves) ? moves.map((legalMove, index) => {return legalMove == 1 ? nextArrayFn(index) : null}) : nextArrayFn(moves)

  if (!Array.isArray(moveFns)){
    var newMoves = yield moveFns()(insertValue);
    if (typeof newMoves == 'undefined'){
      newMoves = yield moveFns()(-insertValue); // Call twice to get new states for both players
    }
    if (typeof newMoves != 'undefined'){
      yield* stateGenerator(state, insertValue, newMoves);
    }
    return
  }

  // Moves is array, return many new states at once
  let stateFns = moveFns.map((fn) => typeof fn =='function' ? fn() : (x) => null)

  var newMoves = yield stateFns.map((fn) => fn(insertValue))
  if (typeof newMoves == 'undefined'){
    newMoves = yield stateFns.map((fn) => fn(-insertValue)) // Call twice to get new states for both players
  }
  if (typeof newMoves != 'undefined'){
  yield* stateGenerator(state, insertValue, newMoves)
  }
  return;
}


function deepCopy(matrix){
  return matrix.map((arr) => {
    return arr.slice();
  });
}

/**
 * @param {Array.<Array.<Number>>} matrix original state matrix to clone
 * @returns Curry 😉
 */
function deepCopyCurry(matrix){
  return /** @param {number} x column */ function(x){
    return /** @param {number} [y] optional y-coordinate, or finds first zero */ function(y) {
        y = typeof y === 'undefined' ? matrix[x].findIndex((slot) => {
          return (slot === 0)
        }) : y
      return /** @param {number} newValue @returns {Array.<Array.<number>>} a brand new matrix with the new value inserted */ function(newValue) {
        if (y === -1){
          return null; // Handle illegal moves
        }
        let newMatrix = deepCopy(matrix)
        newMatrix[x][y] = newValue
        return newMatrix
      }
    }
  }
}

function showMeTheWay(){
  let slotIndicator = game.board.currentPlayer < 2 ? 1 : -1
  let prediction = Brain.smartMove(2)
  if (prediction !== null) {
    console.log(prediction)
  }

}
