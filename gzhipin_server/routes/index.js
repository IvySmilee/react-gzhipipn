var express = require('express');
var router = express.Router();

//引入UserModel
const {UserModel}=require('../db/models');
//引入md5加密模块
const md5=require('blueimp-md5');

//查询是过滤掉指定的属性
const filter={password:0,__v:0};

/* 测试：GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
* 注册路由分为3 步：
*   1、获取请求参数；2、处理数据；3、返回响应
* */
/*
//测试用：提供一个用户注册的接口
router.post('/register', function (req, res, next) {
  //1.获取请求参数数据
  const {username, password} = req.body;
  console.log('register', username, password);
  //2.处理数据
  let result;
  if (username === 'admin') {
    result={code: 1, msg: '此用户已存在'};
  } else {
    result={code: 0, data: {_id: 'abc', username, password}};
  }
  //3.返回响应
  res.send(result);
})*/

//一、注册的路由
router.post('/register',function(req,res){
  //1.获取请求参数：username，password，type
  const {username,password,type}=req.body;
  console.log(username,password,type)
  //2.处理数据  3.返回响应
  //2.1 根据username查询数据库，看是否存在
  UserModel.findOne({username},function(err,user){
    // console.log(username);
    //3.1 如果user存在，返回响应：此用户已存在
    if(user){
      console.log(user);
      //code是数据是否是正常数据的标识，1：存在，0：不存在
      res.send({code:1,msg:'此用户已存在'})
    }else{
      // console.log('no user')
      //2.2 如果user不存在，将提交的user数据保存到数据库
      new UserModel({username,password:md5(password),type}).save(function(err,user){
        const userid=user._id;
        //生成一个cookie（userid：user._id),并交给浏览器保存
        //持久化cookie(一周)，浏览器会保存在本地文件
        res.cookie('userid',userid,{maxAge:1000*60*60*24*7});
        //3.2 保存成功，返回成功:返回的数据中不要携带password
        res.send({code:0,data:{_id:userid,username,type}})
        // console.log({username,password:md5(password),type})
      })
    }
  })
});

//二、登录路由
router.post('/login',function(req,res){
  //1.获取请求参数：username，password
  const {username,password}=req.body;
  //2.处理数据：根据username和password去数据库查询得到user
  UserModel.findOne({username,password:md5(password)},filter,function(err,user){
    //3.返回响应数据
    //3.1 如果user没有值，返回错误提示：用户名或密码错误
    if(!user){
      res.send({code:1,msg:'用户名或密码错误'})
    }else{
      //生成一个cookie（userid：user._id),并交给浏览器保存
      //持久化cookie(一周)，浏览器会保存在本地文件
      res.cookie('userid',user._id,{maxAge:1000*60*60*24*7});
      //3.2 如果user有值，返回user,user 中没有password
      res.send({code:0,data:user })
    }
  })
});

//三、更新用户路由
router.post('/update',function(req,res){
  //得到请求cookie的userid
  const userid=req.cookies.userid;
  //如果没有，说明没有登录，直接返回提示
  if(!userid){
    return res.send({code:1,msg:'请先登录'})
  }
  //如果有，更新数据库中对应的数据
  UserModel.findByIdAndUpdate({_id:userid},req.body,function (err,user) {
    //user是数据库中原来的数据
    /*更新合并user信息*/
    const {_id,username,type}=user;
    // node端 ...不可用
    // const data = {...req.body, _id, username, type}
    // 合并用户信息，
    /*Object.assign(obj1, obj2, obj3,...)将多个指定的对象合并为一个对象，
        如果有重复的属性，后面会覆盖前面的
    */
    const data=Object.assign(req.body,{_id,username,type});

    res.send({code:0,data})
  })
});

//四、获取当前user（根据cookie）
router.get('/user',function(req,res){
  //取出cookies中的的user,上面存的是userid，取userid
  const userid=req.cookies.userid;
  if(!userid){
    return res.send({code:1,msg:'请先登录'})
  }
  //查询对应对应的user
  UserModel.findOne({_id:userid},filter,function(err,user){
    return res.send({code:0,data:user})
  })
});

//五、查看用户列表
router.get('/userlist',function(req,res){
  const {type}=req.query;
  UserModel.find({type},filter,function (err,users) {
    return res.send({code:0,data:users});//json通过send作用一样
  })
});

module.exports = router;
