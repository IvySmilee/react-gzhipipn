/*底部导航的UI组件*/
import React,{Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item=TabBar.Item;

class NavFooter extends Component{
  static propTypes={
    navList:PropTypes.array.isRequired,
    unReadCount:PropTypes.number.isRequired
  };

  render(){
    //对navList进行过滤
    const navList=this.props.navList.filter(nav=>!nav.hide);
    //得到请求的路径
    const path=this.props.location.pathname;
    const unReadCount=this.props.unReadCount;
    return (
      <TabBar >
        {navList.map((nav,index)=>(
         <Item key={index}
               title={nav.text}
               badge={nav.path==='/message'? unReadCount : 0}
               icon={{uri:require(`./imgs/${nav.icon}.png`)}}
               selectedIcon={{uri:require(`./imgs/${nav.icon}-selected.png`)}}
               selected={nav.path===path}
               onPress={()=>this.props.history.replace(nav.path)}
          />
          ))}
      </TabBar>
    )
  }
}
//返回一个包装后的组件，
// 内部的非路由组件就可以接收到一些路由器的一些属性（history,match,location）
export default withRouter(NavFooter);
/*
* Item中：
*   title：标题
*   icon：默认显示图片
*   selectedIcon：动态显示选择的图片
*   selected：判断是否被选中，true时选中
*   onPress：onPress表示按下时，根据history跳转到对应的组件
* */