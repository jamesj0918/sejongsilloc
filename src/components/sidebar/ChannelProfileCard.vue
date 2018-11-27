<template>
    <div id="wrap">
        <div id="channelProfileContainer">
            <div id="imgContainer">
                <div id="bannerWrap">
                    <div v-if="wallpaper_url !== ''"><a :href="wallpaper_url"><img :src="wallpaper_url" class="bannerImg"/></a></div>
                    <div v-else><img src="../../images/universe.jpg" class="bannerImg"></div>
                </div>
                <div id="profileWrap">
                    <div id="profileImgWrap">
                        <a :href="icon_url"><img :src="icon_url" class="profileImg"/></a>
                        <img src="../../images/moon.jpg" class="profileImg">
                    </div>
                </div>
            </div>
            <div id="informationContainer">
                    <div id="channelName" @click="goChannelMain" style="cursor: pointer"> <h3 id="name">{{channel_info.name}}</h3></div>
                    <div ><h4 id="follower">{{subscribers}}명 구독중</h4></div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        props: ['subscribers'],
        name: "ChannelProfileCard",
        data(){
            return{
                channel_info: [],
                id: this.$route.params.channelID,
                icon_url : '',
                wallpaper_url: ''
            }
        },
        mounted(){
            axios.get('channel/'+this.id+'/')
            .then((response)=>{
                const base_url = 'https://sejongapi-v2.herokuapp.com';
                this.channel_info = response.data;
                this.icon_url = base_url + response.data.icon.image;
                this.wallpaper_url = base_url + response.data.wallpaper.image;
            })
        },
        methods:{
            goChannelMain(){
                this.$router.push('/'+this.id);
            }
        }
    }
</script>

<style scoped>

    *{
        margin: 0;
        padding: 0;
    }

    #wrap {
        width: 100%; height: 100%;
        padding: 2% 2%;
    }

    #channelProfileContainer{
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 7px;
        margin: 0 auto;
        overflow: hidden;
    }

    #imgContainer{
        width: 100%;
        height: 60%;
    }

    #bannerWrap {
        width: 100%;
        height: 8vw; /*calc(100% - 3.2vw)*/
        position: relative;
        overflow: hidden;
        background-color: white;
        vertical-align: center;
    }

    .bannerImg {
        width: 100%;
    }

    #profileWrap {
        width: 100%;
        height: 8vw;
        position: relative;
        top: -4vw;
    }

    #profileImgWrap {
        height: 8vw;
        width: 8vw;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        vertical-align: center;
    }

    .profileImg {
        width: 100%;
    }

    #informationContainer{
        width: 100%; height: 40%;
        padding: 9% 2%;
        text-align: center;
    }

    #channelName {
        width: 100%;
        height: auto; max-height: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bolder;
        margin-bottom: 2%;
    }

    @media all and (max-width:1024px){
        #informationContainer {
            padding-top: 5%;
        }

        #name{
            font-size: 1rem;
        }

        #follower {
            font-size: 0.6rem;
        }
    }

    @media all and (max-width:640px){
        #bannerWrap {
            height: 32vw;
        }

        #profileWrap {
            height: 32vw;
            top: -16vw;
        }

        #profileImgWrap {
            height: 32vw;
            width: 32vw;
        }

        #name {
            font-size: 1.4rem;
        }
    }
</style>
