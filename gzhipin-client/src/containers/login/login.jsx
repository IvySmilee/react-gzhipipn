
/*用户登录的路由组件*/
import React,{Component} from 'react'
import {connect} from 'react-redux'

//引入蚂蚁金服移动端样式的组件
import {NavBar,WingBlank,WhiteSpace,List,InputItem,Button} from 'antd-mobile'

import Logo from '../../components/logo/logo'

class Login extends Component{

  state={
    username:'',
    password:''
  };

  handleChange=(name,value)=>{
    this.setState({
      [name]:value  // 如何让一个属性名是一个变量: 将属性变量名放在[]中
    })
  };

  login=()=>{
    console.log(this.state)
  };

  goRegister=()=>{
    this.props.history.replace('/register')
  };

  render(){
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <WhiteSpace/>
            <InputItem onChange={(val)=>this.handleChange('username',val)} placeholder='请输入用户名'>用&nbsp;&nbsp;户&nbsp;&nbsp;名：</InputItem>
            <WhiteSpace/>
            <InputItem onChange={(val)=>this.handleChange('password',val)} type='password' placeholder='请输入密码'>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 码：</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</Button>
            <WhiteSpace/>
            <Button onClick={this.goRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect()(Login)