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


        this.board = this.generateBoard();




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
            console.log('Invalid axis')
            return false
        }

        

    }


    generateBoard(){

        this.render('section.boardarea');


    }

    //need to add id on them as well but here is a start on the board

    template(){
        let returnValue = '<div class="board">';
        let inner = '', column = '';

        for(let co = 0; co < 6; co++){
            inner += '<div class="board-slot"></div>';
        };

        for(let co = 0; co < 7; co++){
            column += '<div class="board-column">' + inner + '</div>';
        };

        return returnValue += returnValue + column + '</div>';

    }


}
