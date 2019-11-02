const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = "mongodb+srv://user:123@fangrolf-ielcr.gcp.mongodb.net/test?retryWrites=true&w=majority";
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
      var recAcnt = data.acnt
      var recPwd = data.pwd

      MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
        assert.equal(null, err);
        console.log("mongo connected.");

        const db = client.db("password");

        var cursor = db.collection('users').find({}).project({_id: 0});

        cursor.each(function(err, doc) {
            if(doc) {
                var userAcnt = doc.account
                var userPwd = doc.password

                if (recAcnt == userAcnt) {
                  if (recPwd == userPwd) {
                    console.log(userAcnt + " log in")
                    socket.emit('page1')
                  } else {
                    console.log(userAcnt + " incorrect pwd")
                    socket.emit('page2')
                  }
                  return false
                }
            } else {
                console.log("finished query")
                socket.emit('page2')
                client.close()
            }
        })
      })
  })

  socket.on('regist', function (data) {
    var recAcnt = data.acnt
    var recPwd = data.pwd

    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
      assert.equal(null, err);
      console.log("mongo connected.");

      const db = client.db("password");

      var cursor = db.collection('users').find({}).project({_id: 0});

      var count = 0
      cursor.each(function(err, doc) {
          if(doc) {
            var userAcnt = doc.account

            if (recAcnt == userAcnt) {
              socket.emit('failed')
              client.close()
              return false
            }
          } else {
            db.collection('users').insertOne({
              "account": recAcnt,
              "password": recPwd
            })
            socket.emit('created')
            console.log("finished query")
            client.close()
           }
       })
    })
  })

  socket.on('disconnect', function () {
    console.log('Client disconnected.')
  })
})

app.get('*', function (req, res) {
  res.status(404).send('Page not found...')
})