import Vue from 'vue';
import Router from 'vue-router';

import LoginLayout from './components/login/LoginLayout';
import Login from './components/login/Login';
import Join from './components/login/Join';
import StudentAuth from './components/login/StudentAuth';
import MainLayout from './components/MainLayout';

import HomeLayout from './components/home/HomeLayout';
import Home from './components/home/Home';
import SubscriptionList from './components/home/SubscriptionList';
import CreateChannel from './components/home/CreateChannel';
import EditProfile from './components/home/EditProfile';

import ChannelLayout from'./components/channel/ChannelLayout';
import Channel from './components/channel/Channel';
import WritingPost from './components/channel/PostSubmission';
import SinglePostView from './components/channel/SinglePostView';
import EditPost from './components/channel/EditPost';
import DashBoard from './components/channel/DashBoard';

import SearchResult from './components/search/SearchResult';


Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            component: LoginLayout,
            children: [
                {
                    path:'/',
                    component: Login,
                },
                {
                    path: 'auth',
                    component: StudentAuth,
                },
                {
                    path:'join',
                    component: Join,

                    beforeEnter: (to, from, next) => {
                        if(from.path === '/login/auth') next();
                        else{
                            alert("옳바르지 않은 접근입니다.");
                            next('/login');
                        }
                    }
                }
            ],
        },
        {
            name: 'MainLayout',
            path: '/',
            component: MainLayout,
            children: [
                {
                    name: 'HomeLayout',
                    path: '/',
                    component: HomeLayout,
                    children: [
                        {
                            name:'Home',
                            path:'/',
                            component: Home,
                        },
                        {
                            name:'SubscriptionList',
                            path:'/subscription',
                            component: SubscriptionList,
                        },
                        {
                            name: 'CreateChannel',
                            path: '/createchannel',
                            component: CreateChannel,
                        },
                        {
                            name:'SearchResult',
                            path: '/search',
                            component: SearchResult,
                        },
                        {
                            name:'EditProfile',
                            path: '/editprofile',
                            component: EditProfile,
                        }
                    ]// HomeLayout Children
                },// HomeLayout
                {
                    name: 'ChannelLayout',
                    path: ':channelID',
                    component:ChannelLayout,

                    children:[
                        {
                            name: 'Channel',
                            path: '/',
                            component: Channel,
                        },
                        {
                            name: 'WritingPost',
                            path: 'post',
                            component: WritingPost,
                        },
                        {
                            name: 'SinglePostView',
                            path: ':postID',
                            component: SinglePostView,
                            beforeEnter(to, from, next){
                                if (to.params.postID === "dashboard") {
                                    alert('옳바르지 않은 주소입니다.');
                                    next('/');
                                }
                                else next();
                            }
                        },
                        {
                            name: 'EditPost',
                            path: 'edit/:postID',
                            component: EditPost,
                        },
                        {
                            name: 'DashBoard',
                            path: 'dashboard',
                            component: DashBoard
                        }
                    ],
                },
            ]// MainLayout Children
        }
    ]
})
