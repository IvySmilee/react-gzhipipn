/*
* 包含n个action creator函数的模块
* 同步action：个数与action的type的个数一样
* 异步action：与异步ajax请求个数一样
* */
//引入action的type模块
import {AUTH_SUCCESS,ERROR_MSG} from './action-types'
//引入api
import {reqLogin,reqRegister} from '../api'

/*同步action*/
//请求成功的同步action
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user});
//请求失败的同步action
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg});

/*异步action*/
//注册的异步action
export const register=({username,password,type})=>{
  return dispatch=>{
    //执行异步ajax请求注册接口
    reqRegister({username,password,type}).then(res=>{
      const result=res.data; //{code:0/1,data/msg:??}
      if(result.code===0){  //注册成功
        const user=result.data;
        dispatch(authSuccess(user));  //分发一个成功的同步action
      }else{    //注册失败
        dispatch(errorMsg(result.msg)); //分发一个失败的同步action
      }
    })
  }
};

//登录的异步action
export const login=(username,password)=>{
  return dispatch=>{
    //执行异步ajax请求登录接口
    reqLogin(username,password).then(res=>{
      const result=res.data; //{code:0/1,data/msg:??}
      if(result.code===0){  //注册成功
        const user=result.data;
        dispatch(authSuccess(user));  //分发一个成功的同步action
      }else{    //注册失败
        dispatch(errorMsg(result.msg)); //分发一个失败的同步action
      }
    })
  }
};