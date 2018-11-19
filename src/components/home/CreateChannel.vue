<template lang="html">
    <div id="CreateChannel">
        <div id="CreateChannelWrap">
            <div id="pageTitle"><h3>새로운 실록 만들기</h3></div>
            <div id="createChannelContent">
                <div id="channelName">
                    <div class="contentTitle"><h4>실록 이름</h4></div>
                    <input id="inputName" name="user.name" v-model="user.name" placeholder="이름을 입력하세요." style="cursor: text"/>
                </div>
                <div id="channelImg">
                    <div class="contentTitle"><h4>프로필 및 배경 사진</h4></div>
                    <div id="channelImgContent">
                        <div id="divLeft">
                            <div id="bannerImgWrap"></div>
                            <div id="profileWrap">
                                <div id="profileImgWrap">
                                    <img src="" id="profileImg"/>
                                </div>
                            </div>
                        </div>
                        <div id="divRight">
                            <div id="selectBanner">
                                <div class="contentSubTitle"><h5>배경 사진 불러오기</h5></div>
                                <input id="inputBanner" type="profileImage" placeholder="사진을 불러오세요." style="cursor: text">
                                <div class="imgSubmit"><a style="cursor: pointer">업로드</a></div>
                            </div>
                            <div id="selectProfile">
                               <div class="contentSubTitle"><h5>프로필 사진 불러오기</h5></div>
                                <input id="inputProfile" type="profileImage" placeholder="사진을 불러오세요." style="cursor: text">
                                <div class="imgSubmit"><a style="cursor: pointer">업로드</a></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="channelDescription">
                    <div class="contentTitle"><h4>실록 설명</h4></div>
                    <input id="inputChannelDescription" name="user.description" v-model="user.description" placeholder="설명을 입력하세요." style="cursor: text"/>
                </div>
                <div id="channelDomain">
                    <div class="contentTitle" id="domainTitle"><h4>실록 도메인</h4></div>
                    <span id="fixedDomain">https://www.sejongsilloc.com/</span>
                    <input id="inputDomain" name="user.domain" v-model="user.domain" placeholder="영소문자 및 숫자 조합 ex)se1jong" style="cursor: text"/>
                </div>
                <div id="channelRule">
                    <div class="contentTitle" id="ruleTitle"><h4>실록 규칙</h4></div>
                    <table id="ruleTable">
                        <thead>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(rule, id) in user.rules">
                            <td id="inputRuleWrap"><input id="inputRule" type="text" v-model="rule.value" placeholder="규칙을 입력해주세요." style="cursor: text"></td>
                            <td id="deleteBtnWrap">
                                <div id="deleteBtn"><a id="btnInner" @click="removeElement(id)" style="cursor: pointer">삭제</a></div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div id="addBtn" v-if="this.user.rules.length!==5"><a @click="addRow" style="cursor: pointer">추가</a></div>
                </div>
                <div id="channelCreateBtnWrap"><button id="channelCreateBtn" type="button" @click="create" style="cursor: pointer">실록 생성</button></div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                user: {
                    name : "",
                    description : "",
                    domain : "",
                    rules : [{value: ''}],
                }
            }
        },
        methods: {
            addRow: function() {
                if(this.user.rules.length<5){
                    this.user.rules.push({
                        value: ''
                    });
                }
                else {
                    alert('규칙은 최대 5개까지 입력 가능합니다.');
                }
            },
            removeElement: function(index) {
                if(this.user.rules.length>1){
                    this.user.rules.splice(index, 1);
                }
                else{
                    alert('규칙을 하나 이상 입력해주세요!');
                }
            },

            create() {
                var ruleStr = this.user.rules[0].value;
                for(var i=1; i<this.user.rules.length; i++)
                {
                    ruleStr += "\\n" + this.user.rules[i].value;
                }
                const the_data = {
                    name: this.user.name,
                    description: this.user.description,
                    slug: this.user.domain,
                };
                axios.post('channel/',the_data)
                    .then(()=>{
                        this.$router.push('/subscription');
                    })

            }
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

    a:hover {
        text-decoration: none;
        color: white;
    }

    h4 {
        font-weight: bolder;
    }

    h5 {
        font-weight: bolder;
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

    #CreateChannel {
        width: 100%; height: 92vh;
        overflow-y: scroll;
    }

    #CreateChannelWrap {
        width: 97%; height: auto;
        margin: 0 auto;
        padding: 3% 3%;
        margin-top: 2%;
        border-radius: 10px;
        background-color: white;
    }

    #channelName {
        margin-top: 1.5vh;
        width: 100%; height: auto;
    }

    .contentTitle {
        margin-bottom: 0.5vh;
    }

    #inputName {
        width: 100%;
    }

    #channelImg {
        width: 100%; height: auto;
        margin-top: 3%;
    }

    #channelImgContent {
        width: 100%; height: calc(16vw + 2px);
    }

    #divLeft {
        width:16vw; height: 16vw;
        border: solid; border-width: 1px; border-color: rgba(229, 229, 229, 1);;
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

    #selectBanner {
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

    #channelDescription {
        margin-top: 3%;
    }

    #inputChannelDescription {
        width: 100%;
    }

    #channelDomain {
        margin-top: 3%;
    }

    #domainTitle {
        margin-bottom: 0.2%;
    }

    #fixedDomain {
        width: 177px;
        font-size: 12px;
        font-weight: bold;
        color: #5b5b5b;
        display: inline-block;
    }

    #inputDomain {
        width: calc(100% - 177px);

    }

    #channelRule {
        width: 100%;
        margin-top: 3%;
    }

    #ruleTitle {
        margin-bottom: 0.2%;
    }

    #inputRuleWrap {
        width: 100%;

    }

    #inputRule {
        width: 100%;
    }

    #deleteBtn {
        width: 50px; height: auto;
        text-align: center;
        padding: 2px;
        font-size: 11px;
        font-weight: bold;
        background-color: white;
        border-radius: 5px;
        display: inline-block;
    }

    #btnInner {
        color: #8c151f;
        font-size: 13px;
        font-weight: bolder;
    }

    #addBtn {
        width: 50px; height: auto;
        text-align: center;
        margin-top: 0.5%;
        padding: 2px;
        font-size: 11px;
        font-weight: bold;
        background-color: #8c151f;
        color: white;
        border-radius: 5px;
        display: inline-block;
    }

    #channelCreateBtnWrap {
        width: 100%;
        margin-top: 1vh;
    }

    #channelCreateBtn {
        width: 90px;
        margin-left: calc(100% - 84px);
        padding: 1.8% 2%;
        background-color: #8c151f;
        color: white;
        border:none;
        font-size: 12px;
        border-radius: 5px;

    }

    @media all and (max-width:600px){
        #divLeft {
            margin-top: 2%;
        }
    }

</style>
