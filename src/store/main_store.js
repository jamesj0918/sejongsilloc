import Vue from 'vue'
import Vuex from 'vuex'

import join from './modules/join_module'
import login from './modules/login_module'
import sidebar from './modules/sidebar_module'
import axios from 'axios'

Vue.use(Vuex)


const main_store = new Vuex.Store({
    modules: {
        login,
        join,
        sidebar,
    }
});

export default main_store
