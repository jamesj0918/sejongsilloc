<template>
    <div id="wrap">
        <div id="channelProfileContainer">
            <div id="imgContainer">
                <div id="bannerWrap" >
                    <div v-if="wallpaper_url !== ''"><img
                        style="cursor: pointer; z-index: 200;"
                        @click="show_wallpaper(0)"
                        :src="wallpaper_url"
                        class="bannerImg"/>
                    </div>
                    <div v-else><img src="../../images/universe.jpg" class="bannerImg"></div>
                </div>
                <div id="profileWrap">
                    <div id="profileImgWrap">
                        <div v-if="icon_url !== ''">
                            <img
                                style="cursor: pointer; z-index: 500;"
                                @click="show_icon(0)"
                                :src="icon_url"
                                class="profileImg"/>
                        </div>
                        <div v-else><img src="../../images/moon.jpg" class="profileImg"></div>
                    </div>
                </div>
            </div>
            <div id="informationContainer">
                    <div id="channelName" @click="goChannelMain" style="cursor: pointer">
                        <h3 id="name">{{channel_info.name}}</h3>
                    </div>
                    <div><h4 id="follower">{{subscribers}}명 구독중</h4></div>
            </div>
        </div>
        <LightBox ref="wallpaper" :show-light-box="false" :images="wallpaper"></LightBox>
        <LightBox ref="icon" :show-light-box="false" :images="icon"></LightBox>
    </div>
</template>

<script>
    import axios from 'axios'
    import LightBox from 'vue-image-lightbox'
    require('vue-image-lightbox/dist/vue-image-lightbox.min.css');
    export default {
        components: {LightBox},
        props: ['subscribers'],
        name: "ChannelProfileCard",
        data(){
            return{
                channel_info: [],
                id: this.$route.params.channelID,
                icon_url : '',
                wallpaper_url: '',
                icon: [],
                wallpaper: []
            }
        },
        mounted(){
            axios.get('channel/'+this.id+'/')
            .then((response)=>{
                const base_url = 'https://sejongapi-v2.herokuapp.com';
                if(response.data.icon !== null) {
                    this.icon_url = base_url + response.data.icon.image;
                }
                if(response.data.wallpaper !== null) {
                    this.wallpaper_url = base_url + response.data.wallpaper.image;
                }
                this.channel_info = response.data;

                this.icon.push({src: this.icon_url, thumb: this.icon_url});
                this.wallpaper.push({src: this.wallpaper_url, thumb: this.wallpaper_url});
            })
        },
        methods:{
            goChannelMain(){
                this.$router.push('/'+this.id);
            },
            show_wallpaper(index) {
                this.$refs.wallpaper.showImage(index)
            },
            show_icon(index) {
                this.$refs.icon.showImage(index)
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
        display: inline-block;
        width: auto;
        margin-left: 25%;
        height: 8vw;
        position: relative;
        top: -4vw;
        border-radius: 50%;
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
        border-radius: 50%;
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
