<!--suppress ALL -->
<template>
    <div id="ArticleWrap">
        <div id="articleTitle">
            <div id="titleWrapper">
                <div id="title">
                    <h3 id="titleContent">{{post.title}}</h3>
                    <i v-if="isPinned" id="pinned" class="thumbtack icon"></i>
                </div>
                <div id="articleMenu">
                    <div id="menuIconWrapper" v-on:click.prevent="showDropDown=!showDropDown">
                        <a class="menuLinkToggle" style="cursor:pointer">
                            <i id="menuDropdownIcon" class="ellipsis horizontal icon"></i>
                        </a>
                    </div>
                    <ul v-if="showDropDown">
                        <div class="dropdownMenu">
                            <li class="dropdownMenuItem"><a style="cursor:pointer">
                                <div class="dropdownMenuLink"><i class="exclamation icon"></i><span>게시물 신고</span></div>
                            </a>
                            </li>
                            <li class="dropdownMenuItem"><a style="cursor:pointer">
                                <div class="dropdownMenuLink" @click="toEdit()" v-if="post.author.id == user_pk"><i class="edit icon"></i><span>수정</span></div>
                            </a>
                            </li>
                            <li class="dropdownMenuItem"><a style="cursor:pointer" @click="deleteArticle()">
                                <div class="dropdownMenuLink" v-if="post.author.id == user_pk"><i class="trash alternate icon" ></i><span>삭제</span></div>
                            </a>
                            </li>
                            <li class="dropdownMenuItem" v-if="is_moderator"><a style="cursor:pointer">
                                <div class="dropdownMenuLink" @click="pinPost" v-if="!isPinned" ><i class="thumbtack icon" ></i><span>공지 띄우기</span></div>
                                <div class="dropdownMenuLink" @click="pinPost" v-else><i class="thumbtack icon" ></i><span>공지 취소하기</span></div>

                            </a>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <div id="articleInfo">
                <div id="writer">{{username}}</div>
                <div id="date">{{submission_date}} {{submission_time}}</div>
                <div id="channelName">#{{channel_name}}</div>
            </div>
        </div>
        <div id="contentWrap">
            <div id="content">{{post.content}}</div>
            <div id="image" v-if="existence_of_image === true" >
                <image-view :images = image_list></image-view>
            </div>
            <div v-if="existence_of_vote===true">
                <before-vote v-if="!is_voted"
                             v-on:vote_submit="voteSubmit()"
                             :vote="vote_data"
                             :user_pick="user_pick"></before-vote>
                <after-vote v-else
                            :vote="vote_data"></after-vote>
            </div>
        </div>

        <div id="like">
            <div id="updownVote">
                <div id="upVote">
                    <a>
                        <img src="../../images/upvote.png" :class="{unvoted: !upVoted, voted: upVoted }" @click="upvote" style="cursor:pointer" id="upvotedIcon"/>
                        <div id="upvoteCount" >{{upCount}}</div>
                    </a>
                </div>
                <div id="downVote">
                    <a>
                        <img src="../../images/downvote.png"
                             :class="{unvoted: !downVoted, voted: downVoted }"
                             @click="downvote"
                             id="downvotedIcon">
                        <div id="downvoteCount">{{downCount}}</div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import BeforeVote from './BeforeVote'
    import AfterVote from './AfterVote'
    import ImageView from './ImageView'
    export default {
        name: "Article",
        data() {
            return {
                showDropDown: false,
                post: [],
                username: '',
                user_pk: localStorage.getItem("user_pk"),
                channelID: this.$route.params.channelID,
                postID: this.$route.params.postID,
                channel_name:'',
                upVoted: false,
                upCount: 0,
                downVoted: false,
                downCount: 0,
                isPinned: false,
                is_moderator: false,
                submission_date: [],
                submission_time: [],
                vote_data: '',
                is_voted: false, // 투표 여부
                existence_of_vote: false,
                existence_of_image: false,
                vote_result: null,
                user_pick: [],
                voting_exists: false,
                load : false,
                image_list: [],
                vote_page: 1,
                vote_page_end: false,
            }
        },
        components:{
            'before-vote': BeforeVote,
            'after-vote': AfterVote,
            'image-view': ImageView,
        },
        created() {
            axios.get('post/' + this.postID + '/')
                .then((response) => {
                    this.post = response.data;
                    this.username = response.data.author.username;
                    this.upCount = response.data.likes;
                    this.channel_name = response.data.channel.name;
                    this.downCount = response.data.dislikes;
                    this.isPinned = response.data.pinned;
                    this.submission_date = response.data.created_at.split('T')[0].replace(/-/g, ".");
                    this.submission_time = response.data.created_at.split('T')[1].split('.')[0];
                    this.upCount = response.data.likes_count;
                    this.downCount = response.data.dislikes_count;

                    for(var i=0;i<response.data.channel.moderators.length;i++){
                        if(response.data.channel.moderators[i] == this.user_pk){
                            this.is_moderator = true;
                            break;
                        }
                    }

                    for(var i=0; i<response.data.likes_count; i++){
                        if(response.data.likes[i] == this.user_pk){
                            this.upVoted = true;
                            break;
                        }
                    }
                    if(this.upVoted == false){
                        for(var i=0; i<response.data.dislikes_count; i++){
                            if(response.data.dislikes[i] == this.user_pk){
                                this.downVoted = true;
                                break;
                            }
                        }
                    }

                    if(response.data.vote.length !== 0){
                        this.vote_data = response.data.vote[0];
                        this.existence_of_vote = true;
                        for(let i = 0;i<this.vote_data.choices.length;i++){
                            this.vote_page_end = false;

                                    axios.get('addon/vote/' + this.vote_data.id + '/' + this.vote_data.choices[i].id + '/responder/?page=' + this.vote_page)
                                        .then((response) => {
                                            console.log(response);
                                            if (response.data.results.find(c => c.id == this.user_pk)) {
                                                this.is_voted = true;
                                                this.vote_page_end = true;
                                            }
                                            else {
                                                if (response.data.next == null) {
                                                    this.vote_page = 0;
                                                    this.vote_page_end = true;
                                                }
                                                else {
                                                    this.vote_page++;
                                                }
                                            }
                                        })
                        }
                    }
                    if(response.data.image.length !== 0){
                        this.image_list = response.data.image;
                        this.existence_of_image = true;
                        console.log(this.image_list);
                    }
                    this.load = true;
                })


        },
        methods: {
            deleteArticle(){
                axios.delete('post/'+this.postID+'/')
                    .then(()=>{
                        this.$router.push('/'+this.channelID);
                    })
            },
            voteSubmit(){
                this.is_voted = true;
            },

            upvote() {
                if (this.downVoted == true){
                    axios.delete('post/' + this.postID + '/dislike/')
                        .then(()=>{
                            this.downCount --;
                        })
                }
                if(this.upVoted == false) {
                    axios.post('post/' + this.postID + '/like/')
                        .then(() => {
                            this.upVoted = true;
                            this.downVoted = false;
                            this.upCount++;
                        })
                }
                else{
                    axios.delete('post/' + this.post.id + '/like/')
                        .then(() => {
                            this.upVoted = false;
                            this.downVoted = false;
                            this.upCount--;
                        })
                }
            },
            downvote() {
                if (this.upVoted == true){
                    axios.delete('post/' + this.postID + '/like/');
                    this.upCount --;
                }
                if(this.downVoted == false){
                    axios.post('post/' + this.postID + '/dislike/')
                        .then(() => {
                            this.upVoted = false;
                            this.downVoted = true;
                            this.downCount++;
                        })
                }
                else{
                    axios.delete('post/' + this.postID + '/dislike/')
                        .then((response) => {
                            this.upVoted = false;
                            this.downVoted = false;
                            this.downCount--;
                        })
                }

            },
            toEdit(){
                this.$router.push('/'+this.channelID+'/edit/'+this.postID);
            },
            pinPost(){
                const Post_data={
                    pinned : !this.isPinned,
                }
                axios.patch('/post/'+this.postID +'/', Post_data)
                    .then((response)=>{
                        this.isPinned = !this.isPinned;
                    })
            }
        } //methods
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

    a:focus {
        color: black;
    }

    a:hover {
        color: black;
    }

    li {
        list-style: none;
    }

    #ArticleWrap {
        width: 100%; height: 100%;
    }

    #titleWrapper {
        height: auto;
        width: 100%;
        padding-bottom: 2px;
    }

    #title {
        width: calc(100% - 27px); height: 23px;
        display: inline-block;
        font-weight: bolder;
        line-height: 23px;
    }

    #titleContent {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: calc(100% - 55px); height: 23px;
        float: left;
    }

    #pinned {
        display: inline-block;
        margin: 0 3px;
        font-size: 18px;
        height: 23px; width: 22px;
        float: left;
    }

    #articleMenu {
        width: 27px; height: 27px;
        display: inline-block;
        font-size: 20px;
        overflow: visible;
    }

    #menuIconWrapper {
        line-height: 27px;
        text-align: center;
    }

    .dropdownMenu {
        display: inline-block;
        width: 120px;
        float: right;
        background-color: white;
        padding: 8px 2px;
        box-shadow: -2px -1px 10px 2px #c9c9c9;
        border-radius: 2px;
        position: relative;
        z-index: 10;
    }

    .dropdownMenuLink {
        margin: 0;
        width: 100%; height: 28px;
        padding-top: 3px;
        color: black;
        background-color: white;
        font-size: 15px;
    }

    #articleInfo {
        width: 100%; height: auto;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #8c151f;
        padding-bottom: 8px;
    }

    #writer {
        color: #8c151f;
        height: auto;
        border-right-style: solid;
        border-right-width: 1.5px;
        border-right-color: #777777;
        display: inline-block;
        padding-right: 7px; margin-right: 7px;
        font-size: 12px;
        font-weight: bold;
    }

    #date {
        color: #8c151f;
        border: none; margin: 0;
        display: inline-block;
        padding: 0;
        font-size: 12px;
        font-weight: bold;
    }

    #channelName {
        color: #8c151f;
        margin: 0;
        display: inline-block;
        float: right;
        font-size: 14px;
        font-weight: bold;
    }

    #content {
        color: black;
        margin: 10px 0;
        font-size: 15px;
    }

    #like {
        width: 100%;
    }

    .voted {
        opacity: 1;
    }

    .unvoted {
        opacity: 0.5;
    }

    #updownVote {
        width: 50%;
        margin: 0 auto;
        padding: 0;
    }

    #upVote {
        display: inline-block;
        width: 20%;
    }

    #upvotedIcon {
        width: 100%;
        margin: 0; padding: 0;
    }

    #upvoteCount {
        width: 100%;
        margin: 0; padding: 0;
        text-align: center;
        font-size: 15px;
        color: black;
    }

    #downVote {
        display: inline-block;
        float: right;
        width: 20%;
    }

    #downvotedIcon {
        width: 100%;
    }

    #downvoteCount {
        color: black;
        width: 100%;
        text-align: center;
        font-size: 15px;
    }

    @media screen and (max-width:640px) {
        #menuDropdownIcon {
            color: black;
            font-size: 16px;
        }

        #titleWrapper {
            padding-bottom: 1px;
        }

        #articleInfo {
            border-bottom-width: 0.5px;
            padding-bottom: 6px;
            height: 20px;
        }

        #writer {
            color: #6b6b6b;
            border: none;
            padding-right: 4px; margin-right: 4px;
            font-size: 10px;
            max-width: calc(100% - 52px - 45% - 4px); height: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            float: left;
        }

        #date {
            color: #6b6b6b;
            border: none;
            margin: 0;
            font-size: 10px;
            height: 20px;
            float: left;
        }

        #channelName {
            max-width: 45%; height: 20px;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        #like {
            width: 100%;
        }

        #updownVote {
            width: 100%;
        }

        #upVote {
            width: 50%;
            padding-left: calc((50% - 100px) / 2);
            padding-right: calc((50% - 100px) / 2);
        }

        #upvotedIcon {
            width: 40px; height: 35px;
            display: inline-block;
            float: left;
        }

        #upvoteCount {
            width: 50px; height: 35px;
            margin-left: 10px;
            display: inline-block;
            float: left;
            line-height: 35px;
        }

        #downVote {
            width: 50%;
            padding-left: calc((50% - 100px) / 2);
            padding-right: calc((50% - 100px) / 2);
        }

        #downvotedIcon {
            width: 40px; height: 35px;
            display: inline-block;
            float: left;
        }

        #downvoteCount {
            width: 50px; height: 35px;
            margin-left: 10px;
            display: inline-block;
            float: left;
            line-height: 35px;
        }
        #image{
            width: 100%;
        }
    }
</style>
