<template>
    <div id="EditProfile">
        <div id="EditProfileWrap">
            <div id="pageTitle"><h3>프로필 편집하기</h3></div>
            <div id="editProfileContent">
                <div id="editName">
                    <div class="contentTitle"><h4>닉네임 수정</h4></div>
                    <input id="inputName" name="nickname" v-model="nickname" placeholder="닉네임을 입력하세요."/>
                </div>
                <div id="editImg">
                    <div class="contentTitle"><h4>프로필 및 배경 사진 수정</h4></div>
                    <div id="editImgContent">
                        <div id="divLeft">
                            <div id="bannerImgWrap"></div>
                            <div id="profileWrap">
                                <div id="profileImgWrap">
                                    <img src="" id="profileImg"/>
                                </div>
                            </div>
                        </div>
                        <div id="divRight">
                            <div id="editBanner">
                                <div class="contentSubTitle"><h5>배경 수정</h5></div>
                                <input id="inputBanner" name="" placeholder="사진을 불러오세요."/>
                                <div class="imgSubmit"><a style="cursor:pointer">업로드</a></div>
                            </div>
                            <div id="editProfileImg">
                                <div class="contentSubTitle"><h5>프로필 수정</h5></div>
                                <input id="inputProfile" name="" placeholder="사진을 불러오세요."/>
                                <div class="imgSubmit"><a style="cursor:pointer">업로드</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="editBio">
                    <div class="contentTitle"><h4>자기소개 수정</h4></div>
                    <input id="inputDescription" name="" v-model = "description" placeholder="자기소개를 입력해주세요."/>
                </div>
                <div id="editBtnWrap">
                    <button id="cancelBtn" class="editBtn" type="button" @click="cancel">취소</button>
                    <button id="submitBtn" class="editBtn" type="button" @click="edit" style="cursor: pointer">수정</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                nickname: "",
                description: "",
            }
        },
        methods: {
            cancel() {
                this.$router.push('/');
            },
            edit() {
                const the_data = {
                    username: this.nickname,
                    bio: this.description,
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
                    this.description = response.data.bio;
                })
        }

    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        cursor: default;
        font-family: "Noto Sans KR";
    }

    a {
        text-decoration: none;
        color: white;
    }

    input {
        outline: 0;
        font-size: 12px;
        font-weight: bold;
        padding: 5px 5px;
        background-color: rgba(242,242,242,0.6);
        border-color: rgba(169,169,169,0.3);
        border-width: 1px;
        border-radius: 7px;
    }

    input:focus {
        outline: none;
    }

    input::placeholder {
        color: rgba(169, 169, 169, 1);
        font-size: 12px;
        font-weight: lighter;
    }

    input:focus::placeholder {
        color: rgba(169, 169, 169, 0.6);
    }

    button:focus {
        outline: none;
    }

    #EditProfile {
        width: 100%; height: 92vh;
        overflow-y: scroll;
    }

    #EditProfileWrap {
        width: 97%; height: auto;
        margin: 0 auto;
        padding: 3% 3%;
        margin-top: 2%;
        border-radius: 10px;
        background-color: white;
    }

    #editName {
        width: 100%; height: auto;
        margin-top: 1.5vh;
    }

    .contentTitle {
        margin-bottom: 0.5vh;
    }

    #inputName {
        width: 100%;
    }

    #editImg {
        width: 100%; height: auto;
        margin-top: 3%;
    }

    #editImgContent {
        width: 100%; height: calc(16vw + 2px);
    }

    #divLeft {
        width:16vw; height: 16vw;
        border: solid; border-width: 1px; border-color: rgba(229, 229, 229, 1);
        border-radius: 7px;
        overflow: hidden;
        float: left;
    }

    #bannerImgWrap {
        width: 100%; height: 8vw;
        position: relative;
        overflow: hidden;
        background-color: rgba(229, 229, 229, 1);
        vertical-align: center;
    }

    #profileWrap {
        width: 100%; height: 8vw;
        position: relative;
        top: -4vw;
    }

    #profileImgWrap {
        width: 8vw; height: 8vw;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
    }

    #profileImg {
        width: 100%; height: 100%;
    }

    #divRight {
        width: calc(100% - 16vw - 2px); height: auto;
        float: left;
        padding: 1% 0;
        padding-left: 5%;
    }

    #editBanner {
        margin-bottom: 6%;
    }

    .contentSubTitle {
        margin-bottom: 1%;
    }

    #inputBanner {
        width: calc(100% - 58px);
        color: #5b5b5b;
        display: inline-block;
    }

    .imgSubmit {
        width: 50px; height: auto;
        text-align: center;
        padding: 2px;
        font-size: 11px;
        font-weight: bold;
        background-color: #8c151f;
        color: white;
        border-radius: 5px;
        display: inline-block;
        float: right;
    }

    #inputProfile {
        width: calc(100% - 58px);
        color: #5b5b5b;
        display: inline-block;
    }

    #editBio {
        width: 100%; height: auto;
        margin-top: 3%;
    }

    #inputDescription {
        width: 100%;
    }

    #editBtnWrap {
        width: 100%; height: auto;
        margin-top: 2vh;
    }

    #cancelBtn {
        margin-left: calc(100% - 120px - 10px);
        margin-right: 10px;
        color: black;
        border: solid;
        border-width: 1px;
        border-color: rgba(220, 220, 220, 1);
        background-color: white;
    }

    #submitBtn{
        background-color: #8c151f;
    }

    .editBtn {
        width: 60px;
        padding: 1.8% 2%;
        color: white;
        border:none;
        font-size: 12px;
        border-radius: 5px;
    }

</style>