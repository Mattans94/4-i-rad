class HighscoreList {

    constructor() {
        this.maxLength = 10;
        this.list = [];

    }

     sortNumber(a,b) {
        return a.rounds - b.rounds;
    }

    register(player) {

        let position = this.list.maxLength;

        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].rounds >= player.rounds) {
                position = i;
                break;
            }
        }

        if (player instanceof Human) {
            this.list.splice(position, 0, player);
            this.list = this.list.slice(0, this.maxLength);




            this.list.sort(this.sortNumber);

            JSON._save('hi-scores', {
                list: this
            });
        }



    }

}

