/*包含多个用于生成新的state的reducer函数的模块*/

//引入合并函数模块
import {combineReducers} from 'redux'
//引入action的type模块
import {AUTH_SUCCESS,ERROR_MSG,RESET_USER,RECEIVE_USER,RECEIVE_USER_LIST} from './action-types'

//引入跳转路径模块
import {getRedirectPath} from '../utils'

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

const initUserList = []
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

//向外暴露一个整合多个函数产生的reducer
export default combineReducers({
  user,
  userList
});
//整合的reducer管理的状态：{user：{}}
