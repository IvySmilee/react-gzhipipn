/*包含多个用于生成新的state的reducer函数的模块*/

//引入合并函数模块
import {combineReducers} from 'redux'
//引入action的type模块
import {AUTH_SUCCESS,ERROR_MSG} from './action-types'

const initUser={
  username:'',
  type:'',
  msg:'',  //错误信息
  redirectTo:'',  //需要自动重定向的path
};

function user(state=initUser,action){
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...action.data,redirectTo:'/'};
    case ERROR_MSG:
      return {...state,msg:action.data};
    default:
      return state;
  }
}

//向外暴露一个整合多个函数产生的reducer
export default combineReducers({
    user
});
//整合的reducer管理的状态：{user：{}}
