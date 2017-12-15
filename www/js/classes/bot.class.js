class Bot extends Player{

	constructor(){
		super();

	}

	randomMove(){
		let move = Math.round(Math.random()*6);

		return move;
	}

}