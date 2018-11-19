<template>
    <div id="SearchFormWrap">
        <div id="marginTop"></div>
        <div id="searchForm">
            <div id="homeMenuBtn">
                <div id="logoWrap" @click="link_home" style="cursor:pointer">
                    <div id="logo">
                        LOGO
                    </div>
                </div>
                <div id="menuToggle" style="cursor:pointer" @click="openNav()">
                    <i class="bars white big icon"></i>
                </div>
            </div>
            <form id="searchDiv" @submit.prevent="search(search_data)">
                <input id="search" v-model="search_data" type="text" placeholder="검색할 내용을 입력하세요.">
                <div id="searchIconWrapper"><button id="search_submit" type="submit" style="cursor:pointer"><i class="white search icon"></i></button></div>
            </form>
        </div>
    </div>
</template>


<script>
    export default {
        data(){
            return{
                search_data : ''
            }
        },
        methods: {
            link_home() {
                this.$router.push('/');
            },
            logout() {
                localStorage.removeItem("token");
                localStorage.removeItem("user_pk");
                this.$store.state.login.logged_in = false;
                this.$router.push('/login');
            },
            openNav(){
                this.$store.dispatch('OPEN_SIDEBAR')
            },
            search(search_data){
                this.search_data = '';
                this.$router.push({path: '/search', query : {search_data : search_data}});
            }
        }
    }
</script>

<style scoped>
    @font-face {
        font-family: 'Noto Sans KR', sans-serif;
        font-display: fallback;
    }

    * {
        margin: 0;
        padding: 0;
        font-family: 'Noto Sans KR';
    }

    ::-webkit-scrollbar-track {
        background-color: #8c151f;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #8c151f;
    }

    button {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.5);
    }

    button:hover {
        color: rgba(255, 255, 255, 1);
        outline: none;
    }


    #marginTop {
        height: calc((100% - 35px) / 2);
    }

    #menuToggle {
        display: none;
    }

    #SearchFormWrap {
        height: 100%;
        width: 100%;
    }

    #searchForm {
        height: calc(100% - (100% - 35px) / 2);
        width: 80%;
        margin: 0 auto;
    }

    #search_submit {
        background: none;
        border: none;
    }

    #homeMenuBtn {
        height: 35px;
        width: 20%;
        display: inline-block;
        float:left;
    }
    #logoWrap{

    }
    #logo {
        margin-top: 1.5vh;
        height: 100%;
        font-size: 30px;
        text-align: center;
        vertical-align: middle;
    }

    #searchDiv {
        color: rgba(255, 255, 255, 0.5);
        display: inline-block;
        width: 370px;
        height: 35px;
        border-radius: 7px;
        background-color: #8c151f;
        float: left;
        margin-left: calc((100% - 370px) / 2 - 20%);
    }

    input::placeholder {color: rgba(255, 255, 255, 0.5);}

    #search {
        height: 100%;
        background-color: rgba(255, 255, 255, 0);
        color: rgba(255, 255, 255, 0.7);
        text-align: center;
        width: 80%;
        margin: 0;

        border: none;
        font-size:14px;
        font-weight: bold;
        overflow: initial;
    }

    #searchIconWrapper{
        display: inline-block;
        width: 10%;
        height: 100%;
        text-align: center;
    }

    #search:focus {
        font-weight: bold;
        font-size: 14px;
        outline: none;
    }
    @media all and (max-width:1024px) {
        #searchDiv {
            width: 320px;
            margin-left: calc((100% - 320px) / 2 - 20%);
        }
    }
    /* 모바일 (해상도 640px 이하) */
    @media all and (max-width:640px) {

        #searchForm {
            width: 100%;
            height: 35px;
        }

        #homeMenuBtn {
            display: inline-block;
            width: 35px;
            height: 35px;
            margin-left: 2%;
            border: none;
        }

        #logo {
            display: none;
        }

        #menuToggle {
            display: inline-block;
            height: 35px;
            width: 35px;
            text-align: center;
            vertical-align: middle;
            font-size: 17px;
        }

        #menuToggle i {
            text-align: center;
            color: white;
        }

        #searchDiv {
            width: 60%;
            margin-left: calc(20% - 35px);
        }
    }
</style>
