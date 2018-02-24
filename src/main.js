import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import  VueResource  from 'vue-resource'
import 'iview/dist/styles/iview.css';
import  ECharts  from 'echarts'

// import Axios from 'axios'


Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(iView);
// Vue.use(ECharts);
Vue.prototype.$echarts = ECharts
// Vue.use(Axios);

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
