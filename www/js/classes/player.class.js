class Player extends Game{

	constructor(name, color, playerId, type){
		this.name = name;
		this.color = color;
		this.numberOfMoves = 0;
		this.playerId = playerId;
		this.type = type;
	}

	makeMove();

}
