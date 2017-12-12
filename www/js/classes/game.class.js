class Game {
  constructor(player1, player2, type){
    this.player1 = player1;
    this.player2 = player2;
    this.type = type;
  }

  newGame(){
    let board = new Board();
    board.generateBoard();
  }
}
