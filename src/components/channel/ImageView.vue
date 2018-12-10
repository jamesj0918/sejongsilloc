<template>
    <div id="ImageView">
        <div id="imageWrap">
            <div class="image" v-for="(image, index) in images.slice(0,4)">
                <img style="cursor: pointer" @click="show_image_by_index(index)" v-lazy="url+image.image"/>
            </div>
            <div v-if="images.length>4" id="moreBtn"><div
                    @click="show_image_by_index(4)"
                    style="cursor: pointer"
                    id="moreBtnContent">+ 더보기</div></div>
        </div>
        <LightBox
                :images="image_data"
                ref="lightbox"
                :show-light-box="false"
        ></LightBox>
    </div>
</template>

<script>
    import LightBox from 'vue-image-lightbox'
    export default {
        name: "ImageView",
        props: ['images'],
        components:{
            LightBox,
        },
        data(){
            return{
                url: 'https://sejongapi-v2.herokuapp.com',
                image_data: []
            }
        },
        methods:{
            show_image_by_index(index){
                this.$refs.lightbox.showImage(index);
            },
        },
        mounted(){
            for (let i=0; i<this.images.length; i++){
                this.image_data.push({src: this.url+this.images[i].image, thumb: this.url+this.images[i].image})
            }
        }
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

    #moreBtnContent:hover{
        background-color: rgb(244, 244, 244);
    }
</style>
