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
        this.width = this.state.length;
        this.height = this.state[0].length;
        // this.hoverFn(player1color); //Moved into generateBoard
        this.possibleMoves = new Array(7).fill(1)
        this.currentPlayer = 2; // Game starts by switching to player 1
    }

    /**
     * Gets a slot
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
            if(playerId == 1){
              $('#player1moves').text(this.currentRound +1);
            }
            if(playerId == 2){
              $('#player2moves').text(this.currentRound );
            }
            return true
        } catch (error) {
            // console.log('Invalid slot')
            return false
        }
    }

    get currentRound(){
      return Math.ceil(this.co/2);
    }

    nextPlayer() {
      if(!!this.winner){
        return;
      }
      // console.log(this.winner)
      const delay = (this.player1.constructor.name == 'Bot' && this.player2.constructor.name == 'Bot') ? 250 : 750
      const oldClickFn = this.click
      const oldHoverFn = this.hoverFn
      this.currentPlayer ^= 3 // Switches between 1 and 2
        // this.currentPlayer ^= 1 // Switches between 1 and 0 instead
        // this.currentPlayer ^= -2 // Switches between 1 and -1
      this.changePlayerColor();
      if(this.currentPlayer === 1){
        if (this.player1.constructor.name == 'Human'){
          // $('.board-slot-hover').css({"opacity": "100"})

          $('.board-slot-hover').fadeTo(400, 1)

          // this.hoverFn(player2color)
        } else {
          $('.board-slot-hover').css({"opacity": "0"})
          // this.hoverFn(player2color)
          this.click = $.noop;
          // this.hoverFn = null;
          let move = this.player1.decisionFn(this, this.possibleMoves);
          let element = $($('#column-' + move.toString()).children()[0])
          setTimeout((() => {
            this.click = oldClickFn;
            // this.hoverFn = oldHoverFn;
            this.click(element, this)
            this.hoverTrigger()
          }), delay)
          // this.click(element, this)
        }
      }
      if(this.currentPlayer === 2){
        if (this.player2.constructor.name == 'Human'){
          $('.board-slot-hover').fadeTo(400, 1)
          // $('.board-slot-hover').css({"opacity": "100"})
          // this.hoverFn(player1color)
        } else {
          $('.board-slot-hover').css({"opacity": "0"})
          // this.hoverFn(player1color)
          this.click = $.noop;
          // this.hoverFn = null;
          let move = this.player2.decisionFn(this, this.possibleMoves);
          let element = $($('#column-' + move.toString()).children()[0])
          // console.log(element)
          setTimeout((() => {
            this.click = oldClickFn;
            // this.hoverFn = oldHoverFn;
            this.click(element, this)
            // element.trigger('click')
            // element.trigger('mouseenter')
            // element.trigger('click')
            this.hoverTrigger()
            // element.trigger('mouseleave')
          }), delay)
          // this.click(element, this)
        }
      }
  }

    placeInColumn(column) {
        let y = this.state[column].findIndex((slot) => {
            return (slot === 0)
        })
        if (this.setSlot(column, y, this.currentPlayer)) {
          if (y === 5){
              this.possibleMoves[column] = 0
            }
            return y
        } else {
            return -1
        }

    }
    changePlayerColor() {
        let currentPlayer = this.currentPlayer;
        let colorPlayer1 = "#dc3545";
        let colorPlayer2 = "#fdd91d";

        if (currentPlayer == 1) {
            $("#player1card").css("background", colorPlayer1);
            $("#player2card").css("background", "rgba(200,200,200,0.9)");
        } else {
            $("#player1card").css("background", "rgba(200,200,200,0.9)")
            $("#player2card").css("background", colorPlayer2);
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

                  if (col < 4 && bd[col][row] == player && bd[col + 1][row] == player && bd[col + 2][row] == player && bd[col + 3][row] == player) {
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
        $('#gameOverModal').append('<div class="confetti"></div>');
        return true;
      } else if (this.co === 42) {
          this.winner = 'draw';
          $('.board-column-hover').css({'opacity': '0'});
          $('#gameOverModal .modal-title').text('');
          $('#gameOverModal .modal-content').css({
            'background-image':'url("../imgs/sad.jpg")',
            'background-size' : 'contain',
            'background-repeat' : 'no-repeat'
          });
          $('#gameOverModal .modal-body').addClass('draw').text(`Sorry it's a draw`);
          $('#gameOverModal').modal();
          return true;
      } else {
        return false;
      }
  }

    click(element, instances){
      // console.log(element)
      let parent = element.parent();
      // if(parent.hasClass('board-column')){
      //     this.createSlot(parent);
      // }

      // let e = element

    if (this.winner !== null){
      return;
    }
    let row;
    let target;
    let animationElement;
    if (parent.hasClass('board-column-hover')) {
        let childnumber = parseInt(parent[0].id.split('column-hover-').pop())
        row = this.placeInColumn(childnumber)
        let parentchild = parent[0].parentElement.children[childnumber + 7]
        target = $(parentchild);
        animationElement = element;
      } else if (parent.hasClass('board-column')) {
        let columnNumber = parent[0].id.split('column-').pop()
        row = this.placeInColumn(columnNumber)
        target = parent;
        animationElement = $('#column-hover-' + columnNumber + ' .board-slot-hover').last()
        // console.log(animationElement);
    }
    if (row === -1){
      return;
    }
    // console.log(animationElement)
    let player = this.currentPlayer;
    let currentState = deepCopy(this.state);
    let callback = () => {
    if (this.winner === null) {
        this.createSingleSlot(target, row, player);
        this.checkWinner(currentState);
      }
    }
    this.animateDivToRow(animationElement, row, callback);
    // console.log(this.state)
    this.nextPlayer();
    this.hoverTrigger();
    // this.createSingleSlot(target, row);
    // return this.checkWinner(this.state);
  }


    generateBoard() {
        this.render('section.boardarea');
        $(() => {
          this.hoverFn();
      });
    }


    createSingleSlot(parent, row, player = this.currentPlayer){
      if (row != -1){
      let element = parent[0].children[this.height - row - 1]
      if (player == 1){
        element.className += ' red'
      } else if (player == 2){
        element.className += ' yellow'
      }
      // console.log(row)

      // this.animateTo(row)

      // this.nextPlayer()
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
 * Sets up hover-slots
 */
hoverFn() {
  let hoverdiv;
  let board = this;
  // console.log(hoverdiv)
  $('.board-slot-hover').hover(
    function() {
      board.hoverTarget = $(this);
      $(this).css({
        // background: color
        background: board.currentPlayer == 1 ? player1color : player2color
        // opacity: '100'
      })
      $(this).click(function() {
        $(this).css({
          background: board.currentPlayer == 1 ? player2color : player1color
        })
      })
    },
    function() {
      board.hoverTarget = null;
      $(this).css({
        background: 'white'
      })
    }
  );
  $('.board-column .board-slot').hover(
    function() {
      // $(this).css("background", "red");
      board.hoverTarget = hoverdiv = $(this)
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
          background: board.currentPlayer == 1 ? player1color : player2color
        });

      $(this).click(() => {
        // hoverdiv.css({
        //   background: board.currentPlayer == 1 ? player2color : player1color
        // })
      });
    },
    function() {
      // $(this).css('background', 'white');
      if (hoverdiv) {
        board.hoverTarget = null;
        // console.log(hoverdiv)
        hoverdiv.css({
          background: 'white',
        })
      }
    }
  );
}

set hoverTarget(hoverdiv){
  this.hoverTrigger = (hoverdiv !== null) ? () => {
    hoverdiv.css({background: this.currentPlayer == 1 ? player1color : player2color})
  } : () => {}
}

hoverTrigger() {
}

animateDivToRow(div, row, callback = (() => {})){
  let height = $('.board-column .board-slot').eq(1).position().top*(6-row)+10;
  let addedClass = this.currentPlayer == 1 ? 'bg-very-red' : 'bg-very-yellow'
  // console.log(div)
  let newDiv = div.clone().css({position: 'absolute', 'z-index': 3}).addClass(addedClass).prependTo(div.parent())
  const afterFn = () => {
    // newDiv.css({top: '0px'});
    newDiv.remove();
    callback();
  }
  if ((window.matchMedia("(orientation: landscape)").matches) && ($(window).width() < 813)) {
    height = height * 1.32
 }
  newDiv.animate({top: height}, afterFn);
}

static pureCheckWinner(bd) {
  if (!bd) {
    return null
  }

  let winner = 0
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      for (let player of [1, -1]) {
        if (
          row < 3 &&
          bd[col][row] == player &&
          bd[col][row + 1] == player &&
          bd[col][row + 2] == player &&
          bd[col][row + 3] == player
        ) {
          return player
        }

        if (
          col < 4 &&
          bd[col][row] == player &&
          bd[col + 1][row] == player &&
          bd[col + 2][row] == player &&
          bd[col + 3][row] == player
        ) {
          return player
        }

        if (
          col < 4 &&
          bd[col][row] == player &&
          bd[col + 1][row + 1] == player &&
          bd[col + 2][row + 2] == player &&
          bd[col + 3][row + 3] == player
        ) {
          return player
        }

        if (
          col > 2 &&
          row < 3 &&
          bd[col][row] == player &&
          bd[col - 1][row + 1] == player &&
          bd[col - 2][row + 2] == player &&
          bd[col - 3][row + 3] == player
        ) {
          return player
        }
      }
    }
  }
  return winner
}

}
