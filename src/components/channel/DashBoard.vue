<template>
    <div id="DashBoard">
        <div id="DashBoardWrap">
            <div id="dashBoardTitle"><h3>실록 관리</h3></div>
            <div id="channelManaging">
                <div class="tabTitle"><h4>기본 정보 수정</h4></div>
                <vue-tabs id="channelTabWrap"
                    direction="vertical"
                    active-tab-color="darkGray"
                    active-text-color="white"
                    type="pills">
                    <v-tab title="프로필 및 배경사진" class="channelMenuList">
                        <div class="contentTitle">
                            <div id="editImg">
                                <div class="contentTitle"></div>
                                <div id="editImgContent">
                                    <div id="divLeft">
                                        <div id="bannerImgWrap">
                                            <img :src="wallpaper_preview" id="wallpaperImg">
                                        </div>
                                        <div id="profileWrap">
                                            <div id="profileImgWrap">
                                                <img :src="icon_preview" id="profileImg"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="divRight">
                                        <div id="editBanner">
                                            <div class="contentSubTitle"><h5>배경 수정</h5></div>
                                            <input id="inputBanner" type="file" @change="add_image($event, 2)"/>
                                        </div>
                                        <div id="editProfileImg">
                                            <div class="contentSubTitle"><h5>프로필 수정</h5></div>
                                            <input id="inputProfile" type="file" @change="add_image($event, 1)"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </v-tab>
                    <v-tab title="실록 이름" class="channelMenuList">
                        <div class="contentTitle">실록 이름 변경</div>
                        <input id="channelNameInput" v-model="channel_name" style="cursor: text">
                    </v-tab>
                    <v-tab title="실록 설명" class="channelMenuList">
                        <div class="contentTitle">실록 설명 변경</div>
                        <input id="channelDescriptionInput" v-model="channel_description" style="cursor: text">
                    </v-tab>
                    <v-tab title="실록 규칙" class="channelMenuList">
                        <div class="contentTitle" id="ruleTitle"><h4>실록 규칙</h4></div>
                            <div v-for="(rule, id) in rules">
                                <input class="inputRule" type="text" v-model="rules[id].content"  placeholder="규칙을 입력해주세요." style="cursor: text">
                                <div id="deleteBtnWrap">
                                    <div id="deleteBtn1"><a id="btnInner" @click="removeElement(id)" style="cursor: pointer">삭제</a></div>
                                </div>
                            </div>
                        <div id="addBtn" v-if="this.rules.length!==5"><a @click="addRow()" style="cursor: pointer" >추가</a></div>
                    </v-tab>
                </vue-tabs>
            </div>
            <div id="subscriberManaging">
                <div class="tabTitle"><h4>구독자 관리</h4></div>
                <vue-tabs id="subscriberTabWrap"
                    direction="vertical"
                    active-tab-color="darkGray"
                    active-text-color="white"
                    type="pills">
                    <v-tab title="구독자 목록" class="subscriberMenuList">
                        <div v-if="channel_subscribers.length === 0">
                            <div class="noData">구독자가 없어용 ㅎㅎ 너무 아쉽네 ;-;</div>
                        </div>
                        <div v-else v-for="subscriber in channel_subscribers" id="subscriberWrap">
                            <div id="subscriberListWrap">
                                <div id="subscriberList">{{subscriber.username}}</div>
                                <button id="blockBtn" @click="add_to_blacklist(subscriber); delete_from_array(channel_subscribers, subscriber.id);" style="cursor: pointer">
                                    차단
                                </button>
                            </div>
                        </div>
                    </v-tab>
                    <v-tab title="차단 목록" class="subscriberMenuList">
                        <div v-if="channel_blacklist.length === 0">
                            <div class="noData">차단된 사용자가 없어용 ㅎㅎ</div>
                        </div>
                        <div v-else v-for="blacked_user in channel_blacklist" id="blockWrap">
                            <div id="blockListWrap">
                                <div id="blockList">{{blacked_user.username}}</div>
                                <button id="unblockBtn" @click="delete_from_array(channel_blacklist, blacked_user.id)" style="cursor: pointer">
                                    차단 해제
                                </button>
                            </div>
                        </div>
                    </v-tab>
                    <v-tab title="관리자 목록" class="subscriberMenuList">
                        <div v-for="moderator in channel_moderators" id="managerWrap">
                            <div id="managerListWrap">
                                <div id="managerList">{{moderator.username}}</div>
                                <button id="deleteBtn" @click="delete_from_array(channel_moderators, moderator.id)" style="cursor: pointer">
                                    관리자 삭제
                                </button>
                            </div>
                        </div>
                    </v-tab>
                </vue-tabs>
            </div>
            <div id="BtnWrap">
                <button id="submitBtn" style="cursor:pointer" @click="edit()"> 적용 </button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "DashBoard",
        data(){
            return{
                channel_name: "",
                channel_description: "",
                channel_id: this.$route.params.channelID,
                channel_subscribers: [],
                channel_blacklist: [],
                channel_moderators: [],
                icon : new FormData(),
                wallpaper : new FormData(),
                icon_pk: -1,
                wallpaper_pk: -1,
                icon_edited: false,
                wallpaper_edited: false,
                icon_preview: "",
                wallpaper_preview: "",
                rules: []
            }
        },
        mounted(){
            axios.get('channel/'+this.$route.params.channelID+'/')
                .then((response)=>{
                    console.log(response);
                    //this.rules = response.data.rules;
                    this.channel_name = response.data.name;
                    this.channel_description = response.data.description;
                    this.channel_subscribers = response.data.subscribers.slice();
                    this.channel_blacklist = response.data.blacklist.slice();
                    this.channel_moderators = response.data.moderators.slice();

                    for(let i=0;i<response.data.rules.length;i++){
                        this.rules.push({
                            content: response.data.rules[i]
                        })
                    }

                });
        },
        methods: {
            update_channel(){
                let channel_data = {
                    name: this.channel_name,
                    description: this.channel_description,
                    subscribers: [],
                    moderators: [],
                    blacklist: [],
                    rules: this.rules,
                };
                if (this.icon_edited === true) channel_data.icon = this.icon_pk;
                if (this.wallpaper_edited === true) channel_data.wallpaper = this.wallpaper_pk;

                this.convert_array(channel_data.subscribers, this.channel_subscribers);
                this.convert_array(channel_data.moderators, this.channel_moderators);
                this.convert_array(channel_data.blacklist, this.channel_blacklist);
                axios.patch('channel/'+this.$route.params.channelID+'/', channel_data);
                location.reload();
                this.$router.replace('/'+this.$route.params.channelID);
            },
            removeElement(index){
                if(this.rules.length>1){
                    this.rules.splice(index, 1);
                }
                else{
                    alert('규칙을 하나 이상 입력해주세요!');
                }
            },
            addRow: function() {
                if(this.rules.length<5){
                    this.rules.push({
                        content: ""
                    });
                }
                else {
                    alert('규칙은 최대 5개까지 입력 가능합니다.');
                }
            },
            delete_from_array(array, id){
                if (array === this.channel_moderators && array.length === 1) alert('관리자가 최소 1명은 있어야 합니다.');
                else {
                    let delete_index, i;
                    for (i=0; i<array.length; i++){
                        if(array[i].id === id){
                            delete_index = i;
                            break;
                        }
                    }
                    array.splice(delete_index, 1);
                }
            },
            convert_array(to_array, from_array){
                for (let i=0; i<from_array.length; i++){
                    to_array.push(from_array[i].id);
                }
            },
            add_to_blacklist(subscriber){
                this.channel_blacklist.push(subscriber);
            },
            add_image(event, id){
                if (id === 1){
                    this.icon.append('image', event.target.files[0]);
                    this.icon_preview = URL.createObjectURL(event.target.files[0]);
                    this.icon_edited = true;
                }
                else{
                    this.wallpaper.append('image', event.target.files[0]);
                    this.wallpaper_preview = URL.createObjectURL(event.target.files[0]);
                    this.wallpaper_edited = true;
                }
            },
            async submit_image(image, id){
                await axios.post('addon/image/', image, {
                    headers:{
                        'Content-Type': 'multipart/formdata; charset=utf-8;boudnary=${image_boundary}',
                        'Authorization': 'JWT '+ localStorage.getItem('token')
                    }
                }).then((response)=>{
                    if (id === 1){
                        this.icon_pk = response.data.id;
                    }
                    else{
                        this.wallpaper_pk = response.data.id;
                    }
                })
            },
            async edit() {
                if (this.icon_edited === true) await this.submit_image(this.icon, 1);
                if (this.wallpaper_edited === true) await this.submit_image(this.wallpaper, 2);
                this.update_channel();
            }
        },
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

    button {
        width: auto; height: auto;
        text-align: center;
        padding: 4px;
        font-size: 11px;
        font-weight: bold;
        background-color: #8c151f;
        color: white;
        border: none;
        border-radius: 5px;
        display: inline-block;
        float: right;
    }

    button:focus {
        outline: none;
    }


    #DashBoard {
        width: 100%; height: 92vh;
        overflow-y: scroll;
    }

    #DashBoardWrap {
        width: 97%; height: auto;
        margin: 0 auto;
        margin-top: 2%;
        padding: 3% 3%;
        border-radius: 10px;
        background-color: white;
    }

    #channelManaging {
        height: calc(250px + 4vh);
        margin-top: 1.5vh;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        overflow: hidden;
    }

    .tabTitle {
        width: 100%; height: 4vh;
        color: white;
        padding: 1vh 1.1vw;
        border-radius: 5px 5px 0 0;
        background-color: #8c151f;
    }

    #channelTabWrap {
        width: 100%; height: 250px;
        font-size: 1.4vh;
        font-weight: bold;
    }

    .channelMenuList {
        width: calc(43.7664vw - 156px); height: 100%;
        padding: 1vh 1vw;
        font-weight: normal;
        border-left: 1px solid #c4c4c4;
    }

    .contentTitle {
        margin-bottom: 1.5%;
        font-size: 1.4vh;
        font-weight: bolder;
    }

    #divLeft {
        width:14vw; height: 14vw;
        border: solid; border-width: 1px; border-color: rgba(229, 229, 229, 1);
        border-radius: 7px;
        overflow: hidden;
        float: left;
    }

    #bannerImgWrap {
        width: 100%; height: 7vw;
        position: relative;
        overflow: hidden;
        background-color: rgba(229, 229, 229, 1);
        vertical-align: center;
    }

    #profileWrap {
        width: 100%; height: 7vw;
        position: relative;
        top: -3.5vw;
    }

    #profileImgWrap {
        width: 7vw; height: 7vw;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
    }

    #profileImg {
        width: 100%; height: 100%;
    }

    #wallpaperImg{
        width: 100%; height: 100%;
    }

    #divRight {
        width: calc(100% - 14vw - 2px); height: auto;
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
        width: 100%;
        color: #5b5b5b;
        display: inline-block;
    }

    #inputProfile {
        width: 100%;
        color: #5b5b5b;
        display: inline-block;
    }

    #channelNameInput {
        width: 100%;
    }

    #channelDescriptionInput {
        width: 100%;
    }

    .inputRule {
        width: calc(100% - 53px);
        margin-bottom: 5px;
    }

    #deleteBtnWrap {
        width: 50px;
        display: inline-block;
        float: right;
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

    #subscriberManaging {
        height: calc(300px + 4vh);
        margin-top: 1.5vh;
        border: 1px solid #c4c4c4;
        border-radius: 5px;
        overflow: hidden;
    }

    #subscriberTabWrap {
        width: 100%; height: 300px;
        font-size: 1.4vh;
        font-weight: bold;
    }

    .subscriberMenuList {
        width: calc(43.7664vw - 111px); height: 300px;
        padding: 1vh 1vw;
        font-weight: normal;
        border-left: 1px solid #c4c4c4;
        overflow-y: scroll;
    }

    #subscriberWrap {
        width: 100%; height: auto;
    }

    .noData {
        color: #424242;
    }

    #subscriberListWrap {
        width: 100%;
    }

    #subscriberList {
        width: calc(100% - 50px - 1%);
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 600;
    }

    #blockBtn {
        width: 50px;
        margin-left: 1%;
    }

    #blockWrap {
        width: 100%; height: auto;
    }

    #blockListWrap {
        width: 100%;
    }

    #blockList {
        width: calc(100% - 70px - 1%);
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 600;
    }

    #unblockBtn {
        width: 70px;
        margin-left: 1%;
    }

    #managerWrap {
        width: 100%; height: auto;
    }

    #managerListWrap {
        width: 100%;
    }

    #managerList {
        width: calc(100% - 80px - 1%);
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 600;
    }

    #deleteBtn {
        width: 80px;
        margin-left: 1%;
    }
    #deleteBtn1 {
        width: 50px; height: auto;
        text-align: center;
        padding: 2px;
        font-size: 11px;
        font-weight: bold;
        background-color: white;
        border-radius: 5px;
        display: inline-block;
    }

    #BtnWrap {
        height: 50px;
    }

    #submitBtn {
        width: 50px;
        margin-top: 3vh;
    }

    @media all and (max-width:720px){
        .channelMenuList {
            width: calc(91.18vw - 155px);
        }

        .subscriberMenuList {
            width: calc(91.18vw - 110px);
        }
    }

</style>
