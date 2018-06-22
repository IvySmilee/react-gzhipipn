var express = require('express');
var router = express.Router();

/* 测试：GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
* 注册路由分为3 步：
*   1、获取请求参数；2、处理数据；3、返回响应
* */
//提供一个用户注册的接口
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
})
module.exports = router;
