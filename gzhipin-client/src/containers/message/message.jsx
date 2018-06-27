/*  对话消息列表组件 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item;
const Brief = Item.Brief;

class Message extends Component {

  render() {

    return (
      <List style={{marginBottom:50,marginTop:50}}>
        <Item
          extra={<Badge text={3}/>}
          thumb={require(`../../assets/imgs/头像1.png`)}
          arrow='horizontal'
        >
          你好
          <Brief>nr1</Brief>
        </Item>

        <Item
          extra={<Badge text={0}/>}
          thumb={require(`../../assets/imgs/头像2.png`)}
          arrow='horizontal'
        >
          你好2
          <Brief>nr2</Brief>
        </Item>
      </List>
    )
  }
}
export default connect(
  state=>({})
)(Message)