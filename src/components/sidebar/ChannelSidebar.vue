<template>
    <div id="wrap">
        <div id="channelProfileCard">
            <channel-profile-card :subscribers=channel_subscribers></channel-profile-card>
        </div>
        <div id="channelDescriptionWrap">
            <h4 id="channelDescriptionTitle">실록 설명</h4>
            <div id="channelDescription">{{channel_info.description}}</div>
        </div>
        <div id="channelRuleWrap">
            <h4 id="channelRuleTitle">실록 규칙</h4>
            <div id="channelRuleListWrap">
                <ol>
                    <li v-for="rule in rules">

                        {{rule}}

                    </li>
                </ol>
            </div>
        </div>
        <div id="channelBtn">
            <div class="buttonWrap">
                <button>실록 수정</button>
            </div>
            <div class="buttonWrap">
                <button v-if="!user_subscribe" @click="subscribe">구독 하기</button>
                <button v-else @click="unsubscribe">구독 취소하기</button>
            </div>
            <div class="buttonWrap">
                <button >알림 받기</button>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import ChannelProfileCard from './ChannelProfileCard'
    export default{
        data(){
          return{
              channel_info:[],
              rules: [],
              user_pk : localStorage.getItem("user_pk"),
              channel_id: this.$route.params.channelID,
              user_subscribe: false,
              channel_subscribers: 0,
          }
        },
        components:{
            'channel-profile-card': ChannelProfileCard,
        },
        mounted(){
            axios.get('channel/'+this.channel_id)
                .then((response)=>{
                    for(let i=0;i<response.data.subscribers.length;i++){
                        if(response.data.subscribers[i].id == this.user_pk){
                            this.user_subscribe = true;
                        }
                    }
                    this.channel_info = response.data;
                    this.channel_subscribers = response.data.subscribers.length;
                })
                .catch(()=>{
                    alert("잘못된 접근입니다.");
                    this.$router.push('/');
                });


        },
        methods:{
            subscribe(){
                axios.post('channel/'+this.channel_id+'/subscribe/')
                    .then((response)=>{
                        this.user_subscribe = true;
                        this.channel_subscribers = response.data.subscribers.length;
                    })
            },
            unsubscribe(){
                axios.delete('channel/'+this.channel_id+'/subscribe/')
                    .then((response)=>{
                        this.user_subscribe = false;
                        this.channel_subscribers = response.data.subscribers.length;
                    })
                    .catch(()=>{
                        alert("관리자는 구독을 취소할 수 없습니다.");
                    })
            }
        }
    }

</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        cursor: default;
    }

    ol {
        list-style-position: inside;
    }

    #wrap {
        width: 100%; height: 100%;

    }

    #channelProfileCard {
        width: 100%;
        height: 20vw; /*정사각형일려면 16vw*/
    }

    #channelDescriptionWrap {
        background-color: white;
        border-radius: 7px;
        margin: 2% 2%;
        padding: 5% 5%;
        margin-top: 0;
    }

    #channelDescriptionTitle {
        color: #8c151f;
        font-weight: bold;
    }

    #channelDescription {
        font-size: 12px;
        font-weight: bold;
    }

    #channelRuleWrap {
        background-color: white;
        border-radius: 7px;
        margin: 2% 2%;
        padding: 5% 5%;
    }

    #channelRuleTitle {
        color: #8c151f;
    }

    #channelRuleListWrap {
        font-size: 12px;
        font-weight: bold;
    }
    .buttonWrap{
        width: 100%;
        text-align: center;
    }
    button{

        display: inline;
        width: 70%;
        height: 30px;
        font-size: 14px;
        color: white;

        margin-top: 5%;
        background: none;
        outline: none;
        border-style: none;
        font-weight: bold;

        cursor: pointer;
    }
    button:hover{

        box-shadow: 0 0 10px #8c151f;
        border-radius: 5px;
    }

    /*테블릿*/
    @media all and (max-width:1024px){
        button {
            font-size: 0.8em;
        }
    }

    @media all and (max-width:640px){
        #channelProfileCard {
            height: 80vw;
        }

        button {
            font-size: 1.2rem;
        }
    }

</style>