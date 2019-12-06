var express = require('express'),
    app = express(),
    server = require('http').Server(app)
require('./controllers/controller')(server)

app.use(express.static('./public'))

server.listen(8080, function () {
  console.log('Server running at port 8080.')
})

app.get('*', function (req, res) {
  res.status(404).send('Page not found...')
})

