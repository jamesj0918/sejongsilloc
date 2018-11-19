<template>
    <div id="editProfileWrapper">
        <h3>프로필 편집하기</h3>
        <div id="editProfileWrap">
            닉네임 변경<br/>
            <input name="nickname" v-model="nickname" placeholder="닉네임을 입력하세요."/>
            <br/>
            프로필 및 배경 사진 변경
            <br/>

            프로필 변경<br/>
            <input name="" placeholder="사진을 불러오세요."/>
            <a style="cursor:pointer">업로드</a>
            <br/>

            배경 변경<br/>
            <input name="" placeholder="사진을 불러오세요."/>
            <a style="cursor:pointer">업로드</a>
            <br/>

            <button id="btnCancel" type="button" @click="cancel">취소</button>
            <button id="btnSubmit" type="button" @click="edit" style="cursor: pointer">수정</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                nickname: "",
            }
        },
        methods: {
            cancel() {
                this.$router.push('/');
            },
            edit() {
                const the_data = {
                    username: this.nickname,
                };
                axios.patch('profile/',the_data)
                    .then(()=>{
                        this.$router.push('/');
                    })
            }
        },
        mounted(){
            axios.get('profile/')
                .then((response)=>{
                    this.nickname = response.data.username;
                })
        }

    }
</script>

<style scoped>

</style>