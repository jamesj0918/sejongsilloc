import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/main_store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import SuiVue from 'semantic-ui-vue'
import '../semantic/dist/semantic.min.css'
import VueTextareaAutosize from 'vue-textarea-autosize'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import Vue2Filters from 'vue2-filters'
import  VueLazyLoad from 'vue-lazyload'

Vue.use(VueAxios, axios);
Vue.use(SuiVue);
Vue.use(VueTextareaAutosize);
Vue.use(Vue2Filters);
Vue.use(VueTabs);
Vue.use(VueLazyLoad);

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://sejongapi-v2.herokuapp.com/api/v2/";

if (localStorage.getItem("token")){
    axios.get('/profile' ,{
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : "JWT " + localStorage.getItem("token")
        }
    })
        .then(() => {
            axios.defaults.headers.common = {
                "Content-Type": "application/json",
                "Authorization": "JWT " + localStorage.getItem("token")
            };
        })
        .catch(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user_pk");
        })
    }
else {
    axios.defaults.headers.common = {
        "Content-Type" : "application/json"
    }
}

router.beforeEach((to, from, next) => {
    if (localStorage.getItem("token") || store.state.login.logged_in === true){
        axios.defaults.headers.common = {
            "Content-Type": "application/json",
            "Authorization": "JWT " + localStorage.getItem("token"),
        };
        next();
    }
    else {
        if(to.path === '/login' || to.path === '/login/auth' || to.path === '/login/join') {
            next();
        }
        else {
            alert('로그인이 필요합니다.');
            next('/login');
        }
    }
    if(store.state.sidebar.open ===true){
        store.state.sidebar.open = false;
    }
});

new Vue({
  axios,
  VueAxios,
  router,
  store,
  render: h => h(App),

}).$mount('#app');
