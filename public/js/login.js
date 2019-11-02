var socket = io()

$('#login').click(function () {
    var acnt = $('#acnt').val()
    var pwd = $('#pwd').val()
    
    socket.emit('login', {
        'acnt': acnt,
        'pwd': pwd
    })
})

socket.on('page1', function () {
    window.location.replace("../html/stats/userPage.html")
})

socket.on('page2', function () {
    window.location.replace("../html/stats/error.html")
})