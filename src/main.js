// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import QS from 'qs'
import Axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Echarts from 'echarts';
Vue.use(ElementUI);
Vue.prototype.$echarts = Echarts


Vue.prototype.$http=Axios
Axios.defaults.baseURL = 'https://www.bitsou.com';
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.config.productionTip = false

Axios.interceptors.request.use(config => {
  if(config.method=='post'){
    config.data=QS.stringify(config.data);//防止post请求参数无法传到后台
  }
  return config
}, error => {
  Message.error({
    message: '加载超时'
  });
  return Promise.reject(error)
});
// http响应拦截器
Axios.interceptors.response.use(data => {
  return data
}, error => {
  Message.error({
    message: '加载失败'
  });
  return Promise.reject(error)
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
