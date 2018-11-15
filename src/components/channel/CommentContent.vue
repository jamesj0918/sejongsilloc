<template>
    <div id="CommentContentWrap">
        <div id="commentContent" v-if="edit !== true">
            {{comment.content}}
        </div>
        <div v-if="edit === true">
            <textarea id="editComment" v-model="comment.content"></textarea>
            <button id="finishBtn" @click="patchComment(comment.id)">완료</button>
        </div>
        <div id="articleMenu">
            <div id="menuIconWrapper" v-on:click.prevent="showDropDown=!showDropDown">
                <a class="menuLinkToggle" style="cursor:pointer">
                    <i id="menuDropdownIcon" class="ellipsis horizontal icon"></i>
                </a>
            </div>
            <ul v-if="showDropDown">
                <div class="dropdownMenu">
                    <li class="dropdownMenuItem" v-if= "writer_pk != user_pk">
                        <a style="cursor:pointer">
                            <div class="dropdownMenuLink"><i class="exclamation icon"></i><span>댓글 신고</span></div>
                        </a>
                    </li>
                    <li class="dropdownMenuItem"  v-if= "writer_pk == user_pk">
                        <a style="cursor:pointer">
                            <div class="dropdownMenuLink" @click="commentEdit()"><i class="edit icon"></i><span>수정</span></div>
                        </a>
                    </li>
                    <li class="dropdownMenuItem" v-if= "writer_pk == user_pk">
                        <a style="cursor:pointer" v-on:click="sendDeleteEvent" >
                            <div class="dropdownMenuLink">
                                <i class="trash alternate icon"></i><span>삭제</span>
                            </div>
                        </a>
                    </li>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "CommentContent",
        props: ['writer_pk', 'content_data','comment_id'],
        data() {
          return {
              comment: [],
              edit: false,
              user_pk: localStorage.getItem("user_pk"),
              showDropDown: false,
          }
        },
        mounted(){
            this.comment = this.content_data;
        },
        beforeRouteUpdate(){
            this.comment = this.content_data;
        },
        methods:{
            commentEdit(){
                this.edit = true;
                this.showDropDown = false;
            },
            patchComment(comment_pk){
                const edit_comment_data={
                    content: this.comment.content,
                };
                axios.patch('comment/'+comment_pk+'/',edit_comment_data)
                    .then(()=>{
                        this.edit = false;
                    })
            },
            sendDeleteEvent(){
                if(this.comment.parent==null){
                    this.$emit('delete-comment');
                }
                else{
                    this.$emit('delete-reply');
                }
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

    #commentContent {
        width: auto; max-width: calc(100% - 28px);
        padding: 3px 5px;
        font-size: 13px;
        background-color: rgba(242,242,242,0.6);
        border: solid;
        border-color: rgba(169,169,169,0.3);
        border-width: 1px;
        border-radius: 7px;
        vertical-align: middle;
        word-wrap: break-word;
        display: inline-block;
    }

    #articleMenu {
        width: 28px; height: 19px;
        text-align: right;
        display: inline-block;
        vertical-align: middle;
        overflow: visible;
    }

    #menuDropdownIcon{
        color: #666666;
    }

    .dropdownMenu {
        display: inline-block;
        width: 110px;
        float: right;
        background-color: white;
        padding: 3px 10px;
        box-shadow: -2px -1px 10px 2px #c9c9c9;
        position: relative;
        z-index: 10;
        border-radius: 3px;
    }

    .dropdownMenuLink {
        margin: 0;
        width: 100%; height: 28px;
        padding-top: 3px;
        color: black;
        background-color: white;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
    }

    #editComment {
        width: calc(100% - 55px);
        min-height: 10px !important;
        display: inline-block;
        vertical-align: middle;
    }

    #finishBtn {
        width: 50px; height: 25px;
        background-color: #8c151f;
        border: none; border-radius: 5px;
        margin-left: 5px;
        font-size: 13px;
        text-align: center;
        color: white;
        vertical-align: middle;
    }

</style>