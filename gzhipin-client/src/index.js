
/*入口js文件*/
import React from 'react'
import ReactDOM from 'react-dom'
// import {Button} from 'antd-mobile' //测试用
import {Provider} from 'react-redux'
import {HashRouter,Switch,Route} from 'react-router-dom'

import store from './redux/store'
import Login from './containers/login/login'
import Register from './containers/register/register'
import Main from './containers/main/main'

import './assets/css/index.less'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route component={Main}/> {/*默认根目录为main*/}
      </Switch>
    </HashRouter>
  </Provider>
,document.getElementById('root'));