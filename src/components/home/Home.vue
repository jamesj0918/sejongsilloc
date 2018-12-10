<template>
    <div id="Home">
        <div id="HomeWrap">
            <div id="postList" v-if="!empty">
                <ul>
                    <li v-for = "Post in posts.slice().reverse()" class="post">
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
                                <span class="title" v-on:click="postView(Post.id, Post.channel.slug)"  >
                                    <h4 style="cursor:pointer">{{Post.title}}</h4>
                                    <i v-if="Post.pinned" id="pinned" class="thumbtack icon"></i>
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
                <h3>빈 실록입니다!</h3>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Home",
        data(){
            return{
                sort: [
                    {key: 'fav', value: 'fav', text:'인기'},
                    {key: 'com', value: 'com', text:'댓글'},
                    {key: 'new', value: 'new', text:'최신'},
                ],
                current: 'fav',
                posts: [],
                pinned_post: [],
                empty: true,
                channel_id: this.$route.params.channelID,
            }
        },
        methods:{
            post(){
                this.$router.push(this.channel_id+'/post');
            },
            postView(post_pk, channel_pk){
                this.$router.push(channel_pk+"/"+post_pk);
            }
        },
        mounted(){
            axios.get('post/?subscribed=1')
                .then((response)=> {
                    console.log(response);
                    if(response.data.length == 0) return;
                    this.empty = false;

                    for(let i = 0;i<response.data.length;i++){
                        this.posts.push(response.data[i]);
                    }
                })
        }
    }
</script>

<style scoped>

    * {
        margin: 0;
        padding: 0;
        cursor: default;
        font-family: "Noto Sans KR";
    }

    ul {
        list-style: none;
    }

    button:focus {
        outline: none;
    }

    h4{
        display: inline-block;
    }

    #Home {
        width: 100%; height: 92vh;
        overflow-y: scroll;
    }

    #HomeWrap {
        width: 100%; height: auto;
    }

    #pinned {
        display: inline-block;
        margin: 0 3px;
        font-size: 18px;
        height: 23px; width: 22px;
    }
    h4{
        display: inline-block;
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
