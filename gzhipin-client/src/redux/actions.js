/*
* 包含n个action creator函数的模块
* 同步action：个数与action的type的个数一样
* 异步action：与异步ajax请求个数一样
* */
//引入action的type模块
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,
  RECEIVE_USER_LIST,RECEIVE_CHAT,RECEIVE_MSG,MSG_UPDATE} from './action-types'
//引入api
import {reqLogin,reqRegister,reqUpdateUser,reqUser,
  reqUserList,reqChatMsgList,reqReadChatMsg} from '../api'
//引入实时聊天前端依赖库
import io from 'socket.io-client'

//连接服务器，得到代表连接的socket对象
const socket=io('ws://localhost:4000');

/*初始化socketio，绑定监听服务器发送的消息*/
function initSocketIO(userid,dispatch){
  if(!io.socket){
    io.socket=socket;
    socket.on('receiveMsg',function(chatMsg){
      if(chatMsg.from===userid || chatMsg.to===userid){
        console.log('接收到一条需要显示的消息');
        dispatch(receiveMsg(chatMsg,userid));
      }else{
        console.log('接收到与我无关的消息');
      }
    })
  }
}

/*获取当前用户相关的所有聊天信息的异步action*/
async function getMsgList(userid,dispatch){
  initSocketIO(userid,dispatch);
  const res=await reqChatMsgList();
  const result=res.data;
  if(result.code===0){
    //result为：{user:{},chatMsg:[]}
    console.log('获取到当前用户的所有相关的聊天信息',result.data);
    dispatch(receiveChat({...result.data,meId:userid}));
  }
}



/*同步action*/
//请求成功的同步action
const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user});
//请求失败的同步action
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg});
//同步接受用户
const receiveUser=(user)=>({type:RECEIVE_USER,data:user});
//同步重置用户
export const resetUser=(msg)=>({type:RESET_USER,data:msg});
//接收用户列表的同步action
const receiveUserList=(users =>({type:RECEIVE_USER_LIST,data:users}));
//接收聊天相关信息的同步action
const receiveChat=({users,chatMsgs,meId})=>({type:RECEIVE_CHAT,data:{users,chatMsgs,meId}});
//接收一条新的聊天消息
const receiveMsg=(chatMsg,meId)=>({type:RECEIVE_MSG,data:{chatMsg,meId}});
//更新消息为已读
const msgUpdate=({count,from,to})=>({type:MSG_UPDATE,data:{count,from,to}});


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
      getMsgList(user._id,dispatch);  //新用户不需要在最开始获取消息列表
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
      getMsgList(user._id,dispatch);
      dispatch(authSuccess(user));  //分发一个成功的同步action
    }else{    //注册失败
      dispatch(errorMsg(result.msg)); //分发一个失败的同步action
    }
  }
};

//更新用户的异步action
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

//获取当前用户的异步action
export const getUser=()=>{
  return async dispatch=>{
    const res=await reqUser();
    const result=res.data;
    if(result.code===0){
      getMsgList(result.data._id,dispatch);
      dispatch(receiveUser(result.data))
    }else{
      dispatch(resetUser(result.msg))
    }
  }
};

//获取用户列表的异步action
export const getUserList=(type)=>{
  return async dispatch=>{
    const res=await reqUserList(type);
    const result=res.data;
    if(result.code===0){  //{code:0,data:users}
      dispatch(receiveUserList(result.data))
    }
  }
};


/*聊天发送消息的异步action*/
export const sendMsg=({from,to,content})=>{
  return dispatch=>{   //这里是socket分发消息，不用dispatch，但是返回结果必须是一个函数
    //向服务器发消息
    console.log('浏览器向服务器发送消息',from,to,content);
    socket.emit('sendMsg',{from,to,content})
  }
};

//更新消息为已读
export const updateMsg=(from,to)=>{
  return async (dispatch) => {
    const res = await reqReadChatMsg(from);
    const result=res.data; //{code:0,data:2}
    if(result.code===0){
      const count=result.data;
      dispatch(msgUpdate({count,from,to}))
    }
  }
}

/*
*async 和 await 的作用？
*   简化promise编码
*   使用同步编码实现异步流程
*哪里使用await？
*   在执行一个返回promise对象的函数的左侧（不是想得到promise，最想得到异步执行的结果）
*哪里用asyns？
*   使用了await所在的函数定义左侧
* */