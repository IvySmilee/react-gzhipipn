/*  对话消息列表组件 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item;
const Brief = Item.Brief;

/*
* 根据chatMsgs数组得到所有聊天的最后聊天的msg数组
*   1.创建一个用于保存所有lastMsg的对象容器：lastMsgObjs
*   2.遍历每个msg，判断msg是否是它对应的聊天lastMsg，如果是，放入
*   3.得到lastMsgObjs中所有属性值组成的数组：lastMsgs
*   4.对lastMsgs进行排序（倒叙）
* */
function getLastMsgs(chatMsgs,meId){
  // 1.创建一个用于保存所有lastMsg的对象容器：lastMsgObjs
  const lastMsgObjs={};
  // 2.遍历每个msg,判断msg是否是它对应的聊天lastMsg，如果是，放入
  chatMsgs.forEach(msg=>{
    /*未读消息：统计msg自身的unReadCount*/
    // console.log(!msg.read,msg.to===meId)
    if(!msg.read && msg.to===meId){ //如果是别人发给我的消息
      msg.unReadCount=1;
    }else{
      msg.unReadCount=0;

    }
    console.log(msg);

    //2.1.获取聊天的id
    const chatId=msg.chat_id;
    //2.2.获取聊天的数组
    const lastMsg=lastMsgObjs[chatId];
    //2.3.判断保留最新的聊天数组
    if(!lastMsg){
      //2.3.1.当前的聊天，还没有lastMsg数组，就把当前的聊天作为数组，放到lastMsgObjs对象里面
      lastMsgObjs[chatId]=msg;
      console.log(lastMsgObjs);
    }else{
      /*计算最新的未读数量*/
      const unReadCount = lastMsg.unReadCount + msg.unReadCount;

      //2.3.2.如果聊天的数组存在，就判断两个聊天的创建时间，保留后创建的聊天
      if(msg.create_time>lastMsg.create_time){
        lastMsgObjs[chatId]=msg;
      }

      /*给最新的lastMsg指定unReadCount*/
      lastMsgObjs[chatId].unReadCount = unReadCount;
    }

  });
  // 3.得到lastMsgObjs中所有属性值组成的数组：lastMsgs
  //  ---Object.values(obj),返回obj对象中属性名组成的数组；
  const lastMsgs=Object.values(lastMsgObjs);
  // 4.对lastMsgs进行排序（倒叙）
  lastMsgs.sort(function(m1,m2){
    return m2.create_time-m1.create_time;
  });

  //5.返回最后创建消息组成的，并且倒叙排列的数组
  return lastMsgs;
}

class Message extends Component {

  render() {
    const {user,chat}=this.props;
    const {users,chatMsgs}=chat;
    const meId=user._id;
    //根据chatMsgs得到所有聊天的最后聊天的msg的数组
    const lastMsgs=getLastMsgs(chatMsgs,meId);

    return (
      <List style={{marginBottom:50,marginTop:50}}>
        {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
        <QueueAnim type='scale' delay={100}>
          {
            lastMsgs.map((msg,index)=>{
              const targetId=msg.from===meId ? msg.to : msg.from;
              const targetUser=users[targetId];
              const icon=targetUser.header ? require(`../../assets/imgs/${targetUser.header}.png`) : null;
              return (
                <Item
                  key={index}
                  extra={<Badge text={msg.unReadCount}/>}
                  thumb={icon}
                  arrow='horizontal'
                  onClick={()=>this.props.history.push(`chat/${targetId}`)}
                >
                  <Brief>{targetUser.username}</Brief>
                  {msg.content}
                </Item>
              )
            })
          }
        </QueueAnim>
      </List>
    )
  };
}
export default connect(
  state=>({user:state.user,chat:state.chat}),
  {}
)(Message);