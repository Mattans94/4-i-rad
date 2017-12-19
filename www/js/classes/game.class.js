class Game{
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


	setPlayer1Type(response){
		this.player1Type = response;
	}

	setPlayer2Type(response){
		this.player2Type = response;
	}
}



//Change stored player type on button click
$(document).on("click", "#switchButton1", function(){
	$("p.show").toggle();
	$("p.hidden").toggle();
  $('.player1RadioBtns').toggleClass('d-none');

	let value = 'human';

	if ($("p.hidden").css("display") == "none"){
		value = 'human'
		console.log(value);
	} else {
		value = 'computer'
		console.log(value);
	}

	game.player1Type = value;
  localStorage.setItem('player1Type', value);
});

$(document).on("click", "#switchButton2", function(){
	$("p.show2").toggle();
	$("p.hidden2").toggle();
  $('.player2RadioBtns').toggleClass('d-none');

	let value = 'human';

	if ($("p.hidden2").css("display") == "none"){
		value = 'human'
		console.log(value);
	} else {
		value = 'computer'
		console.log(value);
	}

	game.player2Type = value;
  localStorage.setItem('player2Type', value);
});

let url = location.pathname;

//Default values for player type is human, only if page is not play.html
if(!(url == '/play.html')){
  localStorage.setItem('player1Type', "human");
  localStorage.setItem('player2Type', "human");
}

$(document).on('click', '.startGame', function(){
  let val1 = $('#playerName1').val();
  let val2 = $('#playerName2').val();
  localStorage.setItem('player1Name', val1);
  localStorage.setItem('player2Name', val2);
});
//If play.html, get player names and types and render to page
if(url == "/play.html") {
  let name1 = localStorage.getItem('player1Name');
  let name2 = localStorage.getItem('player2Name');
  let type1 = localStorage.getItem('player1Type');
  let type2 = localStorage.getItem('player2Type');
  console.log(name1 + " is type " + type1);
  console.log(name2 + " is type " + type2);
  $('.player1').html(name1);
  $('.player2').html(name2);
}
