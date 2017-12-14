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
