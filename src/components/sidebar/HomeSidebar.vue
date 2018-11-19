<template>
    <div id="homeSidebarWrap">
        <div id="homeProfileCard">
            <home-profile-card></home-profile-card>
        </div>
        <div id="homeBtn">
            <div class="buttonWrap">
                <router-link tag="button" to="/subscription" style="cursor:pointer" type="button" name="button">내가 구독한 실록</router-link>
            </div>
            <div class="buttonWrap">
                <button style="cursor:pointer" type="button" name="button">프로필 수정</button>
            </div>
            <div class="buttonWrap">
                <router-link tag="button" to="/createchannel" style="cursor:pointer" type="button" name="button">실록 생성</router-link>
            </div>

        </div>

    </div>
</template>

<script>
    import HomeProfileCard from './HomeProfileCard'
    export default{
        components:{
            'home-profile-card': HomeProfileCard,
        },

    }

</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        cursor: default;
    }

    #homeSidebarWrap {
        width: 100%; height: 100%;
    }

    #homeProfileCard {
        width: 100%;
        height: 20vw;
    }

    .buttonWrap{
        width: 100%;
        text-align: center;
    }

    button{
        display: inline;
        width: 70%;
        height: 30px;
        margin: 0 auto;
        font-size: 14px;
        color: white;
        margin-top: 5%;
        background: none;
        outline: none;
        border-style: none;
        font-weight: bold;
    }
    button:hover{

        box-shadow: 0 0 10px #8c151f;
        border-radius: 5px;
    }

    @media all and (max-width:1024px){
        button {
            font-size: 0.8em;
        }
    }

    @media all and (max-width:640px){
        #homeProfileCard {
            height: 80vw;
        }

        button {
            font-size: 1.2rem;
        }
    }
</style>