let board;

// Tell jsonflex what classes we expect it to save/load
JSON._classes(Board);

// Load json data
JSON._load('saves')
.then((data) => {
  // Retrieve the app from JSON
  // board = data.board;
  board = new Board();
})
.catch(() => {
  // No working json data
  // create new app
	board = new Board();
})
.then(() => {

	// console.log(board);
 //  // Tell the app to render to <main>
 //  board.generateBoard();
});

$(document).on('click', '.startGame', function(){
  let val1 = $('#playerName1').val();
  localStorage.setItem('player1Name', val1);
});

let url = location.pathname;

if(url == "/play.html") {
  let name1 = localStorage.getItem('player1Name');
  console.log(name1);
  document.write(name1);
}
