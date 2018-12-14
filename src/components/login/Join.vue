<template lang="html">
    <div>
        <div id="title">
            <p>가입하기</p>
        </div>
        <form id="form"  @submit.prevent="join()">
            <p>이메일</p>
            <input  v-model="email" type="text" name="" value="" placeholder="Enter your Student-ID">
            <p>비밀번호</p>
            <input v-model="password" type="password" name="" value="" placeholder="Enter your password">
            <p>닉네임</p>
            <input v-model="username" type="text" name="" value="" placeholder="Enter your password">
            <button type="submit" name="button" >확인</button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Join",
        data(){
            return{
                email: "",
                username: "",
                password: ""
            }
        },
        methods:{
            join(){
                const user_data = {
                    email: this.email,
                    password: this.password,
                    username: this.username,
                    student_id: this.$store.state.join.student_id
                };
                axios.post('user/signup/', user_data)
                    .then(response => {
                        if (response.status === 201) {
                            this.$router.push('/login')
                        }
                    })
                    .catch((error) => {
                        if (error.response.email == "user with this email already exists.") alert('이 이메일은 이미 사용중입니다.');
                        else if(error.resonse.password == "This field may not be blank.") alert('비밀번호를 입력해주세요.');
                        else if (error.response.password == "Ensure this field has at least 8 characters.") alert('비밀번호는 최소 8글자부터 사용가능합니다.');
                        else if (error.response.student_id == "user with this student id already exists.") alert('이 학번을 사용한 사용자가 이미 있습니다.');
                        else if (error.response.username == "user with this username already exists.") alert('이 닉네임은 이미 사용중입니다.');
                    })
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