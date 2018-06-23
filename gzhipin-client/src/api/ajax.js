/*
* 通用的ajax请求函数模块
*   封装的是axios
*   函数的返回值是promise对象
* */
import axios from 'axios'

export default function ajax (url,data={},type='GET'){
  if(type==='GET'){
    // 对参数拼串
    // data={username:'Tom', password: '123'}
    // url?username=tom&password=123
    let queryStr='';
    //Object.keys(data)：拿到所有属性名组成的数组
    Object.keys(data).forEach(key=>{
      const value=data[key];
      queryStr+=key+'='+value+'&';
    });
    //判断queryStr是否有值，截去拼串后最后多的&
    if(queryStr){
      queryStr=queryStr.substring(0,queryStr.length-1);
    }
    //发送ajax请求
    return axios.get(url+'?'+queryStr);
  }else{
    return axios.post(url,data);
  }
}
