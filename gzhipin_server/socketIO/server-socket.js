/*启动socket.io服务的函数*/
//引入操作chats集合数据的Model
const {ChatModel}=require('../db/models');

//暴露出socket.io服务的函数
module.exports=function(server){
  //产生socket.io的管理对象：用来操作服务器端的socketIO的io对象
  const io=require('socket.io')(server);
  //监视与浏览器连接，接收到一个连接对象
  io.on('connection',function(socket){
    console.log('有一个客户端连接上了~');

    //监视当前socket对应浏览器向服务器发送消息
    socket.on('sendMsg',function({from,to,content}){
      //{from,to,content}是浏览器发送的消息数据data
      console.log(from, to, content);
      console.log('接收到一个聊天消息',from,to,content);
      //1.保存接收到的chat消息到chats数据集合中
      const chat={
        from,
        to,
        content,
        //chat_id: from + '_' + to,   // a_b  b_a
        chat_id:[from,to].sort().join('_'),
        create_time:Date.now()
      };
      console.log(chat);
      new ChatModel(chat).save(function(error,chatMsg){
        console.log(error);
        console.log(chatMsg);
        //2.向所有连接的浏览器发送消息（chat）对象
        io.emit('receiveMsg',chatMsg);
        console.log('向浏览器分发保存的聊天消息',chatMsg);
      })
    })

  })
};

/*
* emit：分发消息
* socket：与某一个浏览器的连接：
*   socket.emit：向某一个连接的浏览器分发消息，谁给我发，我给谁发
* io：与服务器连接的浏览器
*   io.emit：向所有连接的浏览器分发消息，谁给我发，我给所有连接的发
* */