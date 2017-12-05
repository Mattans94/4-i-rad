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
    getSlot(x, y) {
        return this.state[x][y]
    }

    setSlot(x, y, playerId) {
        this.state[x][y] = playerId == 0 ? 1 : -1
    }
}
