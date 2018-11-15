<template>
    <div id="SinglePostViewWrapper">
        <div id="SinglePostViewWrap">
            <post-article></post-article>
            <post-comment></post-comment>
        </div>
    </div>

</template>

<script>
    import Article from './Article'
    import Comment from './Comment'
    export default {
        name: "SinglePostView",
        components:{
            'post-article': Article,
            'post-comment': Comment,
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        font-family: "Noto Sans KR";
    }

    #SinglePostViewWrapper{
        height: 91vh;
        overflow-y: scroll;
    }

    #SinglePostViewWrap {
        width: 97%; height: auto;
        margin: 0 auto;
        margin-top: 3%;
        background-color: white;
        border-radius: 10px;
        padding: 2% 3%;
    }
</style>