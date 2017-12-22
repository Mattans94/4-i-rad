class Bot extends Player{

	constructor(name){
		super(name);

    this.decisionFn = this.mediumMove;

	}

	randomMove(possibleMoves){
		let move = pickRandomFromArray(possibleMoves);
		return move;
  }

  easyMove(board = game.board, possibleMoves = game.board.possibleMoves){
    let move = Brain.smartMove(1);
    return move !== null ? move : this.randomMove();
  }

  mediumMove(board = game.board, possibleMoves = game.board.possibleMoves){
    // console.log(board.state.slice())
    let move = Brain.smartMove(2, board)
    console.log(move)
    // move != null ? move : this.randomMove();
    if (move == null){
      move = this.randomMove(possibleMoves)
    }
    // console.log(game.board.possibleMoves)
    return move
  }

}

function pickRandomFromArray(arr){
  let pick = 0;
  let index;
  while (pick === 0){
    index = Math.round(Math.random()*(arr.length-1));
    pick = arr[index];
  }
  return index;
}
