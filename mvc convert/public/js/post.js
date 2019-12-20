var socket = io()
var session_id
var userAcnt

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
    socket.emit('getAcnt', {
        sessionId: session_id
    })
})

socket.on('accountConfirm', function(data) {
    userAcnt = data.account
    console.log(userAcnt)
})

$('#po').click(function () {
    var title = $('#title').val()
    var content = $('#content').val()
    
    socket.emit('po', {
        'title' : title,
        'content' : content,
        'publisher' : userAcnt
    })
})

socket.on('switchPostPage', function (data) {
    if (data.page == 'sucess') {
        window.location.replace("./success.html")
    } else if (data.page == 'fail') {
        window.location.replace("./fail.html")
    }
})