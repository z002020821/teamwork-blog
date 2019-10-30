var express = require('express')
var io = require('socket.io')
var app = express()

app.use(express.static('../public'))

var server = app.listen(8080, function () {
  console.log('Server running at port 8080.')
})

var sio = io(server)

sio.on('connection', function (socket) {
  console.log('Client connected.')

  socket.on('login', function (data) {
      console.log("account: " + data.acnt + ", password: " + data.pwd)

      if (data.acnt == "111" && data.pwd == "222")
        socket.emit('page1')
      else
        socket.emit('page2')
  })

  socket.on('regist', function (data) {
    console.log("account: " + data.acnt + ", password: " + data.pwd)
    if (data.acnt == "111" && data.pwd == "222")
      socket.emit('created')
    else
      socket.emit('failed')
})

  socket.on('disconnect', function () {
    console.log('Client disconnected.')
  })
})

app.get('*', function (req, res) {
  res.status(404).send('Page not found...')
})