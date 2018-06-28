/*对话聊天的路由组件*/
import React,{Component} from 'react'
import {NavBar,List,InputItem,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg,updateMsg} from "../../redux/actions";


const Item=List.Item;

class Chat extends Component{

  state={
    content:'',
    isShow:false
  };

  send=()=>{
    const {content}=this.state;
    const from=this.props.user._id;
    const to=this.props.match.params.userid; //对应main路径里面的：id，即聊天对象的id
    if(!content){
      return null;
    }
    //发送消息
    this.props.sendMsg({from,to,content});
    //发送后清除输入框中的消息
    this.setState({content:'',isShow:false})
  };

  // 第一次调用render渲染前调用, 调用一次
  componentWillMount () {
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'];
    this.emojis = emojis.map(value => ({text: value}))
    // console.log(this.emojis)
  };

  //初始化，打开界面，自动滚动到聊天底部
  componentDidMount(){
    //初始显示列表
    window.scrollTo(0,document.body.scrollHeight);

  /*  //上来更新消息
    const from=this.props.match.params.userid; //获取到聊天对象的id
    const to=this.props.user._id; //得到当前用户的id
    this.props.updateMsg(from,to);*/
  };

  //更新后，自动滚动到底部
  componentDidUpdate(){
    //更新显示列表
    window.scrollTo(0,document.body.scrollHeight);
  }

  //退出，死亡前调用，每一次渲染前都会调用，除了第一次渲染
  componentWillUnmount(){
    const from=this.props.match.params.userid; //获取到聊天对象的id
    const to=this.props.user._id; //得到当前用户的id
    this.props.updateMsg(from,to);
  }
  //切换表情列表的显示
  toggleShow=()=>{
    const isShow=!this.state.isShow;
    this.setState({isShow});
    if(isShow){
      //异步手动派发resize事件，解决表情列显示的bug
      setTimeout(()=>{
        //通过window分发事件，改变Grid的尺寸
        window.dispatchEvent(new Event('resize'));
      },0)
    }
  };

  render(){

    const {user,chat}=this.props;
    const {users,chatMsgs}=chat; //获取到发送消息中的所有用户对象和消息数组
    const targetId=this.props.match.params.userid; //获取到聊天对象的id
    const meId=user._id; //得到当前用户的id
    if(!users[targetId]) {
      return null // 不做任何显示
    }

    //得到当前聊天的id
    const chatId=[targetId,meId].sort().join('_');

    //对消息数组chatMsg进行过滤（保留当前用户的聊天记录）
    const currentMsgs=chatMsgs.filter(msg=>msg.chat_id===chatId);
    //msg to msg.from

    const targetUser=users[targetId];
    const targetIcon=targetUser.header ? require(`../../assets/imgs/${targetUser.header}.png`) : null;

    return (
      <div id='chat-page'>
        <NavBar icon={<Icon type='left'/>} className='stick-top'
            onLeftClick={()=>this.props.history.goBack()}
        >
          与{users[targetId].username}聊天中</NavBar>
        <List style={{marginBottom:50,marginTop:50}}>
          {
            currentMsgs.map((msg,index)=>{
              if(msg.to===meId){
                return <Item key={index} thumb={targetIcon}>{msg.content}</Item>;
              }else{
                return <Item key={index} className='chat-me' extra='我'>{msg.content}</Item>;
              }
            })
          }
        </List>
        <div className='am-tab-bar'>
          <InputItem placeholder='请输入内容'
            onChange={(val)=>this.setState({content:val})}
            onFocus={()=>{this.setState({isShow:false})}}
            value={this.state.content}
            extra={
              <div>
                <span onClick={this.toggleShow} >😊</span>
                <span onClick={this.send} style={{marginLeft:15}}>发送</span>
              </div>
            }
          />
          {
            this.state.isShow ? (
              <Grid
                data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={(item)=>{
                  this.setState({
                    content:this.state.content+item.text
                  })
                }}
              />
            ): null
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user,chat:state.chat}),
  {sendMsg,updateMsg}
)(Chat)