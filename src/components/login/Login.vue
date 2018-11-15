<template>
    <div>
        <div id="form">
            <form @submit.prevent="Login">
                <p>이메일</p><br>
                <input id="email" placeholder="Enter your E-mail" type="text" v-model="user.email" name="" value="" required><br>
                <p>비밀번호</p><br>
                <input type="password" placeholder="Enter your password" v-model="user.pw" name="" value="" required><br>
                <button type="submit" name="button">로그인</button>
            </form>

        </div>
        <div class="div">
            <div id="divider" class="ui horizontal divider">
                <p>또는</p>
            </div>
        </div>
        <div id="joinDiv">
            <form method="post">
                <p>계정이 없으신가요? &nbsp; <router-link to="/login/auth">가입하기</router-link> </p>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                user:{
                    email: "",
                    pw: "",
                }
            }
        },
        methods: {
            Login(){
                const user_data = {
                    email: this.user.email,
                    password: this.user.pw
                };
                this.$store.dispatch('login/LOGIN', user_data)
            }
        },
        mounted(){
            localStorage.removeItem("user_pk");
            localStorage.removeItem("token");
            this.$store.state.login.logged_in = false;
        }
    }
</script>


<style scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: Noto Sans KR;
    }
    #form{
        display: inline-block;
        width: 90%;
        height: auto;
        padding: 15px;
        padding-top: 30px;
        padding-bottom: 30px;
        margin-top: 5%;
        background-color: white;
        box-shadow: 3px 6px 30px lightgray;
        border-radius: 10px;
        float: none;
    }
    form>p{
        display: inline-block;
        width: 85%;
        text-align: left;
        margin: 0 auto;
        font-weight: bold;
        margin-bottom: 5px;
        font-size: 15px;
    }


    form>input:focus{
        background: #f8f8f8;
        border: 1px solid lightgray;
    }

    form> input{
        padding-left: 15px;
        width: 85%;
        margin-bottom: 15px;
        height: 40px;
        outline: none;
        background-color: lightgray;
        border-style: none;
        border-radius: 10px;
    }

    form> button{
        margin-top: 20px;
        width: 85%;
        height: 40px;
        outline: none;
        border-style: none;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        font-size: 15px;
        background-color:  #ab2631;
    }

    #divider{
        margin: 20px auto;
        width: 80%;
    }

    #joinDiv{
        float: none;
        background-color: white;
        box-shadow: 3px 6px 30px lightgray;
        border-radius: 10px;
        width: 90%;
        height: 10%;
        line-height: 50px;
        min-height: 50px;
        margin-bottom: 5%;
        display: inline-block;
    }



    #joinDiv>form>p{
        display: inline-block;
        text-align: middle;
        width: auto;
        height: 100%;
        padding: 0 auto;
    }

    #joinDiv>form>p>a{
        color:  #ab2631;
        font-weight: bold;
    }

    @font-face{
        font-family: 'Noto Sans KR', sans-serif;
        font-display: fallback;
    }

</style>