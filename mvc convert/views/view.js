var pug = require('pug')
var socket = io()

//register's pageSwitch
socket.on('created', function () {
    window.location.replace("../public/html/register/success.html")
})

socket.on('failed', function () {
    window.location.replace("../public/html/register/fail.html")
})


//login's pageSwitch
socket.on('switchPage', function(){
    if ('page'==='userPage') {
        window.location.replace("../public/html/userpage/home.html")
    } else if ('page'==='err'){
        window.location.replace("../public/html/login/error.html")
    }
})

