function highscoreRender(game) {

let data = '<ol>'

for(let obj of game.highscoreList.list){
			data += '<li><ul><li>'+ obj.name+'</li><li>' + obj.rounds + '</li></ul></li>';
	}

data += '</ol>';

$('main').append(data);
}
setTimeout(() => highscoreRender(game), 1000)
