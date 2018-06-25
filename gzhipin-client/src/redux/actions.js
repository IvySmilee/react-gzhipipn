/*
* 包含n个action creator函数的模块
* 同步action：个数与action的type的个数一样
* 异步action：与异步ajax请求个数一样
* */
//引入action的type模块
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER} from './action-types'
//引入api
import {reqLogin,reqRegister,reqUpdateUser} from '../api'

/*同步action*/
//请求成功的同步action
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user});
//请求失败的同步action
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg});
//同步接受用户
const receiveUser=(user)=>({type:RECEIVE_USER,data:user});
//同步重置用户
const resetUser=(msg)=>({type:RESET_USER,data:msg});

/*异步action*/
//注册的异步action
export const register=({username,password,password2,type})=>{
  //表单验证,返回同步action
  if(!username || !password || !type){
    return errorMsg('请完善信息！')
  }
  if(password!==password2){
    return errorMsg('密码与确认密码不同')
  }

  return async dispatch=>{
  /*  //如果写在里面，执行的是异步action,需要dispatch再分发一个同步action
    if(password!==password2){
      dispatch(errorMsg('密码与确认密码不同'))
      return
    }*/
    //执行异步ajax请求注册接口
    //以同步编码的方式得到promise异步执行的结果
    const res=await reqRegister({username,password,type});
    const result=res.data; //{code:0/1,data/msg:??}
    if(result.code===0){  //注册成功
      const user=result.data;
      dispatch(authSuccess(user));  //分发成功的同步action
    }else{    //注册失败
      dispatch(errorMsg(result.msg)); //分发失败的同步action
    }
  }
};

//登录的异步action
export const login=(username,password)=>{
  //表单验证,返回同步action
  if(!username || !password){
    return errorMsg('用户名密码必须输入！')
  }

  return async dispatch=>{
    //执行异步ajax请求登录接口
    //以同步编码的方式得到promise异步执行的结果
    const res=await reqLogin(username,password);
    const result=res.data; //{code:0/1,data/msg:??}
    if(result.code===0){  //注册成功
      const user=result.data;
      dispatch(authSuccess(user));  //分发一个成功的同步action
    }else{    //注册失败
      dispatch(errorMsg(result.msg)); //分发一个失败的同步action
    }
  }
};

//更新用户的同步action
export const updateUser=(user)=>{
  return async dispatch=>{
    const res=await reqUpdateUser(user);
    const result=res.data;
    if(result.code===0){ //更新成功
      dispatch(receiveUser(result.data));//分发成功的同步action
    }else{
      dispatch(receiveUser(result.msg));//分发失败的同步action
    }
  }
};

/*
*async 和 await 的作用？
*   简化promise编码
*   使用同步编码实现异步流程
*哪里使用await？
*   在执行一个返回promise对象的函数的左侧（不是想得到promise，最想得到异步执行的结果）
*哪里用asyns？
*   使用了await所在的函数定义左侧
* */