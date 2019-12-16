var pug = require('pug')
var socket = io()

//register's pageSwitch
socket.on('switchRegistPage', function () {
    if('page' === 'sucess') {
        window.location.replace("../public/html/register/success.html")
    } else if ('page' === 'fail') {
        window.location.replace("../public/html/register/fail.html")
    }
})

//login's pageSwitch
socket.on('switchLoginPage', function(){
    if ('page'==='userPage') {
        window.location.replace("../public/html/userpage/home.html")
    } else if ('page'==='err'){
        window.location.replace("../public/html/login/error.html")
    }
})

socket.on('switchPage',function() {
    window.location.replace("../public/html/login/error.html")
})

//post's pageSwitch
socket.on('switchPostPage', function() {
    if('page' === 'sucess') {
        window.location.replace("../public/html/userpage/home.html")
    } else if ('page' === 'fail') {
        window.location.replace("../public/html/register/fail.html")
    }
})

