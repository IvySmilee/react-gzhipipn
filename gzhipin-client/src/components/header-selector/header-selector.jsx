/*选择用户头像的组件*/
import React,{Component} from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component{
  static propTypes={
    setHeader:PropTypes.func.isRequired
  };

  state={
    icon:null
  };

  handleSelectHeader=({icon,text})=>{
    //更新状态
    this.setState({icon});
    this.props.setHeader(text)
  };
  render(){
    const {icon}=this.state;
    const header=!icon ? '请选择头像' : <p>已选择头像：<img src={icon} alt='头像'/></p>;
    const headers=[];
    //遍历头像，生成头像信息数组
    for (var i = 0; i <20; i++) {
      const text='头像'+(i+1);
      //引入所有的头像图片，赋给icon
      const icon=require(`./imgs/${text}.png`);
      headers.push({text,icon});
    }

    return (
      <List renderHeader={()=>header}> {/*显示list头部信息*/}
        <Grid onClick={this.handleSelectHeader} data={headers} columnNum={5}/>{/*网格展示头像图片*/}
      </List>
    )
  }
}