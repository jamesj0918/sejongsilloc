<template>
    <div id="ImageView">
        <div id="imageWrap">
            <div class = "image" v-for="image in image_data ">
                <img :src="url+image.image"/>
            </div>
            <div id="moreBtn"><div id="moreBtnContent">+ 더보기</div></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ImageView",
        props: ['image_data'],
        data(){
            return{
                url: 'https://sejongapi-v2.herokuapp.com',
            }
        },
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }

    #ImageView {
        width: 100%;
    }

    #imageWrap {
        width: 100%;
    }

    .image {
        width: 8vw; height: 8vw;
        margin-right: 3px;
        border: solid 1px lightgray;
        line-height: 8vw;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
    }

    img {
        width: 80%;
        vertical-align: middle;
    }

    #moreBtn {
        width: 8vw; height: 8vw;
        line-height: 8vw;
        text-align: center;
        color: #8c151f;
        vertical-align: middle;
        display: inline-block;

    }

    #moreBtnContent {
        vertical-align: middle;
        font-size: 13px;
        font-weight: bold;
    }
</style>
