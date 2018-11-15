<template>
    <div id="HomeLayoutWrap">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "HomeLayout",
        mounted(){
            this.$store.dispatch('SET_SIDEBAR', this.$route.path)
                .then(()=>{

                })
        }
    }
</script>

<style scoped>
    #HomeLayoutWrap {
        width: 100%; height: 91vh;

    }
</style>