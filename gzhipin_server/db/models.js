/*
  包含n个能操作mongodb数据库集合的model的模块
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)

2. 定义出对应特定集合的Model并向外暴露
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
  2.3. 向外暴露Model
 */

/*1. 连接数据库*/
// 1.1. 引入mongoose
const mongoose=require('mongoose');
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gzhipin');
// 1.3. 获取连接对象
const conn=mongoose.connection;
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected',function(){
  console.log('gzhipin 数据库连接成功！')
});

/*2. 定义出对应特定集合的Model并向外暴露*/
// 2.1. 字义Schema(描述文档结构)
const userSchema=mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型: dashen/laoban
  header: {type: String}, // 头像名称
  post: {type: String}, // 职位
  info: {type: String}, // 个人或职位简介
  company: {type: String}, // 公司名称
  salary: {type: String} // 工资
});
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel=mongoose.model('user',userSchema);
// 2.3. 向外暴露Model
exports.UserModel=UserModel;

/*3.定义实时聊天集合对象的Model，并向外暴露*/
//3.1定义chats集合的文档结构
const chatSchema=mongoose.Schema({
  from:{type:String,required:true},//发送消息的用户id
  to:{type:String,required:true},//接收消息的用户id
  chat_id:{type:String,required:true},//当前聊天的id：from和to的组合
  content:{type:String,required:true},//聊天的内容
  read:{type:Boolean,default:false},//消息默认为未读
  create_time:{type:Number}//这条数据的创建时间
});
//3.2 定义能操作chats集合数据的Model
const ChatModel=mongoose.model('chat',chatSchema);
//3.3向外暴露Model
exports.ChatModel=ChatModel;




