/*用户登录的路由组件*/
import React,{Component} from 'react'
import {connect} from 'react-redux'

class Main extends Component{
  render(){
    return (
      <div>main路由</div>
    )
  }
}

export default connect()(Main)