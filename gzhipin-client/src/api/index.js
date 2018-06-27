/*
* 应用中所有接口的请求函数模块
*   根据接口文档编写
*   函数的返回值是promise函数
* */
//引入通用请求函数模块
import ajax from './ajax'

//解决跨域请求，client端口号是3000，server是4000，
// const BASE_URL='http://localhost:4000';
const BASE_URL='';
//请求登录接口
export const reqLogin=(username,password)=>{
  return ajax(BASE_URL+'/login',{username,password},'POST');
};
//请求注册接口
export const reqRegister=({username,password,type})=>{
  return ajax(BASE_URL+'/register',{username,password,type},'POST')
};
//更新用户信息接口
export const reqUpdateUser=(user)=>{
  return ajax(BASE_URL+'/update',user,'POST')
};
//获取当前用户
export const reqUser=()=>ajax('/user');
//请求用户列表
export const reqUserList=(type)=>ajax('/userlist',{type});

//请求获取当前用户的所有聊天记录
export const reqChatMsgList=()=>ajax('/msglist');

