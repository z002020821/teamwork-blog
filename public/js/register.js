var socket = io()

$('#regist').click(function () {
    var acnt = $('#acnt').val()
    var pwd = $('#pwd').val()
    
    socket.emit('regist', {
        'acnt': acnt,
        'pwd': pwd
    })
})

socket.on('created', function () {
    window.location.replace("../success.html")
})

socket.on('failed', function () {
    window.location.replace("../fail.html")
})