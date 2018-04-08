import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import  VueResource  from 'vue-resource'
import 'iview/dist/styles/iview.css';
import  ECharts  from 'echarts'
import  URL from './api/URL'

// import Axios from 'axios'


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(iView);
// Vue.use(ECharts);
Vue.prototype.$echarts = ECharts
// Vue.use(Axios);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: Routers
};
// Vue.prototype.routeName = ''
Vue.prototype.URL=URL.url
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (to.path == '/login') {
        sessionStorage.removeItem('tokens');
    }
    let token = sessionStorage.getItem('tokens');
    if ((token=='undefined' && to.path != '/login') || (token==null && to.path != '/login')) {
        next({ path: '/login' })
    } else {
        Util.title(to.meta.title);
        Vue.prototype.routeName=to.meta.title
        next()
    }
});

Vue.http.interceptors.push((request, next) => {
    // ...
    // 请求发送前的处理逻辑
    // ...
    // modify method
    // request.method = 'POST';
    //
    // modify headers
    // request.headers.set('X-CSRF-TOKEN', 'TOKEN');
    let token = sessionStorage.getItem('tokens');
    request.headers.set('Authorization', token);
    next((response) => {
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态，response参数会返回给successCallback或errorCallback
        return response
    })
})

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
