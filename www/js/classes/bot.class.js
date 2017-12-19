class Bot extends Player{

	constructor(name){
		super(name);


	}

	randomMove(){
		let move = Math.round(Math.random()*6);

		return move;
	}

}