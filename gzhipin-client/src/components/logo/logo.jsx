/*logo组件*/
import React from 'react'
import logo from './imgs/logo.png'
import './logo.less'

/*没有交互和状态的组件，可以用函数来定义*/
export default function Logo(){
  return (
    <div className='logo-container'>
      <img className='logo' src={logo} alt="logo"/>
    </div>
  )
}