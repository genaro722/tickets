const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl()
io.on('connection', (client) => {

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente()
        console.log(siguiente)
        callback(siguiente)
    });
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                ok: false,
                message: 'El escritorio es necesario'
            })
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio)

        callback(atenderTicket)
        client.broadcast.emit('ultimos4', ticketControl.getUltimos4())
            //actualizar ultimos 4
    })

});