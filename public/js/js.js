var socket = io()
var stats = "0"

$('.press').mousedown(function () {
    stats = $(this).attr('id')
    socket.emit('chStats', {
        'stats': stats
    })
})

$('.press').mouseup(function () {
    stats = "0"
    socket.emit('chStats', {
        'stats': stats
    })
})