class Game {
    constructor() {
      // this.getPlayers();
      if (this.getPlayers() && this.player1 && this.player2){ //Ready to start game
        this.newGame();
      }
      //this.loadHiScores();
    }

    newGame() {
    	this.loadHiScores(); //TODO: Remove?
      this.board = new Board(this);
      this.board.generateBoard();
    }

    // setName(player1, player2) {
    //     let name1 = $('#playerName1').val();
    //     let name2 = $('#playerName2').val();
    //     name1 = this.player1.name;
    //     name2 = this.player2.name;
    // }

    // TODO: används dessa?
    setPlayer1Type(response) {
        this.player1Type = response;
    }

    setPlayer2Type(response) {
        this.player2Type = response;
    }

    getPlayers() {
      let players = loadPlayers()
    	if (Array.isArray(players)){
        try {
          this.player1 = players[0];
    	  	this.player2 = players[1];
          // this.board = this.newGame(); //Moved to line 4
          return true;
        } catch (error) {
          console.warn('Failed to load players from localStorage:' + error.message)
          return false // We are on play.html but we could not load players
        }
      } else {
        return false; // We're not on play.html
      }

    }


    //TODO: Remove/make static
    loadHiScores(){
      // @ts-ignore
      JSON._classes(HighscoreList, Human, Bot);
      // @ts-ignore
      JSON._load('hi-scores')
        .then((data) => {
          console.log(data)
            this.highscoreList = data.list || new HighscoreList();
        })
        .catch(() => {
            this.highscoreList = new HighscoreList();
        })
        .then(() => {
            // only need something here if rendering highscore list directly
        });
    }

    static async loadHiScores(){
      // @ts-ignore
      JSON._classes(HighscoreList, Human, Bot);
      // @ts-ignore
      return await JSON._load('hi-scores').then((data) => {
        return data.list;
      })
      .catch(() => {
        return new HighscoreList();
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
        // console.log(value);
    } else {
        value = 'computer'
        // console.log(value);
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
        // console.log(value);
    } else {
        value = 'computer'
        // console.log(value);
    }

    localStorage.setItem('player2Type', value);
});

let url = location.pathname;

// TODO: Lägg till check med pushstate eller något för att se om man kom från player.html, annars cleara localstorage så att inte name/type hämtas från gammal session
function loadPlayers() {
    //Default values for player type is human, only if page is not play.html
    if (!(url == '/play.html' || url == '/player.html')) {
        localStorage.setItem('player1Type', "human");
        localStorage.setItem('player2Type', "human");
        return false; // Not ready to start
    } else if (url == '/player.html') {
      localStorage.clear();
    $(document).on('click', '.startGame', function() {
        let val1 = $('#playerName1').val() || 'Player 1';
        let val2 = $('#playerName2').val() || 'Player 2';
        localStorage.setItem('player1Name', val1.toString());
        localStorage.setItem('player2Name', val2.toString());

    });
    return false; // Still not ready to start
    } else if (url == "/play.html") {
    //If play.html, get player names and types and render to page
    // TODO: clear after loading
    let name1 = localStorage.getItem('player1Name') || 'Player 1';
    let name2 = localStorage.getItem('player2Name') || 'Player 2';
    let type1 = localStorage.getItem('player1Type') || 'human';
    let type2 = localStorage.getItem('player2Type') || 'human';
    // console.log(name1 + " is type " + type1);
    // console.log(name2 + " is type " + type2);
    $('.player1').html(name1);
    $('.player2').html(name2);

    let player1 = type1 == 'human' ? new Human(name1) : new Bot(name1);
    let player2 = type2 == 'human' ? new Human(name2) : new Bot(name2);

    return [player1, player2]; //Ready to start

    }
}
