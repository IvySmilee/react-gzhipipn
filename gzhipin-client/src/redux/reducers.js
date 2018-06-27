/*包含多个用于生成新的state的reducer函数的模块*/

//引入合并函数模块
import {combineReducers} from 'redux'
//引入action的type模块
import {AUTH_SUCCESS,ERROR_MSG,RESET_USER,
  RECEIVE_USER,RECEIVE_USER_LIST,RECEIVE_CHAT,RECEIVE_MSG} from './action-types'

//引入跳转路径模块
import {getRedirectPath} from '../utils'

/*更新用户状态*/
const initUser={
  username:'',
  type:'',
  msg:'',  //错误信息
  redirectTo:'',  //需要自动重定向的path
};
function user(state=initUser,action){
  switch (action.type) {
    case AUTH_SUCCESS:
      const user=action.data;
      return {...user,redirectTo:getRedirectPath(user.type,user.header)};
    case ERROR_MSG:
      return {...state,msg:action.data};
    case RECEIVE_USER:  //接收用户
      return action.data;
    case RESET_USER:  //重置用户
      return {...initUser,msg:action.data};
    default:
      return state;
  }
}

/*更新用户列表状态*/
//异步请求返回的是数组，state要存数组
const initUserList = [];
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data;
    default:
      return state
  }
}

/*更新实时聊天状态*/
//返回的是对象，对象里面有属性，为对象和数组
const initChat={
  users:{}, //所有用户信息的集合对象{username,header}
  chatMsgs:[]   //当前用户相关(from/to)的所有聊天msg的数组
};
function chat(state=initChat,action){
  switch (action.type){
    case RECEIVE_CHAT:
      return action.data;
    case RECEIVE_MSG:
      return {
        users:state.users,
        chatMsgs:[...state.chatMsgs,action.data]  //纯函数，不改变参数，用三点运算符返回新的state
      };
    default:
      return state;
  }
}

//向外暴露一个整合多个函数产生的reducer
export default combineReducers({
  user,
  userList,
  chat
});
//整合的reducer管理的状态：{user：{}}
