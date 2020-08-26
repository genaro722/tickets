var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
})

socket.on('estadoActual', function(data) {
    label.text(data.actual)
})
$('button').on('click', function() {
    console.log('Click');
    socket.emit('siguienteTicket', null, function(siguienteTikect) {
        label.text(siguienteTikect)
    })
})