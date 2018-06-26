/*  用户列表的UI组件 */

import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace} from 'antd-mobile'

const Header = Card.Header;
const Body=Card.Body;

class UserList extends React.Component {
  static propTypes={
    userList:PropTypes.array.isRequired
  };

  render() {

    let userList = this.props.userList;
    userList=userList.filter(user=> user.header);//过滤掉没有头像的用户
    console.log(userList);
    return (
      <WingBlank style={{marginTop: 50, marginBottom:50}}>
        {
          userList.map((user, index) => (
            <div key={index}>
              <WhiteSpace/>
              <Card>
                <Header
                  thumb={require(`../../assets/imgs/${user.header}.png`)}
                  extra={user.username}
                />
                <Body>
                <div>职位: {user.post}</div>
                {user.company ? <div>公司: {user.company}</div> : null}
                {user.salary ? <div>月薪: {user.salary}</div> : null}
                {user.salary ? <div>月薪: {user.salary}</div> : null}
                <div>描述: {user.info}</div>
                </Body>
              </Card>
            </div>
          ))
        }

      </WingBlank>
    )
  }
}

export default UserList;