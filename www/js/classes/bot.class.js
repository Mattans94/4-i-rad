class Bot extends Player{

	constructor(name){
		super(name);

    // this.decisionFn = this.mediumMove;
    this.decisionFn = this.hardMove;

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
    let move = Brain.smartMove(2, board)
    if (move == null){
      move = this.randomMove(possibleMoves)
    }
    return move
  }

  hardMove(board = game.board, possibleMoves = game.board.possibleMoves){
    let move = Brain.smartMove(4, board)
    if (move == null){
      move = this.randomMove(possibleMoves)
    }
    if (Array.isArray(move)){
      console.log(move)
      move = this.randomMove(move)
    }
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
