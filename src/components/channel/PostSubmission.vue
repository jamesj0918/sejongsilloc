<template>
        <div id="PostSubmissionWrap">
            <div id="writingPostHeader">
                <h3>실록 기록하기</h3>
                <span id="channelName">#{{channelName}}</span>
            </div>
            <div id="inputWrapper">
                <form @submit.prevent="submit()" method = "post">
                    <div id="titleWrapper">
                        <input id="inputTitle" placeholder="제목을 입력해주세요." type="text" v-model="Post.title"/>
                    </div>
                    <div id="contentWrapper">
                        <div id="inputContentWrap">
                            <textarea-autosize id="inputContent" placeholder="무슨 생각을 하고 있나요?" v-model="Post.content"></textarea-autosize>
                            <vote-create v-show="vote===true" :bus="bus" :post_pk="post_pk"></vote-create>
                            <upload-image v-show="image===true" :bus="bus" :post_pk="post_pk"></upload-image>

                        </div>
                        <div id="articleInputMenu">
                            <span id="addVote" @click="vote = !vote"><i class="archive icon" style="cursor:pointer"></i></span>
                            <span id="addVideo"><i class="video icon"></i></span>
                            <span id="addPhoto" @click="image=!image"><i class="camera icon"></i></span>
                            <span v-if="is_moderator === true" id="toPinned">
                                <a style="cursor:pointer" v-on:click="Post.is_pinned=!Post.is_pinned">
                                    <i class="thumbtack icon" :class="{'Pinned' : Post.is_pinned}"></i>
                                    <span id="toPin" v-show="!Post.is_pinned">공지 띄우기</span>
                                    <span id="toUnpin" v-show="Post.is_pinned">공지 취소</span>
                                </a>
                            </span>
                        </div>
                    </div>
                    <button id="submitButton" type="submit" style="cursor:pointer">기록하기</button>
                </form>
            </div>
        </div>
</template>

<script>
    import axios from 'axios'
    import Vue from 'vue'
    import VoteCreate from './VoteCreate'
    import UploadImage from './UploadImage'
    export default {
        name: "WritingPost",
        data(){
            return{
                Post: {
                    title: "",
                    content: "",
                    is_pinned: false,
                },
                user_pk: localStorage.getItem("user_pk"),
                channel_pk: '',
                channel_id: this.$route.params.channelID,
                channelName: "",
                vote: false,
                bus: new Vue(),
                post_pk: null,
                is_moderator: false,
                image: false,
            }
        },
        components:{
            'vote-create': VoteCreate,
            'upload-image': UploadImage,
        },
        methods: {
            submit(){
                const post_data={
                    title: this.Post.title,
                    content: this.Post.content,
                    pinned: this.Post.is_pinned,
                    channel: this.channel_pk,
                };
                if (this.Post.title === "") {
                    alert('제목을 입력하세요!');
                }
                else if (this.Post.content === ""){
                    alert('내용을 입력하세요!');
                }
                else {
                    axios.post('/post/', post_data)
                        .then((response) => {
                            this.$router.push('/' + this.channel_id);

                            this.post_pk = response.data.id;
                            if (this.vote === true){
                                this.$bus.$emit('createVote',response.data.id);
                            }
                            if (this.image === true){
                                this.bus.$emit('createImage', response.data.id);
                            }
                        })
                }
            },
        },
        mounted() {
            axios.get('channel/'+this.channel_id+'/')
                .then((response) => {
                    this.channelName=response.data.name;
                    this.channel_pk = response.data.id;
                    for(let i=0;i<response.data.moderators.length;i++){
                        if(response.data.moderators[i].id == this.user_pk){
                            this.is_moderator = true;
                            break;
                        }
                    }
                })
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        text-decoration: none;
        color: black;
    }

    input {
        outline: 0;
    }

    input:focus {
        outline: none;
    }

    input:focus::placeholder {
        color: rgba(169, 169, 169, 0.6);
    }

    input::placeholder {
       color: rgba(169, 169, 169, 1);
    }

    textarea {
        resize: none;
        background-color: rgba(242, 242, 242, 0);
        border: none;
    }

    textarea:focus {
        outline: none;
    }

    textarea:focus::placeholder {
        color: rgba(169, 169, 169, 0.6);
    }

    textarea::placeholder {
        color: rgba(169, 169, 169, 1);
    }

    button:focus {
        outline: none;
    }

    h3 {
        float: left
    }

    #PostSubmissionWrap {
        height: 96%;
        width: 97%;
        margin: 0 auto;
        padding: 3% 3%;
        margin-top: 2%; margin-bottom: 2%;
        background-color: white;
        border-radius: 10px;

    }

    #channelName {
        float: right;
        max-width: calc(100% - 110px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #8c151f;
        font-size: 15px;
        font-weight: bold;
    }

    #inputWrapper {
        width: 100%; height: calc(100% - 20px);
    }

    form {
        width: 100%; height: 100%;
    }

    #titleWrapper {
        width: 100%;
    }

    #inputTitle {
        width: 100%;
        padding: 5px 10px;
        margin-top: 10px;
        margin-bottom: 6px;
        border-radius: 10px;
        font-size: 15px;
        background-color: rgba(242,242,242,0.6);
        border-color: rgba(169,169,169,0.3);
        border-width: 2px;
    }

    #contentWrapper{
        width: 100%; height:calc(100% - 56px - 30px);
        padding: 10px;
        background-color: rgba(242,242,242,0.6);
        border: solid;
        border-color: rgba(169,169,169,0.3);
        border-radius: 10px;
        border-width: 2px;
    }

    #inputContentWrap{
        width: 100%; height: calc(100% - 30px);
        font-size: 14px;
        overflow-y: scroll;
    }

    #inputContent {
        width: 100%;
    }

    #articleInputMenu{
        width: 100%; height: 30px;
        padding-top: 5px;
    }


    #toPinned{
        font-size: 15px;
        float: right;
        margin-right:3px;
    }

    #addPhoto{
        font-size: 15px;
        float: right;
        margin: 0 10px;
    }

    #addVideo{
        font-size: 15px;
        float: right;
    }

    #addVote{
        font-size: 15px;
        float: right;
        margin:0 10px;
        margin-right: 5px;
    }

    #submitButton {
        background-color: white;
        border: none;
        color: #8c151f;
        float:right;
        margin-top: 10px;
        margin-right: 10px;
        font-weight: bold;
    }


    #toUnpin {
        margin-right: 14px;
        color: #9e9e9e;
    }



    @font-face{
        font-family: 'Noto Sans KR', sans-serif;
        font-display: fallback;
    }
</style>
