class Bot extends Player{

	constructor(name){
		super(name);

    this.decisionFn = this.mediumMove();

	}

	randomMove(){
		let move = Math.round(Math.random()*6);
		return move;
  }

  easyMove(){
    let move = Brain.smartMove(1);
    return move !== null ? move : this.randomMove();
  }

  mediumMove(){
    let move = Brain.smartMove(2)
    return move !== null ? move : this.randomMove();
  }

}
