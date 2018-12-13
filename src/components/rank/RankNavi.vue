<template>
    <div>
        <div>
            <h3>추천 실록</h3>
        </div>
        <div>
            <ul>
                <li v-for="(channel,id) in channel_list" @click="link_to_channel(channel.slug)">
                    <div class="rankWrap">
                        <div class="channelInfo">
                            <div class="channelName" style="cursor: pointer">{{channel_list[id].name}}</div>
                            <div class="channelSubscriber">{{channel_list[id].subscribers.length}}명 구독중</div>
                        </div>
                        <div class="BtnWrap">
                            <button class="subBtn" style="cursor: pointer"> 구독하기</button>
                        </div>
                    </div>
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "RankNavi",
        data(){
            return {
                channel_list: [],
            }
        },
        mounted(){
            axios.get('channel/?page=1')
                .then((response)=>{
                    for(let i=0;i<4;i++){
                        this.channel_list.push(response.data.results[i]);
                    }
                })
        },//mounted
        methods: {
            link_to_channel(object){
                this.$router.push('/'+object);
            }
        }

    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        cursor: default;
        font-family: "Noto Sans KR";
    }

    li{
        list-style: none;
    }

    button {
        width: auto; height: auto;
        text-align: center;
        padding: 7px;
        font-size: 8px;
        font-weight: bold;
        background-color: #8c151f;
        color: white;
        border: none;
        border-radius: 5px;
        display: inline-block;

    }

    button:focus {
        outline: none;
    }

    #RankNavi {
        width: 100%; height: 100%;
    }

    #rankTitle {
        margin: 7px;
        color: rgba(60, 60, 60 ,1);
    }

    .rankWrap {
        width: 100%;
        margin: 7px 0;
        padding: 0 7px;
    }

    .channelInfo{
        width: calc(100% - 54px);

        display: inline-block;
        vertical-align: middle;
    }

    .channelName {
        width: 100%;
        color: rgba(65, 65, 65 ,1);
        font-size: 13px;
        font-weight: bolder;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .channelSubscriber{
        width: 100%;
        color: #8c151f;
        font-size: 12px;
        font-weight: bolder;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .BtnWrap{
        width: 54px;

        display: inline-block;
        vertical-align: middle;

    }

    .subBtn {
        white-space: nowrap;
    }
</style>
