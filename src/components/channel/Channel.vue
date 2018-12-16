<template>
    <div id="ChannelWrap">
        <div id="top">
            <div id="postBtnWrapper">
                <button id="postBtn" @click="post()" style="cursor:pointer"><i class="pencil alternate icon"></i>글쓰기</button>
            </div>
            <div class="sortClass">
                <sui-dropdown
                        class="ui inline small dropdown"
                        :options="sort"
                        placeholder="State"
                        v-model="current"
                        id="sort"
                ></sui-dropdown>
            </div>
        </div>
            <div id="postList" v-if="!empty">
                <ul>
                    <li v-for = "Post in pinned_post" class="post">
                        <div class="postWrap">
                            <div class="postHeader">
                                <span class="name">
                                    {{Post.author.username}}
                                </span>
                                <span class="tag">
                                    #{{Post.channel.name}}
                                </span>
                            </div>
                            <div class="postBody">
                                <span class="title" v-on:click="postView(Post.id)"  style="cursor:pointer">
                                    <h4>{{Post.title}}</h4>
                                </span>
                            </div>
                            <div class="postMenu">
                                <i class="comment icon" ></i>
                                {{Post.comments}} &emsp;
                                <i class="heart outline icon"  v-if="!Post.heart"></i>
                                <i class="heart red icon"  v-else></i>
                                {{Post.likes_count-Post.dislikes_count}}
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="ui horizontal divider" v-if="pinned_post.length !== 0">
                    공지
                </div>
                <ul>
                    <li v-for = "Post in posts" class="post">
                        <div class="postWrap">
                            <div class="postHeader">
                                <span class="name">
                                    {{Post.author.username}}
                                </span>
                                <span class="tag">
                                    #{{Post.channel.name}}
                                </span>
                            </div>
                            <div class="postBody">
                                <span class="title" v-on:click="postView(Post.id)"  style="cursor:pointer">
                                    <h4>{{Post.title}}</h4>
                                </span>
                            </div>
                            <div class="postMenu">
                                <i class="comment icon" ></i>
                                {{Post.comments}} &emsp;
                                <i class="heart outline icon"  v-if="!Post.heart"></i>
                                <i class="heart red icon"  v-else></i>
                                {{Post.likes_count-Post.dislikes_count}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        <div id="noArticle" v-else>
            <h3>{{answer}}</h3>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Channel",
        data(){
            return{
                sort: [
                    {key: 'fav', value: 'fav', text:'화제'},
                    {key: 'new', value: 'new', text:'최신'},
                ],
                answer: '불러오는 중...',
                current: 'new',
                posts: [],
                pinned_post: [],
                empty: true,
                channel_id: this.$route.params.channelID,
                page: 1,
            }
        },
        methods:{
            post(){
                this.$router.push(this.channel_id+'/post');
            },
            postView(object){
                this.$router.push(this.channel_id+"/"+object);
            },
            get_data(){

                if(this.current === 'fav'){
                    axios.get('post/?slug='+this.channel_id+'&page='+this.page+'&ordering=-score')
                        .then((response)=> {
                            console.log(response);
                            if(response.data.results.length == 0 && this.page==1) {
                                this.answer = '빈 실록입니다.';
                                return;
                            }
                            this.empty = false;


                            for(let i = 0; i<response.data.results.length; i++){
                                if(response.data.results[i].pinned == true){
                                    this.pinned_post.push(response.data.results[i])
                                }
                                else{
                                    this.posts.push(response.data.results[i])
                                }
                            }
                            this.page++;

                        })
                }
                if(this.current === 'new'){
                    axios.get('post/?ordering=-created_at&slug='+this.channel_id+'&page='+this.page)
                        .then((response)=> {
                            if(response.data.results.length == 0 && this.page==1) {
                                this.answer = '빈 실록입니다.';
                                return;
                            }
                            this.empty = false;

                            for(let i = 0; i<response.data.results.length; i++){
                                if(response.data.results[i].pinned == true){
                                    this.pinned_post.push(response.data.results[i])
                                }
                                else{
                                    this.posts.push(response.data.results[i])
                                }
                            }
                            this.page++;

                        })
                }

            }
        },
        watch:{
            current: function(){
                this.empty = true;
                this.posts=[];
                this.page=1;
                this.get_data();
            }
        },
        mounted(){

            const listElm1 = document.querySelector('#ChannelWrap');
            listElm1.addEventListener( 'scroll',e =>{
                if(listElm1.scrollTop + listElm1.clientHeight >= listElm1.scrollHeight) {
                    this.get_data();
                }
            });

            this.get_data();
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        font-family: "Noto Sans KR";
    }

    ul {
        list-style: none;
    }

    button:focus {
        outline: none;
    }

    #ChannelWrap {
        width: 100%; height: 92vh;
        overflow-y: hidden;
    }

    #top {
        width: 97%;
        margin: 0 auto;
        margin-top: 2%;
        height: 28px;
    }

    #postBtnWrapper {
        height: 28px; width: 70px;
        display: inline-block;
        margin-right: calc(100% - 115px);
        float: left;
    }

    #postBtn {
        height: 25px;
        font-size: 12px; width: 67px;
        text-align: center;
        font-weight: bold;
        background-color: white;
        border: solid;
        border-width: 1.5px;
        border-color: rgba(68, 68, 68, 1);
        border-radius: 5px;
        padding: 0 5px;
    }

    .sortClass {
        font-size: 12px;
        width: 44px; height: 28px;
        display: inline-block;
        float: left;
        z-index: 1000;
    }

    #sort {
        float: right;
    }

    #postList {
        width: 100%; height: calc(92vh - 28px - 2%);
        overflow-y: scroll;
    }

    .postWrap {
        width: 97%;
        margin: 0 auto;
        margin-top: 1%;
        background-color: white;
        border-radius: 10px;
        padding: 1% 3%;
    }

    .postHeader {
        width: 100%; height: auto;
    }

    .name {
        font-size: 12px;
        font-weight: bold;
        max-width: 50%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: rgba(89,89,89,0.7);
    }

    .tag {
        font-size: 12px;
        font-weight: bold;
        max-width: 50%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #8c151f;
        float:right;
    }

    .postBody {
        margin: 1% 0;
    }

    .postMenu {
        font-size: 12px;
        color: rgba(89, 89, 89, 0.8);
    }

    #noArticle {
        text-align: center;
        margin-top: 10px;
    }
</style>
