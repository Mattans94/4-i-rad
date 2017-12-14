class Game {
  constructor(player1, player2, player1Type, player2Type){
    this.player1 = player1;
    this.player2 = player2;
    this.player1Type = player1Type;
    this.player2Type = player2Type;
  }

  newGame(){
    let board = new Board();
    board.generateBoard();
  }

  setName(player1, player2){
    let name1 = $('#playerName1').val();
    let name2 = $('#playerName2').val();
    name1 = this.player1;
    name2 = this.player2;
  }
}















let player1 = new Player();
let player2 = new Player();

$(document).on("click", "#switchButton1", function(){
	$("p.show").toggle();
	$("p.hidden").toggle();
	$('')
	let value = 'human';

	if ($("p.hidden").css("display") == "none"){
		value = 'human'
		console.log(value);
	} else {
		value = 'computer'
		console.log(value);
	}

	player1.setType(value);

});

$(document).on("click", "#switchButton2", function(){
	$("p.show2").toggle();
	$("p.hidden2").toggle();
	$('')
	let value = 'human';

	if ($("p.hidden2").css("display") == "none"){
		value = 'human'
		console.log(value);
	} else {
		value = 'computer'
		console.log(value);
	}

	player2.setType(value);
});