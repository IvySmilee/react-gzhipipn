
/*用户注册的路由组件*/
import React,{Component} from 'react'
import {connect} from 'react-redux'
//引入蚂蚁金服移动端样式的组件
import {NavBar,WingBlank,WhiteSpace,List,InputItem,Radio,Button} from 'antd-mobile'
//引入重定向
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
//引入注册的异步action
import {register} from '../../redux/actions'

const ListItem=List.Item;

class Register extends Component{

  state={
    username:'',
    password:'',
    password2:'',
    type:'dashen'
  };

  // 处理输入框/单选框变化, 收集数据到state
  handleChange=(name,value)=>{
    this.setState({
      [name]:value  // 如何让一个属性名是一个变量: 将属性变量名放在[]中
    })
  };

  // 注册
  register=()=>{
    this.props.register(this.state);
  };

  // 跳转到login路由
  goLogin=()=>{
    this.props.history.replace('/login')
  };

  render(){
    const {type}=this.state;
    const {redirectTo,msg}=this.props.user;
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>硅谷直聘</NavBar>
        <Logo/>
        <WingBlank>
          {msg? <p className='error-msg'>{msg}</p> : null}
          <List>
            <WhiteSpace/>
            <InputItem onChange={(val)=>this.handleChange('username',val)} placeholder='请输入用户名'>用&nbsp;&nbsp;户&nbsp;&nbsp;名：</InputItem>
            <WhiteSpace/>
            <InputItem onChange={(val)=>this.handleChange('password',val)} type='password' placeholder='请输入密码'>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 码：</InputItem>
            <WhiteSpace/>
            <InputItem onChange={(val)=>this.handleChange('password2',val)} type='password' placeholder='请确认密码'>确认密码：</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span style={{marginRight:20}}>用户类型：</span>
              <Radio checked={type==='dashen'} onChange={(val)=>this.handleChange('type','dashen')}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='laoban'} onChange={(val)=>this.handleChange('type','laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace/>
            <Button onClick={this.goLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  //取到状态中的user，根据user里的信息来判断显示错误信息，或成功跳转
  state=>({user:state.user}),
  {register}
)(Register)