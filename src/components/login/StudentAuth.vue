<template>
    <div>
        <div id="title">
            <p>학생인증</p>
        </div>
        <form id="form" @submit.prevent="student_auth()">
            <p>학번</p>
            <input  v-model="student_id" type="text" name="" value="" placeholder="Enter your Student-ID">
            <p>비밀번호</p>
            <input v-model="student_pw" type="password" name="" value="" placeholder="Enter your password">
            <button type="submit" name="button" >확인</button>
        </form>
        <div id="notice">
            <p>세종대 학생들만의 이용을 위한 과정입니다. <br>입력되는 정보는 데이터베이스에 저장되지 않습니다. </p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'


    export default {
        name: "StudentAuth",
        data(){
            return{
                student_id: "",
                student_pw: "",
            }
        },
        methods:{
            student_auth(){
                const user_data ={
                    student_id : this.student_id,
                    password : this.student_pw
                };
                axios.post('user/auth/', user_data)
                    .then(response => {
                        if (response.status == 202) {
                            this.$router.push({path: '/login/join'});
                            this.$store.dispatch('join/SET_STUDENT_ID', this.student_id)
                        }
                    })
                    .catch(() => alert('학생인증 정보가 정확하지 않습니다.'))
            }
        }
    }
</script>


<style scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: Noto Sans KR;
    }
    #title > p{
        font-size: 20px;
        font-weight: bold;
    }
    #notice{

        margin: 0 auto;
        padding: 0 auto;
        width: 90%;
    }
    #notice > p{
        color: gray;
    }

    #form{
        display: inline-block;
        width: 90%;
        height: auto;
        padding: 15px;
        padding-top: 30px;
        padding-bottom: 30px;
        margin-top: 5%;
        margin-bottom: 5%;
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
    @font-face{
        font-family: 'Noto Sans KR', sans-serif;
        font-display: fallback;
    }

</style>