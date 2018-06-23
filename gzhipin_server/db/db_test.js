/*
  使用mongoose操作mongodb的测试文件
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 通过Model或其实例对集合数据进行CRUD操作
  3.1. 通过Model实例的save()添加数据
  3.2. 通过Model的find()/findOne()查询多个或一个数据
  3.3. 通过Model的findByIdAndUpdate()更新某个数据
  3.4. 通过Model的remove()删除匹配的数据
 */

/*1. 连接数据库*/
// 1.1. 引入mongoose
const mongoose=require('mongoose');
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gzhipin_test2');
// 1.3. 获取连接对象
const conn=mongoose.connection;
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected',function(){
  console.log('数据库连接成功！')
});

/*2. 得到对应特定集合的Model*/
// 2.1. 字义Schema(描述文档结构)
const userSchema=mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型: dashen/laoban
});
// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel=mongoose.model('user',userSchema);//集合的名称为users

/*CRUD操作*/
/*3. 通过Model或其实例对集合数据进行CRUD操作*/
// 3.1. 通过Model实例的save()添加数据
function testSave(){
  //user数据对象
  const user={
    username:'Bob',
    password:'123',
    type:'dashen'
  };
  const userModel=new UserModel(user);
  //保存到数据库
  //返回保存的回调函数：err：错误信息；user：保存的对象
  userModel.save(function(err,user){
    console.log('save',err,user);
  });
}
// testSave(); //测试保存函数

// 3.2. 通过Model的find()/findOne()查询多个或一个数据
function testFind(){
  //查找多个，返回数组
  UserModel.find(function(err,users){
    //如果有匹配的返回包含所有数据的数组，若没有匹配，返回空数组[]
    console.log('find()',err,users);
  });
  //查找多个，返回对象
  UserModel.findOne({username:'Bob'},function(err,user){
    //如果有匹配的返回的是一个user对象，若没有匹配，返回空null
    console.log('findOne()',err,user);
  });
}
// testFind()//测试查找函数

// 3.3. 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate(){
  //只能通过查找_id,来更改值
  UserModel.findByIdAndUpdate({_id: '5b2c900418964d06d4684d9a'},{username:'Jack'},
    function(err,user){
    console.log('findByIdAndUpdate()',err,user);
    })
}
// testUpdate() //测试更新函数

// 3.4. 通过Model的remove()删除匹配的数据
function testDelete() {
  UserModel.remove({_id: '5b2c900418964d06d4684d9a'}, function (err, result) {
    console.log('remove()', err, result)
    // 返回的result是 {n:1,ok:1}, ok:1,代表删除成功，n:1,代表删除了一个
  })
}
// testDelete() //测试删除