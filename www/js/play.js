$('#gameOveModal').on('shown.bs.modal', function (event) {
  const modal = $(this)
  //modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body').text(" ");
})