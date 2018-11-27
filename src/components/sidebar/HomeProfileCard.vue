<template>
    <div id = "homeProfileWrap">
        <div id="homeProfileContainer">
            <div id="imgContainer">
                <div id="bannerWrap">
                    <div v-if="wallpaper_url !== ''"><a :href="wallpaper_url"><img :src="wallpaper_url" class="bannerImg"/></a></div>
                    <div v-else><img src="../../images/universe.jpg" class="bannerImg"></div>
                </div>
                <div id="profileWrap">
                    <div id="profileImgWrap">
                        <div v-if="icon_url !== ''"><a :href="icon_url"><img :src="icon_url" class="profileImg"/></a></div>
                        <div v-else><img src="../../images/moon.jpg" class="profileImg"></div>
                    </div>
                </div>
            </div>
            <div id="informationContainer">
                <div id="usernameWrap"><h3 id="username"> {{username}}</h3></div>
                <div id="followerWrap"><h4 id="follower">{{followers}}명의 팔로워</h4></div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "HomeProfileCard",
        data(){
          return{
              username: '',
              followers: 0,
              icon_url: '',
              wallpaper_url: ''
            }
        },
        mounted(){
            axios.get('profile/')
            .then((response)=>{
                const base_url = 'https://sejongapi-v2.herokuapp.com';
                this.username = response.data.username;
                this.followers = response.data.followed_by;
                this.icon_url = base_url + response.data.icon.image;
                this.wallpaper_url = base_url + response.data.wallpaper.image;
            })
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