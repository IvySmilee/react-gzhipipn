/*提示找不到页面的UI组件*/
import React,{Component} from 'react'
import {Button} from 'antd-mobile'

class NotFound extends Component{
  render(){
    return (
      <div>
        <h2>抱歉，找不到页面！</h2>
        <Button type='primary'
                onClick={()=>this.props.history.replace('/')}>
        </Button>
      </div>
    )
  }
}

export default NotFound;