var model = require('../models/model')

module.exports = Controller
const uuidv4 = require('uuid/v4')

model.open()

async function Controller(srv) {
    var sio = require('socket.io')(srv)
    sio.on('connection', function (socket) {
        console.log('client connected')

        socket.on('getId', function (data) {
            if (data.sessionId == null) {
              var session_id = uuidv4()
              socket.room = session_id
              socket.join(socket.room, function (res) {
                socket.emit('idConfirm', {
                  sessionId: session_id
                })
              })
            } else {
              socket.room = data.sessionId
              socket.join(socket.room, function (res) {
                socket.emit('idConfirm', {
                  sessionId: data.sessionId
                })
              })
            }
        })

        socket.on('login', function (data) {
          var uuid = data.sessionId
          var recAcnt = data.acnt
          var recPwd = data.pwd
          
          if (recAcnt == "" || recPwd == "") {
            socket.emit('switchPage', {
              'page':'err'
            })
          } else {
            var modelCursor = model.getCursor('password', 'users')
            modelCursor.then(function (cursor) {
              cursor.each(function (err, doc) {
                if (doc) {
                  var userAcnt = doc.account
                  var userPwd = doc.password

                  if (recAcnt == userAcnt) {
                    if (recPwd == userPwd) {
                      var insertData = JSON.stringify({
                        account: userAcnt, 
                        uuid: uuid
                      })
                      model.userLogin('loginUsers', 'users', insertData)
                      socket.emit('switchPage', {
                        'page':'userPage'
                      })
                    } else {
                      socket.emit('switchPage', {
                        'page':'err'
                      })
                    }
                  }
                } else {
                  socket.emit('switchPage', {
                    'page':'err'
                  })
                }
              })
            })
          }
        })
        
        socket.on('regist', function (data) {
          var recAcnt = data.acnt
          var recPwd = data.pwd
          
          if (recAcnt == "" || recPwd == "") {
            socket.emit('switchRegistPage', {
              'page':'fail'
            })
          } else {
            var modelCursor = model.getCursor('password', 'users')
            modelCursor.then(function (cursor) {
              cursor.each(function (err, doc) {
                if (doc) {
                  var userAcnt = doc.account

                  if (recAcnt == userAcnt) {
                    socket.emit('switchRegistPage', {
                      'page':'fail'
                    })
                  } else {
                    var insertData = JSON.stringify({
                      account: recAcnt, 
                      password: recPwd
                    })
                    model.regist('password', 'users', insertData)
                    socket.emit('switchRegistPage', {
                      'page':'sucess'
                    })
                  }
                }
              })
            })
          }
        })

        socket.on('po', function (data) {
          var recTitle = data.title
          var recContent = data.content
          var recPublisher = data.publisher

          if (recTitle = "") {
            socket.emit('switchPostPage', {
              'page':'fail'
            })
          } else {
            var modelCursor = model.getCursor('post', 'userpost')
            modelCursor.then(function (cursor) {
              cursor.each(function (err, doc) {
                if (doc) {
                  var title = doc.title
  
                  if (recTitle == title) {
                    socket.emit('switchPostPage', {
                      'page':'fail'
                    })
                  } else {
                    var insertData = JSON.stringify({
                      title: recTitle, 
                      content: recContent,
                      publisher: recPublisher
                    })
                    model.po('post', 'userpost', insertData)
                    socket.emit('switchPostPage', {
                      'page':'sucess'
                    })
                  }
                }
              })
            })
          } 
        })

        socket.on('disconnect', function () {
            console.log('Client disconnected.')
        })
    })
}