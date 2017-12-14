class Board extends Base {
    constructor() {
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

        JSON._save('saves', {
            board: this
        });
        this.board = this.generateBoard();
        this.currentPlayer = 1
        this.width = this.state.length
        this.height = this.state[0].length
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

    nextPlayer() {
        this.currentPlayer ^= 3
        // this.currentPlayer ^= 1 // Switches between 1 and 0 instead
    }

    placeInColumn(column) {
        let y = this.state[column].findIndex((slot) => {return (slot === 0)})
        if (this.setSlot(column, y, this.currentPlayer)) {
            return y
        }
        else {
          return -1
        }

    }
    changePlayerColor(currentPlayer){
      currentPlayer;
      let colorPlayer1 = "red";
      let colorPlayer2 = "#fdd91d";

      if(currentPlayer == 1){
        $("p.player1").css("color", colorPlayer1);
        $("p.player2").css("color", "grey");
      }
      else{
        $("p.player1").css("color", "grey")
        $("p.player2").css("color", colorPlayer2);
      }

    }

    click(element, instances){
        let parent = element.parent();
        // if(parent.hasClass('board-column')){
        //     this.createSlot(parent);
        // }

        // let e = element
        if(parent.hasClass('board-column')){
          this.createSingleSlot(parent);
      }
    }


    generateBoard(){
        this.render('section.boardarea');
    }


    createSlot(parent){
        // console.log('working',parent);
        this.render(parent, '2');
    }

    createSingleSlot(parent){
        // console.log(parent[0].id.split('column-').pop())
        const row = this.placeInColumn(parent[0].id.split('column-').pop())
        if (row != -1){
        let element = parent[0].children[this.height - row - 1]
        // this.render(element, 'single');
        if (this.currentPlayer == 1){
          element.className += ' red'

        } else if (this.currentPlayer == 2){
          element.className += ' yellow'

        }
        $(parent).hover(function(){
          console.log(this)
        })
        // console.log(element.className)
        this.nextPlayer()
      }
    }


    //need to add id on them as well but here is a start on the board

    template(){
        let returnValue = '<div class="board col-12">';
        let inner = '', column = '';
        let innerhover = '', columnhover = '';

        for (let co = 0; co < 1; co++) {
            innerhover += '<div class="board-slot-hover"></div>';
        };

        for (let co = 0; co < 7; co++) {
            columnhover += '<div class="board-column-hover" ' + 'id="column-hover-' + co + '">' + innerhover + '</div>';
        };

        for (let co = 0; co < 6; co++) {
            inner += '<div class="board-slot"></div>';
        };

        for (let co = 0; co < 7; co++) {
            column += '<div class="board-column" ' + 'id="column-' + co + '">' + inner + '</div>';
        };

        return returnValue += returnValue + columnhover + column + '</div>';

    }

    template2(){
        let wrapper = '<div>';
        let inner = '';
        for(let co = 0; co < 6; co++){
            inner += '<div class="board-slot red"></div>';
        };
        // console.log(inner);
        return inner = wrapper + inner + '</div>';
    }

    templatesingle(){
        return `<div class="board-slot red"></div>`;
    }


}
