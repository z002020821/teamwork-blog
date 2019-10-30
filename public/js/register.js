var socket = io()

$('#regist').click(function () {
    var acnt = $('#acnt').val()
    var pwd = $('#pwd').val()
    
    socket.emit('regist', {
        'acnt': acnt,
        'pwd': pwd
    })
})