$('#gameOveModal').on('shown.bs.modal', function (event) {
  const modal = $(this)
  //modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body').text(" ");
})

$('#player1name').text(game.board.player1.name + ' ');
$('#player1type')[0].innerHTML = ' ' + (game.board.player1.constructor.name == 'Human' ? `&#x1F64B;` : `&#x1F4BB;`);
$('#player1moves').text(0);

$('#player2name').text(game.board.player2.name + ' ');
$('#player2type')[0].innerHTML = ' ' + (game.board.player2.constructor.name == 'Human' ? `&#x1F64B;` : `&#x1F4BB;`);
$('#player2moves').text(0);
