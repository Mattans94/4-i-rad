let board;

// Tell jsonflex what classes we expect it to save/load
JSON._classes(Board);

// Load json data
JSON._load('saves')
.then((data) => {
  // Retrieve the app from JSON
  board = data.board;
})
.catch(() => {
  // No working json data
  // create new app
	let board = new Board();
})
.then(() => {

	// console.log(board);
 //  // Tell the app to render to <main>
 //  board.generateBoard();
});








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
