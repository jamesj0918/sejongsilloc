<template>
    <div id="ReplyWrap">
        <div id="showButton" >
            <a class="replyButton" style="cursor:pointer" @click="showReply()" v-if="hide===false">답글 보기</a>
            <a class="replyButton" style="cursor:pointer" @click="showReply()" v-else>답글 숨기기</a>
        </div>
        <div id="reply" v-if="hide===true">
                <ul>
                    <li  v-for="(reply,id) in reply_list">
                        <div id="replyList">
                            <div id="userImgWrap">
                                <img id="userImg" src="https://placehold.it/40x40">
                            </div>
                            <div id="replyContentWrap">

                                <div id="userData">
                                    <div id="userName">
                                        {{reply.author.username}}
                                    </div>
                                    <div id="replyDate">
                                        {{reply_submission_date[id]}} {{reply_submission_time[id]}}
                                    </div>
                                </div>
                                <div id="replyContent">
                                    <comment-content v-on:delete-reply = "deleteComment(reply.id)" :writer_pk = reply.author.id :content_data = reply :comment_id = reply.id></comment-content>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            <div id="replyField">
                <textarea-autosize id="replyInput" v-model="reply_input"  placeholder="답글을 입력하세요."></textarea-autosize>
                <button id="replySubmit" type="button" @click="replyComment()" style="cursor:pointer">
                    <i class="paper plane outline icon"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import CommentContent from './CommentContent'

    export default {
        name: "Reply",
        props: ['parent','comment_index','hideReply'],
        components:{
            'comment-content': CommentContent,
        },
        data(){
            return{
                hide: false,
                postID: this.$route.params.postID,
                reply_input:'',
                reply_list: [],
                writer: [],
                reply_submission_date: [],
                reply_submission_time: [],
                reply_page: 1,
                comments: [],
                user_pk: localStorage.getItem("user_pk"),
            }
        },
        mounted(){
            this.getComment();
        },
        methods:{
            getComment(){
                this.reply_list=[];
                axios.get('comment/?post='+this.postID+'&parent='+this.parent+'&page='+this.reply_page)
                    .then((response)=>{
                        this.reply_list = response.data.results;
                        for(var i=0; i<response.data.results.length; i++){
                            this.reply_submission_date.push(response.data.results[i].created_at.split('T')[0].replace(/-/g, "."));
                            this.reply_submission_time.push(response.data.results[i].created_at.split('T')[1].split('.')[0]);
                        }
                    })
            },
            deleteComment(id){
                axios.delete('comment/'+id+'/')
                    .then(()=>{
                        this.getComment();
                        this.$emit('down-length');
                    })
            },
            replyComment(){
                const comment_data={
                    post: this.postID,
                    content : this.reply_input,
                    parent : this.parent,

                };
                axios.post('comment/', comment_data)
                    .then((response)=>{
                        this.reply_list.push(response.data);
                        this.reply_submission_date.push(response.data.created_at.slice(0,10));
                        this.reply_submission_time.push(response.data.created_at.slice(11,16));
                    });
                this.reply_input='';
                this.$emit('up-length');
            },
            showReply(){
                this.hide=!this.hide;
            }
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
        color: #8c151f;
    }

    a:hover {
        text-decoration: none;
        color: #8c151f;
    }

    textarea {
        height: 25px !important;
        resize: none;
        padding: 5px 5px;
        background-color: rgba(242,242,242,0.6);
        border-color: rgba(169,169,169,0.3);
        border-radius: 7px;
        font-size: 12px;
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

    ul {
        list-style: none;
    }

    button:focus {
        outline: none;
    }

    #showButton {
        height: 15px;
        font-size: 11px;
        font-weight: bold;
        color: #8c151f;
    }

    #reply {
        width: 100%;

    }

    #replyList {
        width: 100%;
        margin-top: 1%;
    }

    #userImgWrap {
        width: 35px; height: 35px;
        margin-top: 10px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
    }

    #userImg {
        width: 35px;
        vertical-align: middle;
    }

    #replyContentWrap {
        width: calc(98.5% - 35px);
        margin-left: 1.5%;
        display: inline-block;
    }

    #userData {
        height: 19px;
    }

    #userName {
        width: auto; max-width: calc(100% - 93px);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 13px;
        color: #8c151f;
        font-weight: bold;
        display: inline-block;
        vertical-align: middle;
    }

    #replyContent {
        margin-top: 0.5%;
    }

    #replyDate {
        width: auto; height: 15px;
        margin-left: 10px;
        font-size: 11px;
        font-weight: bold;
        display: inline-block;
        vertical-align: middle;
        color: #4f4f4f;
    }

    #replyField {
        width: 100%;
        margin-top: 1.5%;
        display: inline-block;
    }

    #replyInput {
        width: calc(100% - 28px);
        min-height: 10px !important;
        display: inline-block;
        vertical-align: middle;
    }

    #replySubmit {
        width: 28px; height: 25px;
        background-color: white;
        border: none;
        font-weight: bold;
        font-size: 15px;
        text-align: right;
        color: #8c151f;
        vertical-align: middle;
    }

</style>
