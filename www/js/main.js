let board = new Board();

$(document).on("click", "#switchButton1", function(){
	$("p.show").toggle();
	$("p.hidden").toggle();
});