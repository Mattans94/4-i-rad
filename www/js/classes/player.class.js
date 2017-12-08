class Player{

	constructor(name, color, playerId){
		this.name = name;
		this.color = color;
		this.numberOfMoves = 0;
		this.playerId = playerId;
		this.type = 'human';
	}



	setType(response){
		this.type = response;
	}

}
