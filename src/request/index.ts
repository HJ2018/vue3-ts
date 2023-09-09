import axios from "axios";


//创建axios 实例
 const service = axios.create({
    baseURL:"https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
    // "https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8000b8/api",
    timeout:5000,
    headers:{
        "Content-Type":'application/json;charset=utf-8'
    }
 })


 //请求拦截
 service.interceptors.request.use((config)=>{
    config.headers = config.headers ?? {}
    if(localStorage.getItem("token")){
        config.headers.token = localStorage.getItem('token') ??''
    }
    return config
 }, (error) => {
    console.log(error);
  
    return Promise.reject(error)
  }) 



  //响应拦截
 service.interceptors.response.use((response) => {
    console.log(response);

    const code : number = response.data.data.code

    console.log(code)
    console.log(response.data.data)

    return response.data.data;

    // if(code != 200){
    //     return Promise.reject(response.data)
    // }else{
    //     return response.data
    // }
  
    // if (response.data?.errno === 0) {
    //     return response.data.data;
    // }
  
    // else {
    //     return response
    // }
    return response.data
  
  }, (error) => {
    console.log(error);
  
    return Promise.reject(error)
  });
  

  export default service;