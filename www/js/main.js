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
