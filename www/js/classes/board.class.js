//TODO: Ändra till board.playerX.color överallt
const player1color = 'red'
const player2color = 'yellow'

class Board extends Base {
    constructor(game) {
        super();
        this.state = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];

        this.game = game;
        this.player1 = this.game.player1;
        this.player2 = this.game.player2;
        this.co = 0;
        this.winner = null;
        this.board = this.generateBoard();
        this.currentPlayer = 1;
        this.width = this.state.length;
        this.height = this.state[0].length;
        // this.hoverFn(player1color); //Moved into generateBoard
        this.possibleMoves = new Array(7).fill(1)
    }

    /**
     *
     *
     * @param {number} x Horizontal axis
     * @param {number} y Vertical axis
     * @returns  0 if empty, 1 for player 1, -1 for player 2, false if invalid slot
     * @memberof Board
     */
    getSlot(x, y) {
        if (x < this.state.length && y < this.state[0].length) {
            return this.state[x][y]
        } else {
            return false
        }
    }

    /**
     * Sets a slot to 1 for player 1 and -1 for player 2
     *
     * @param {number} x Horizontal axis
     * @param {number} y Vertical axis
     * @param {number} playerId Player 1 or 2
     * @returns true if valid coordinate
     * @memberof Board
     */
    setSlot(x, y, playerId) {
        try {
            this.state[x][y] = playerId < 2 ? 1 : -1
            return true
        } catch (error) {
            console.log('Invalid slot')
            return false
        }
    }

    get currentRound(){
      return Math.ceil(this.co/2);
    }

    nextPlayer() {
      this.currentPlayer ^= 3 // Switches between 1 and 2
        // this.currentPlayer ^= 1 // Switches between 1 and 0 instead
        // this.currentPlayer ^= -2 // Switches between 1 and -1
      if(this.currentPlayer === 1){
        this.hoverFn(player1color)
      }
      if(this.currentPlayer === 2){
        this.hoverFn(player2color)
      }
  }

    placeInColumn(column) {
        let y = this.state[column].findIndex((slot) => {
            return (slot === 0)
        })
        if (this.setSlot(column, y, this.currentPlayer)) {
            if (y === 6){
              this.possibleMoves[column] = 0
            }
            return y
        } else {
            return -1
        }

    }
    changePlayerColor(currentPlayer) {
        currentPlayer;
        let colorPlayer1 = "red";
        let colorPlayer2 = "#fdd91d";

        if (currentPlayer == 1) {
            $("p.player1").css("color", colorPlayer1);
            $("p.player2").css("color", "grey");
        } else {
            $("p.player1").css("color", "grey")
            $("p.player2").css("color", colorPlayer2);
        }

    }
    checkWinner(bd) {

      // console.log(bd);
      // Check down
      for (let row = 0; row < 6; row++) {

          for (let col = 0; col < 7; col++) {

              for (let player of [1, -1]) {

                  //vertical

                  // if(bd[col][row] == player){
                  //   console.log('col', col);
                  //   console.log('row',row);
                  // }

                  if (row < 3 && bd[col][row] == player && bd[col][row + 1] == player && bd[col][row + 2] == player && bd[col][row + 3] == player) {
                      this.winner = player;
                  }

                  // horizontal

                  if (col < 3 && bd[col][row] == player && bd[col + 1][row] == player && bd[col + 2][row] == player && bd[col + 3][row] == player) {
                      this.winner = player;
                  }

                  if (col < 4 && bd[col][row] == player && bd[col + 1][row + 1] == player && bd[col + 2][row + 2] == player && bd[col + 3][row + 3] == player) {
                      this.winner = player;
                  }

                  if (col > 2 && row < 3 && bd[col][row] == player && bd[col - 1][row + 1] == player && bd[col - 2][row + 2] == player && bd[col - 3][row + 3] == player) {
                      this.winner = player;
                  }
              }
          }
      }

      this.co++;
      if (this.winner != null) {
        this.winner = this.winner == 1 ? this.player1 : this.player2;
        this.winner.rounds = this.currentRound;
        this.game.highscoreList.register(this.winner);
        $('.board-column-hover').css({'opacity': '0'});
        $('#gameOverModal .modal-body').text(this.winner.name);
        $('#gameOverModal').modal();
        return true;
      } else if (this.co === 42) {
          this.winner = 'draw';
          $('.board-column-hover').css({'opacity': '0'});
          return true;
      } else {
        return false;
      }
  }

    click(element, instances){

      let parent = element.parent();
      // if(parent.hasClass('board-column')){
      //     this.createSlot(parent);
      // }

      // let e = element

    if (parent.hasClass('board-column-hover') && (this.winner === null)) {

      let childnumber = parseInt(parent[0].id.split('column-hover-').pop())
      const row = this.placeInColumn(childnumber)
      let parentchild = parent[0].parentElement.children[childnumber + 7]

      this.createSingleSlot($(parentchild), row);
      this.checkWinner(this.state);
      } else if (parent.hasClass('board-column') && (this.winner === null)){
      const row = this.placeInColumn(parent[0].id.split('column-').pop())
        this.createSingleSlot(parent, row);
        this.checkWinner(this.state);
    }
    // else {
    //   console.log('Game over'); // TODO: Remove
    // }
  }


    generateBoard() {
        this.render('section.boardarea');
        $(() => {
          this.hoverFn(player1color);
      });

    }


    createSlot(parent) {
        console.log('working', parent);
        this.render(parent, '2');
    }

    createSingleSlot(parent, row){
      // console.log(parent[0].id.split('column-').pop())
      // const row = this.placeInColumn(parent[0].id.split('column-').pop())
      if (row != -1){
      let element = parent[0].children[this.height - row - 1]
      if (this.currentPlayer == 1){
        element.className += ' red'

      } else if (this.currentPlayer == 2){
        element.className += ' yellow'

      }
      // $(parent).hover(function(){
      // })
      this.nextPlayer()
    }
  }


    //need to add id on them as well but here is a start on the board

    template(){
      let returnValue = '<div class="board">';
      let inner = '', column = '';
      let innerhover = '', columnhover = '';

      for (let co = 0; co < 1; co++) {
          innerhover += '<div class="board-slot-hover"></div>';
      };

      for (let co = 0; co < 7; co++) {
          column += '<div class="board-column-hover" ' + 'id="column-hover-' + co + '">' + innerhover + '</div>';
      };

      for (let co = 0; co < 6; co++) {
          inner += '<div class="board-slot"></div>';
      };

      for (let co = 0; co < 7; co++) {
          column += '<div class="board-column" ' + 'id="column-' + co + '">' + inner + '</div>';
      };

      return returnValue += returnValue + columnhover + column + '</div>';

  }


/**
 *
 * @param {string} color
 */
hoverFn(color) {
  let hoverdiv;
  let board = this;
  $('.board-slot-hover').hover(
    function() {
      $(this).css({
        background: color
        // opacity: '100'
      })
      $(this).click(function() {
        // console.log(((board.currentPlayer == 1) ? player2color: player1color))
        $(this).css({
          background: color
          // opacity: '100'
        })
      })
    },
    function() {
      $(this).css({
        background: 'white'
        // opacity: '0'
      })
    }
  );
  $('.board-column .board-slot').hover(
    function() {
      // $(this).css("background", "red");
      hoverdiv = $(this)
        .parent()
        .parent()
        .children(
          '#column-hover-' +
            $(this)
              .parent()
              .attr('id')
              .split('column-')
              .pop()
        )
        .children('.board-slot-hover');
        hoverdiv.css({
          // background: board.currentPlayer == 1 ? player1color : player2color
          background: color
          // opacity: '100'
        });
      $(this).click(() => {
        // console.log(((board.currentPlayer == 1) ? player2color: player1color))
        hoverdiv.css({
          background: color
          // background: board.currentPlayer == 1 ? player2color : player1color
          // opacity: '100'
        })
      });
    },
    function() {
      // $(this).css('background', 'white');
      if (hoverdiv) {
        console.log(hoverdiv)
        hoverdiv.css({
          background: 'white',
          // opacity: '0'
        })
      }
    }
  );
}

static pureCheckWinner(bd){

  if (typeof bd === 'undefined'){
    return null
  }

  let winner = 0;
  for (let row = 0; row < 6; row++) {

    for (let col = 0; col < 7; col++) {

        for (let player of [1, -1]) {

            //vertical

            // if(bd[col][row] == player){
            //   console.log('col', col);
            //   console.log('row',row);
            // }

            if (row < 3 && bd[col][row] == player && bd[col][row + 1] == player && bd[col][row + 2] == player && bd[col][row + 3] == player) {
                return player;
            }

            // horizontal

            if (col < 3 && bd[col][row] == player && bd[col + 1][row] == player && bd[col + 2][row] == player && bd[col + 3][row] == player) {
                return player;
            }

            if (col < 4 && bd[col][row] == player && bd[col + 1][row + 1] == player && bd[col + 2][row + 2] == player && bd[col + 3][row + 3] == player) {
                return player;
            }

            if (col > 2 && row < 3 && bd[col][row] == player && bd[col - 1][row + 1] == player && bd[col - 2][row + 2] == player && bd[col - 3][row + 3] == player) {
                return player;
            }
        }
    }
}
return winner;
}

}


