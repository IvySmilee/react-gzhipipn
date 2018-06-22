/*包含多个用于生成新的state的reducer函数的模块*/
import {combineReducers} from 'redux'

function xxx(state=0,action){
  switch (action.type) {

    default:
      return state
  }
}

function yyy(state=0,action){
  switch (action.type) {

    default:
      return state
  }
}

//返回合并后的reducer函数
export default combineReducers({
    xxx,
    yyy
});
