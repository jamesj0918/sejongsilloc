<template>
    <div id="EditPostWrap">
        <div id="writingPostHeader">
            <h3>실록 기록하기</h3>
            <span id="channelName">#{{channelName}}</span>
        </div>
        <div id="inputWrapper">
            <div id="titleWrapper">
                <input id="inputTitle" placeholder="제목을 입력해주세요" type="text" v-model="Post.title"/>
            </div>
            <div id="contentWrapper">
                <textarea id="inputContent" placeholder="무슨 생각을 하고 있나요?"  v-model="Post.content"></textarea>
                <div id="articleInputMenu">
                    <span id="addVote"><i class="archive icon"></i></span>
                    <span id="addVideo"><i class="video icon"></i></span>
                    <span id="addPhoto"><i class="camera icon"></i></span>
                    <span id="toPinned">
                        <a style="cursor:pointer" v-on:click="Post.is_pinned=!Post.is_pinned">
                            <i class="thumbtack icon" :class="{'Pinned' : Post.is_pinned}"></i>
                            <span id="toPin" v-show="!Post.is_pinned">공지 띄우기</span>
                            <span id="toUnpin" v-show="Post.is_pinned">공지 취소</span>
                        </a>
                    </span>
                </div>
            </div>
            <button id="submitButton" type="button" @click="submit()">기록하기</button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "EditPost",
        data(){
            return{
                Post: {
                    title: "",
                    content: "",
                    is_pinned: false,
                },
                channelID: this.$route.params.channelID,
                postID: this.$route.params.postID,
                channelName: ""
            }
        },
        methods: {
            submit(){
                const Post_data={
                    title: this.Post.title,
                    content: this.Post.content,
                    id: this.$route.params.postID,
                    pinned: this.Post.is_pinned,
                };
                if (this.Post.title === "") {
                    alert('제목을 입력하세요!');
                }
                else if (this.Post.content === ""){
                    alert('내용을 입력하세요!');
                }
                else{
                    axios.patch('post/'+this.postID+'/', Post_data)
                        .then(() => {
                            this.$router.push('/' + this.channelID);
                        })
                }
            }
        },
        mounted() {
            axios.get('post/'+this.postID+'/')
                .then((response) => {
                    this.Post.title = response.data.title;
                    this.Post.content = response.data.content;
                    this.Post.is_pinned = response.data.pinned;
                    this.channelName = response.data.channel_name;
                })
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        font-family: "Noto Sans KR";
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

    #EditPostWrap {
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

    #inputContent{
        width: 100%; height: calc(100% - 30px);
        font-size: 14px;
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

    .Pinned {
        color: #9e9e9e;
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