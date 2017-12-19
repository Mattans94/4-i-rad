class Game {
    constructor() {
      this.getPlayers();
    }

    newGame() {
    	this.loadHiScores();
        this.board = new Board(this);
        this.board.generateBoard();
        //return this.board; // really?
    }

    setName(player1, player2) {
        let name1 = $('#playerName1').val();
        let name2 = $('#playerName2').val();
        name1 = this.player1;
        name2 = this.player2;
    }


    setPlayer1Type(response) {
        this.player1Type = response;
    }

    setPlayer2Type(response) {
        this.player2Type = response;
    }

    getPlayers() {
    	if(loadPlayers()){
    		let players = loadPlayers();
    		this.player1 = players[0];
    		this.player2 = players[1];
        this.board = this.newGame(this.player1, this.player2);
    	}
    	
    }


    loadHiScores(){
        JSON._classes(HighscoreList, Human, Bot);
        JSON._load('hi-scores')
        .then((data) => {
            this.highscoreList = data.list;
        })
        .catch(() => {
            this.highscoreList = new HighscoreList();
        })
        .then(() => {
            // only need something here if rendering highscore list directly
        });
    }


}



//Change stored player type on button click
$(document).on("click", "#switchButton1", function() {
    $("p.show").toggle();
    $("p.hidden").toggle();
    $('.player1RadioBtns').toggleClass('d-none');

    let value = 'human';

    if ($("p.hidden").css("display") == "none") {
        value = 'human'
        console.log(value);
    } else {
        value = 'computer'
        console.log(value);
    }


    localStorage.setItem('player1Type', value);
});

$(document).on("click", "#switchButton2", function() {
    $("p.show2").toggle();
    $("p.hidden2").toggle();
    $('.player2RadioBtns').toggleClass('d-none');

    let value = 'human';

    if ($("p.hidden2").css("display") == "none") {
        value = 'human'
        console.log(value);
    } else {
        value = 'computer'
        console.log(value);
    }

    localStorage.setItem('player2Type', value);
});

let url = location.pathname;


function loadPlayers() {
    //Default values for player type is human, only if page is not play.html
    if (!(url == '/play.html')) {
        localStorage.setItem('player1Type', "human");
        localStorage.setItem('player2Type', "human");
    }

    $(document).on('click', '.startGame', function() {
        let val1 = $('#playerName1').val();
        let val2 = $('#playerName2').val();
        localStorage.setItem('player1Name', val1);
        localStorage.setItem('player2Name', val2);
    });
    //If play.html, get player names and types and render to page
    if (url == "/play.html") {
        let name1 = localStorage.getItem('player1Name');
        let name2 = localStorage.getItem('player2Name');
        let type1 = localStorage.getItem('player1Type');
        let type2 = localStorage.getItem('player2Type');
        console.log(name1 + " is type " + type1);
        console.log(name2 + " is type " + type2);
        $('.player1').html(name1);
        $('.player2').html(name2);

        let player1 = type1 == 'human' ? new Human(name1) : new Bot(name1);
        let player2 = type2 == 'human' ? new Human(name2) : new Bot(name2);

        return [player1, player2];

    }
}