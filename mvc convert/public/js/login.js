var socket = io()
var session_id

let data = sessionStorage.getItem('sessionId')
if (data == null) {
    session_id = null
    socket.emit('getId', {
        sessionId: session_id
    })
} else {
    session_id = data
    socket.emit('getId', {
        sessionId: session_id
    })
}

socket.on('idConfirm', function(data) {
    sessionStorage.setItem('sessionId', data.sessionId)
    session_id = data.sessionId
})

$('#login').click(function () {
    var acnt = $('#acnt').val()
    var pwd = $('#pwd').val()
    
    socket.emit('login', {
        'acnt': acnt,
        'pwd': pwd,
        'sessionId': session_id
    })
})

socket.on('switchPage', function (data) {
    if (data.page == 'userPage') {
        window.location.replace("../userpage/home.html")
    } else if (data.page == 'err') {
        window.location.replace("./error.html")
    }
})