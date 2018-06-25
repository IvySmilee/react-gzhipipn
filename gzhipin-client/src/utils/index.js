/*包含n个工具函数的模块*/

/*
* 动态计算：注册/登录成功的跳转路径：
*   注册老板----> /laobaninfo
*   注册大神----> /dasheninfo
*   登录老板----> /laobaninfo 或者 /laoban
*   登录大神----> /dasheninfo 或者 /dashen
* */

export function getRedirectPath(type,header){
  let path='';
  //根据type得到path
  path= type==='laoban' ? '/laoban' : '/dashen';

  //如果没有头像，添加info
  if(!header){
    path+='info'
  }

  return path;
}