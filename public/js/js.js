var socket = io()
var stats = "0"

$('.press').mousedown(function () {
    stats = $(this).attr('id')
    socket.emit('chStats', {
        'stats': stats
    })
    if ($(this).attr('id') == '1') {
        socket.emit('input', {
            'input': $('#text').val()
        })
    }
})

$('.press').mouseup(function () {
    stats = "0"
    socket.emit('chStats', {
        'stats': stats
    })
})