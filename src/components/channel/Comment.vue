<template>
    <div id="CommentWrapper">
        <div id="commentsCount">
            <a>
                댓글 {{comments_length}}개
                <i class="angle down icon" v-if="hide===true" @click="hide=false" style="cursor:pointer"></i>
                <i class="angle up icon" v-else @click="hide=true" style="cursor:pointer"></i>
            </a>
        </div>
        <div id="comment_wrap" v-if="!hide">
            <div id="commentField">
                <textarea-autosize id="commentInput" placeholder="댓글을 입력하세요." v-model="reply"></textarea-autosize>
                <button id="commentSubmit" type="submit" @click="commentSubmit()" style="cursor:pointer">
                    <i class="paper plane outline icon"></i>
                </button>
            </div>


                <ul>
                    <li v-for="(single_comment, key) in comments" v-if="single_comment.parent===null">
                        {{single_comment[key]}}
                        <div id="commentList">
                            <div id="userImgWrap">
                                <img id="userImg" src="https://placehold.it/40x40">
                            </div>
                            <div id="commentContentWrap">
                                <div id="userData">
                                    <div id="userName">
                                        {{single_comment.author.username}}
                                    </div>
                                    <div id="commentDate">
                                        {{submission_date[key]}} {{submission_time[key]}}
                                    </div>
                                </div>
                                <div id="commentContent">
                                    <comment-content
                                            v-on:delete-comment="deleteComment(single_comment.id)"
                                            :writer_pk = author_id[key]
                                            :content_data = single_comment
                                            :comment_id = single_comment.id
                                    ></comment-content>
                                </div>
                                <div>
                                    <reply-list
                                            v-on:up-length="upLength"
                                            v-on:down-length="downLength"
                                            :parent = single_comment.id
                                            :comment_index=key
                                    ></reply-list>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
    import axios from 'axios'
    import Reply from './Reply'
    import CommentContent from './CommentContent'

    export default {
        name: "Comment",
        components:{
            'reply-list': Reply,
            'comment-content': CommentContent,
        },
        data(){
            return{
                postID: this.$route.params.postID,
                comment_list: [],
                comments: [],
                author_id: [],
                post_comment: [],
                comments_length: 0,
                reply:'',
                edit: [],
                user_pk : localStorage.getItem("user_pk"),
                hide: true,
                submission_date: [],
                submission_time: [],
                comments_page: 1,
            }
        },
        created(){


        },
        mounted(){
            this.getComment();
            this.hide=false;
        },
        methods:{
            getComment(){
                this.comments=[];
                axios.get('comment/?post='+this.postID+'&page='+this.comments_page)
                    .then((response)=>{
                        console.log(response);
                        this.comments_length=response.data.results.length;
                        for(var i=0;i<response.data.results.length;i++){
                            if(response.data.results[i].parent == null){
                                this.comments.push(response.data.results[i]);
                                this.author_id.push(response.data.results[i].author.id);
                                this.submission_date.push(response.data.results[i].created_at.slice(0,10));
                                this.submission_time.push(response.data.results[i].created_at.slice(11,16));
                            }
                        }
                    })

            },

            deleteComment(id){
                axios.delete('comment/'+id+'/')
                    .then(()=>{
                        this.getComment();
                    })
            },

            commentSubmit(){
                const comment_data={
                    content : this.reply,
                    post: this.postID,
                };
                axios.post('comment/', comment_data)
                    .then((response)=>{
                        this.reply='';
                        this.comments_length++;
                        this.comments.push(response.data);
                        this.author_id.push(response.data.author.id);
                        this.submission_date.push(response.data.created_at.slice(0,10));
                        this.submission_time.push(response.data.created_at.slice(11,16));
                    })
            },
            upLength(){
                this.comments_length++;
            },
            downLength(){
                this.comments_length--;
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
        color: black;
    }

    a:hover {
        text-decoration: none;
        color: black;
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

    #commentsCount {
        font-size: 13px;
    }

    #commentField {
        width: 100%;
        margin-top: 1%;
        display: inline-block;
    }

    #commentInput {
        width: calc(100% - 28px);
        min-height: 10px !important;
        display: inline-block;
        vertical-align: middle;
    }

    #commentSubmit {
        width: 28px; height: 25px;
        background-color: white;
        border: none;
        font-weight: bold;
        font-size: 15px;
        text-align: right;
        color: #8c151f;
        vertical-align: middle;
    }

    #commentList {
        width: 100%;
        margin-top: 2%;
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

    #commentContentWrap {
        width: calc(98.5% - 35px);
        margin-left: 1.5%;
        display: inline-block;
    }

    #userData{
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

    #commentContent {
        margin-top: 0.5%;
    }

    #commentDate {
        width: 93px; height: 15px;
        margin-left: 10px;
        font-size: 11px;
        font-weight: bold;
        display: inline-block;
        vertical-align: middle;
        color: #4f4f4f;
    }
</style>
