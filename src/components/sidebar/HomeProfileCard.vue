<template>
    <div id = "homeProfileWrap">
        <div id="homeProfileContainer" >
            <div id="imgContainer">
                <div id="bannerWrap" style="cursor: pointer" @click="show_wallpaper(0)">
                    <div v-if="wallpaper_url !== ''"><img :src="wallpaper_url" class="bannerImg"/></div>
                    <div v-else><img src="../../images/universe.jpg" class="bannerImg"></div>
                </div>
                <div id="profileWrap">
                    <div id="profileImgWrap" style="cursor: pointer" @click="show_icon(0)">
                        <div v-if="icon_url !== ''"><img :src="icon_url" class="profileImg"/></div>
                        <div v-else><img src="../../images/moon.jpg" class="profileImg"></div>
                    </div>
                </div>
            </div>
            <div id="informationContainer">
                <div id="usernameWrap"><h3 id="username"> {{username}}</h3></div>
                <div id="followerWrap"><h5 id="follower">{{bio}}</h5></div>
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
        name: "HomeProfileCard",
        components: {
            LightBox
        },
        data(){
          return{
              username: '',
              followers: 0,
              icon_url: '',
              wallpaper_url: '',
              wallpaper:[],
              icon:[],
              bio:'',
            }
        },
        mounted(){
            axios.get('profile/')
            .then((response)=>{
                const base_url = 'https://sejongapi-v2.herokuapp.com';
                if(response.data.icon!== null){
                    this.icon_url = base_url + response.data.icon.image;
                }
                if(response.data.wallpaper!== null){
                    this.wallpaper_url = base_url + response.data.wallpaper.image;
                }


                this.username = response.data.username;
                this.followers = response.data.followed_by;
                this.bio = response.data.bio;
                this.icon.push({src: this.icon_url, thumb: this.icon_url});
                this.wallpaper.push({src: this.wallpaper_url, thumb: this.wallpaper_url});
            });
        },
        methods:{
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
        font-family: "Noto Sans KR";
    }

    #homeProfileWrap{
        width:100%; height: 100%;
        padding: 2% 2%;
    }

    #homeProfileContainer{
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
        height: 8vw;
        position: relative;
        overflow: hidden;
        background-color: white;
        vertical-align: center;
    }

    .bannerImg{
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

    .profileImg{
        width: 100%;
    }

    #informationContainer{
        width: 100%; height: 40%;
        padding: 9% 2%;
        text-align: center;
    }

    #usernameWrap {
        width: 100%;
        height: auto; max-height: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bolder;
        margin-bottom: 3%;
    }

    @media all and (max-width:1024px){
        #username{
            font-size: 1rem;
        }

        #follower {
            font-size: 12px;
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

        #username {
            font-size: 1.4rem;
        }
    }

</style>
