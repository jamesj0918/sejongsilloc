<template>
    <div id="SearchLayout">
        <div id="SearchLayoutWrap">
            <div id="top">
                <div id="title"><h3>검색결과</h3></div>
                <div id="select"></div>
            </div>
            <div id="resultChannel">
                <div id="resultChannelTitle">실록</div>
                <div v-if="channel_result === false" class="nullContent">
                    <h4>검색결과가 존재하지 않습니다.</h4>
                </div>
                <div v-else>
                    <ul>
                        <li v-for="channel in channels">
                            <div class="resultChannelItem">
                                <div class="channelImgWrap">
                                    <img class="channelImg"  v-if="channel.icon !== null" :src="channel.icon.image" />
                                    <img v-else class="channelImg" src="../../images/moon.jpg"/>

                                </div>
                                <div class="channelInfo">
                                    <div class="channelName" @click="gotoChannel(channel.slug)">#{{channel.name}}</div>
                                    <div class="channelDescription">{{channel.description}}</div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="resultPost">
                <div id="resultPostTitle">게시물</div>
                <div v-if="post_result == false" class="nullContent">
                    <h4>검색결과가 존재하지 않습니다.</h4>
                </div>
                <div v-else>
                    <ul>
                        <li v-for="post in posts">
                            <div class="resultPostItem">
                                <div class="postTop">
                                    <div class="userImgWrap">
                                        <img v-if="post.author.icon !== null" class="userImg" :src="post.author.icon.image"/>
                                        <img v-else class="userImg" src="../../images/moon.jpg"/>
                                    </div>
                                    <div class="postInfo">
                                        <div class="postWriterName" >{{post.author.username}}</div>
                                        <div class="date">{{post.created_at | print_date}}</div>
                                        <div class="postChannelName">#{{post.channel.name}}</div>
                                    </div>
                                </div>
                                <div class="postTitle" @click="gotoPost(post.channel.slug, post.id)">{{post.title}}</div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "SearchLayout",
        data(){
            return {
                search_data : this.$route.query.search_data,
                channels: [],
                posts: [],
                channel_page: 1,
                post_page: 1,
                channel_result: false,
                post_result: false,
            }
        },

        created(){
            this.getChannelSearch();
            this.getPostSearch();
        },

        methods:{
            gotoChannel(channel_slug){
                this.$router.push('/'+channel_slug);
            },
            gotoPost(channel_slug, post_pk){
                this.$router.push('/'+channel_slug+'/'+post_pk);
            },
            getChannelSearch(){
                axios.get('channel/?search='+this.search_data+'&page='+this.channel_page)
                    .then((response)=>{
                        console.log(response);
                        for(let i=0;i<response.data.results.length;i++){
                            console.log(response.data.results[i]);
                            this.channels.push(response.data.results[i]);
                            this.channel_result = true;
                        }
                    });
            },
            getPostSearch(){
                axios.get('post/?search='+this.search_data+'&page='+this.post_page)
                    .then((response)=>{
                        for(let i=0;i<response.data.results.length;i++){
                            this.posts.push(response.data.results[i]);
                            this.post_result = true;
                        }

                    });
            }
        },

        filters: {
            print_date: function(date) {
                if(!date) return ''
                date = date.toString() // 이걸 써야하는가..
                return date[0]+date[1]+date[2]+date[3]+'.'+date[5]+date[6]+'.'+date[8]+date[9]+' '+date[11]+date[12]+date[13]+date[14]+date[15]
            }
        },
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        font-family: "Noto Sans KR";
    }

    li {
        list-style: none;
    }

    .nullContent{
        margin-left: 5%;
        margin-top: 5px;
        margin-bottom: 5px;
    }
    #SearchLayout {
        width: 100%; height: 97vh;
        overflow-y: scroll;
    }

    #SearchLayoutWrap {
        width: 97%; height: auto;
        margin: 0 auto;
        padding: 3% 3%;
        margin-top: 2%;
        background-color: white;
        border-radius: 10px;
    }

    #top {
        width: 100%;
        margin-bottom: 10px;
        font-weight: bolder;
    }

    #resultChannel {
        width: 100%; height: auto;
        margin-bottom: 10px;
        padding: 0;
        border: solid;
        border-width: 1px;
        border-color: rgba(91,91,91,0.5);
        border-radius: 7px;
        overflow: hidden;
    }

    #resultChannelTitle {
        width: 100%; height: 35px;
        padding-left: 10px;
        background-color: #8c151f;
        color: white;
        font-size: 15px;
        font-weight: bolder;
        line-height: 35px;
    }

    .resultChannelItem {
        width: 100%; height: 80px;
        border-top: solid;
        border-width: 1px;
        border-color: rgba(91,91,91,0.5);
    }

    .channelImgWrap {
        width: 60px; height: 60px;
        margin: 10px 15px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
    }

    .channelImg {
        width: 60px;
    }

    .channelInfo {
        width: calc(100% - 90px); height: 60px;
        margin-top: 10px;
        margin-bottom: 10px;
        display: inline-block;
        float: right;
    }

    .channelName {
        width: 100%; height: 25px;
        margin-bottom: 5px;
        color: #8c151f;
        font-size: 15px;
        line-height: 25px;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }

    .channelDescription {
        width: 100%;  height: 20px;
        font-size: 13px;
        font-weight: bold;
        line-height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    #resultPost {
        width: 100%; height: auto;
        margin-bottom: 10px;
        padding: 0;
        border: solid;
        border-width: 1px;
        border-color: rgba(91,91,91,0.5);
        border-radius: 7px;
        overflow: hidden;
    }

    #resultPostTitle {
        width: 100%; height: 35px;
        padding-left: 10px;
        background-color: #8c151f;
        color: white;
        font-size: 15px;
        font-weight: bolder;
        line-height: 35px;
    }

    .resultPostItem {
        width: 100%;
        border-top: solid;
        border-width: 1px;
        border-color: rgba(91,91,91,0.5);
    }

    .postTop {
        width: 100%; height: 50px;
    }

    .userImgWrap {
        width: 40px; height: 40px;
        margin: 5px 15px;
        margin-right: 10px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
    }

    .userImg {
        width: 40px;
    }

    .postInfo {
        width: calc(100% - 65px); height: 50px;
        display: inline-block;
        float: right;
    }

    .postWriterName {
        height: 20px;
        margin-top: 15px;
        font-size: 13px;
        font-weight: bold;
        line-height: 20px;
        color: #8c151f;
        display: inline-block;
    }

    .date {
        height: 20px;
        margin-top: 15px; margin-left: 5px;
        font-size: 13px;

        line-height: 20px;
        color: rgba(99,99,99,0.7);
        display: inline-block;
    }

    .postChannelName {
        height: 22px;
        margin-top: 14px;
        margin-right: 15px;
        font-size: 14px;
        font-weight: bolder;
        line-height: 22px;
        color: #8c151f;
        display: inline-block;
        float: right;
    }

    .postTitle {
        width: 100%;
        padding: 5px 15px;
        font-size: 13px;
        font-weight: bold;
        cursor: pointer;
    }

    #resultUser {
        width: 100%; height: auto;
        margin-bottom: 10px;
        padding: 0;
        border: solid;
        border-width: 1px;
        border-color: rgba(91,91,91,0.5);
        border-radius: 7px;
        overflow: hidden;
    }

    #resultUserTitle {
        width: 100%; height: 35px;
        padding-left: 10px;
        background-color: #8c151f;
        color: white;
        font-size: 15px;
        font-weight: bolder;
        line-height: 35px;
    }

    .resultUserItem {
        width: 100%;
        border-top: solid;
        border-width: 1px;
        border-color: rgba(91,91,91,0.5);
    }

    .userInfoWrap {
        width: calc(100% - 90px); height: 60px;
        padding-top: 15px;
        display: inline-block;
        float: right;
    }

    .userName {
        width: 100%; height: 25px;

        font-size: 15px;
        font-weight: bolder;
        line-height: 25px;
        color: #8c151f;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .userInfo {
        width: 100%; height: 20px;
    }

    .following {
        height: 20px;
        font-size: 11px;
        line-height: 20px;
    }

    .follower {
        height: 20px;
        font-size: 11px;
        line-height: 20px;
    }

</style>
