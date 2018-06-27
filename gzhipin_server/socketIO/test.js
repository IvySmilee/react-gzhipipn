module.exports = function (server) {
  // 得到IO对象
  const io = require('socket.io')(server)

  // 监视连接(当有一个客户连接上时回调)
  io.on('connection', function (socket) {
    console.log('soketio connected')

    // 绑定sendMsg监听, 接收客户端发送的消息
    //socket.on：接收某一个浏览器发送的消息
    socket.on('sendMsg', function (data) {
      console.log('服务器接收到浏览器的消息', data)
      //emit：分发消息，socket：与某一个浏览器的连接，io：与服务器连接的浏览器
      // socket.emit：向某一个连接的浏览器分发消息，谁给我发，我给谁发
      //io.emit：向所有连接的浏览器分发消息，谁给我发，我给所有连接的发
      // 向客户端发送消息(名称, 数据)
      io.emit('receiveMsg', data.name + '_' + data.date)
      console.log('服务器向浏览器发送消息', data)
    })

  })

}
