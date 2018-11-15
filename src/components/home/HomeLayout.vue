<template>
    <div id="HomeLayoutWrapper">
        <div id="HomeLayoutWrap">
            <router-view></router-view>
        </div>
    </div>

</template>

<script>
    export default {
        name: "HomeLayout",
        mounted(){
            this.$store.dispatch('SET_SIDEBAR', this.$route.path)
        }
    }
</script>

<style scoped>
    #HomeLayoutWrap {
        width: 100%; height: auto;
    }

    #HomeLayoutWrapper{
        height: 91vh; overflow-y: scroll;
    }
</style>