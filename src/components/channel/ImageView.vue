<template>
    <div>
        <div>
            <div id="imageWrap">
                <div id = "image" v-for="image in image_data ">
                    <img :src="url+image.image"/>
                </div>
            </div>
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
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    img{
        width: 80%;
        margin: auto;
    }
    #imageWrap{
        display: inline-block;
        position: relative;
        height: 15vh;
        width: 100%;
        border: 1px solid;
    }
    #image{
        display: block;
        width: 20%;
        height: 15vh;
        border: 1px solid;
    }


</style>
