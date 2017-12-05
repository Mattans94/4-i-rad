class Board {
    constructor() {
        this.state = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ]
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
}
