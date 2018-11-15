<template>
    <div id="ChannelLayoutWrap">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "ChannelLayout",
        mounted(){
            this.$store.dispatch('SET_SIDEBAR', this.$route.path)
        }
    }
</script>

<style scoped>
    #ChannelLayoutWrap {
        width: 100%;
        height: 92vh;
    }

</style>