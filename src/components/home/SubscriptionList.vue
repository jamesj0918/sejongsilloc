<template>
    <div id="SubscriptionList">
        <div id="SubscriptionListWrapper">
            <div id="pageTitle"><h3>나의 구독 실록 보기</h3></div>
            <div id="subscriptionListWrap">
                <ul>
                    <li v-for="(channel, key) in channel_list" :key="key">
                        <div id="singleChannel">
                            <div id="channelImgWrapper" @click="enterChannel(channel.slug)" style="cursor:pointer">
                                <div v-if="channel.icon"><img class="channelImg" v-bind:src="channel.icon.image"></div>
                                <div v-else><img class="channelImg" src="../../images/moon.jpg"></div>
                            </div>
                            <div id="channelData">
                                <div id="channelName"
                                     @click="enterChannel(channel.slug)"
                                     style="cursor:pointer">
                                    #{{channel.name}}
                                </div>
                                <div id="channelNameMobile"
                                     @click="enterChannel(channel.slug)"
                                     style="cursor:pointer">
                                    {{channel.name}}
                                </div>
                                <div id="channelDescription"
                                     @click="enterChannel(channel.slug)"
                                     style="cursor:pointer">
                                    {{channel.description}}
                                </div>
                            </div>
                            <div id="subscriptionBtnWrapper">
                                <div id="subscriptionBtn" style="cursor:pointer">구독취소</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "SubscriptionList",
        data(){
          return{
              subscription_page: 1,
              channel_list: [],
          }
        },
        methods:{
            enterChannel(object){
                this.$router.push('/'+object);
            },
            getData(){
                axios.get('channel/?subscribed=1&page='+this.subscription_page)
                    .then((response)=>{
                        for(let i=0;i<response.data.results.length;i++){
                            this.channel_list.push(response.data.results[i]);
                        }
                    })
            }
        },
        mounted(){
            this.getData();
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

    li {
        list-style: none;
    }
    #SubscriptionList {
        width: 100%; height: 91vh;
        overflow-y: scroll;
    }
    #SubscriptionListWrapper {
        height: auto;
        overflow-y: scroll;
        width: 97%;
        margin: 0 auto;
        padding: 3% 3%;
        margin-top: 2%;
        background-color: white;
        border-radius: 10px;
    }

    ::-webkit-scrollbar{
        width: 5px !important;
    }
    ::-webkit-scrollbar-track {
        background-color: #f8f8f8 !important;
    }
    ::-webkit-scrollbar-thumb {
        background-color: lightgray;
    }

    #pageTitle {
        margin-bottom: 10px;
    }

    #singleChannel {
        margin: 10px 0;
        border-style: solid;
        border-width: 2px;
        border-color: rgba(174,174,174, 0.5);
        border-radius: 7px;
        padding: 15px 17px;
        height: 94px;
    }

    #channelImgWrapper {
        width: 60px; height: 60px;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        float: left;
    }

    .channelImg {
        height: 60px; width: 60px;
    }

    #channelData {
        width: calc(100% - 140px);
        height: 60px;
        display: inline-block;
        float: left;

        padding: 7px 15px;
    }

    #channelName {
        height: 19px; width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #8c151f;
        font-weight: 900;
        font-size: 16px;
        cursor: pointer;
    }

    #channelNameMobile {
        display: none;
    }

    #channelDescription {
        height: 19px; width: 100%;
        margin-top: 8px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 16px;
        font-weight: bold;
    }

    #subscriptionBtnWrapper {
        width: 80px; height: 60px;
        display: inline-block;
        float: left;
    }

    #subscriptionBtn {
        background-color: #8c151f;
        width: 80px; height: 30px;
        margin: 15px 0;
        border-radius: 5px;
        color: white;
        text-align: center;
        line-height: 30px;
        font-weight: bold;
    }

    /* 모바일 (해상도 640px 이하) */
    @media all and (max-width: 640px) {
        #channelName {
            display: none;
        }

        #channelDescription {
            display: none;
        }

        #singleChannel {
            padding: 12px 17px;
            height: 88px;
        }

        #channelData {

            padding: 15px;
        }

        #channelNameMobile {
            display: inline-block;

            height: 30px; width: 100%;
            line-height: 30px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 20px;
            font-weight: bolder;
        }

        #channelData {
            width: calc(100% - 130px);
        }

        #subscriptionBtnWrapper {
            width: 70px;
        }

        #subscriptionBtn {
            width: 70px;
        }

    }
</style>
