/*应用主界面路由组件*/
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'

import {getUser} from '../../redux/actions'
import {getRedirectPath} from '../../utils'

class Main extends Component{
  // 组件类和组件对象,给组件对象添加属性
  //一个对象代表一个导航相关信息，底部同时显示三个
  //直接定义的数组，挂载到了this（实例）上，前面加上static，是挂载到类（Main）上
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,  //对应显示的组件
      title: '大神列表',    //头部显示信息
      icon: 'dashen',   //底部导航对应图标的文件名
      text: '大神',  // 底部导航内容
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ];

  //初始渲染之后调用react生命周期的钩子函数
  componentDidMount(){
    //cookies中有userid，redux中没有user._id，实现自动登录
    const userid=Cookies.get('userid');
    const user=this.props.user;
    console.log(user)
    if(userid && !user._id){ //以前登录过，当前没有登录时进入
      console.log(userid,user._id)
      this.props.getUser(); //发送请求获取用户信息，实现自动登录
      console.log(user)
    }
  }

  render(){
    //检查用户以前是否登陆过：没有登录，直接跳转到登录界面
    /*
    * 检查用户以前是否登陆过：
    *   没有登录，直接跳转到登录界面；
    * 如果登陆过，判断当前是否登录：
    *     取出state中的user；
    * 如果没有user._id：当前没有登录：暂时不做任何显示
    *   （需要发请求登录，但是不能在render里面发请求，在componentDidMount里面发请求）
    *     如果有user._id：
    * 如果已经登录：
    *   获取当前请求的path：location的pathname；
    *   如果是根路径，自动跳转到对应的路由界面，动态确定---getRedirectPath
    *
    * */
    /*
    * componentDidMount里面发请求：
    *   取出cookies中的userid；
    *   取出state里面的user；
    *   判断发请求的条件：userid存在，user._id不存在，发请求
    *   （只有当以前登陆过，但当前还没有登录，才去发请求，获取用户信息）
    *
    * */

    //取出cookies中的userid
    const userid=Cookies.get('userid');
    //如果没有，跳转到登录页面
    if(!userid){
      return <Redirect to='/login'/>
    }

    //取出redux(state)中的user._id，如果cookies中有userid时执行
    const user=this.props.user;
    //判断：user._id是否存在，如果不存在返回空
    console.log(this.props);
    console.log(user);
    if(!user._id){
      return null;
    }
    //如果存在user._id，说明已经登录：实现自动跳转
    //得到当前请求的path
    const path=this.props.location.pathname;
    if(path==='/'){
      //实现自动跳转：如果请求的是根路径，自动跳转到对应的路由界面
      const path=getRedirectPath(user.type,user.header);
      return <Redirect to={path}/>
    }

    //获取导航数组
    const navList=this.navList;
    //确定哪个nav需要隐藏（添加隐藏的标识属性）----底部导航组件使用
    if(user.type==='laoban') {
      navList[1].hide = true
    } else {
      navList[0].hide = true
    }
    //获取当前导航，find方法中的nav是数组中的每一项
    const currentNav=navList.find(nav=>nav.path===path);

    return (
      <div>
        {currentNav? <NavBar>{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path= '/dasheninfo' component={DashenInfo}/>
          <Route path='/laobaninfo' component={LaobanInfo}/>
          <Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
          <Route component={NotFound}/>
        </Switch>
        {currentNav? <NavFooter navList={navList}/> : null}
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {getUser}
)(Main)