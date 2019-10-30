var socket = io()

$('#login').click(function () {
    var acnt = $('#acnt').val()
    var pwd = $('#pwd').val()
    
    socket.emit('login', {
        'acnt': acnt,
        'pwd': pwd
    })
})