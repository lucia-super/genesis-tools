import axios from "axios"
import Constants from "../Constants"

//TODO 创建实例时设置配置的默认值
var instance = axios.create({
    baseURL: Constants.baseURL
});
instance.defaults.headers.common['Authorization'] = "AUTH_TOKEN";
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
});

function request(url, method, data) {
    return instance({
        url,
        method,
        data
    })
}

export default request