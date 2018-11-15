<template>
    <div id="sidebarWrap">
      <channel-sidebar v-if="!home"></channel-sidebar>
        <home-sidebar v-else></home-sidebar>
    </div>
</template>

<script>
    import ChannelSidebar from './ChannelSidebar.vue'
    import HomeSidebar from './HomeSidebar.vue'

    export default{
        data(){
            return {
                home: this.$store.state.sidebar.home,
                path: this.$route.path,
                open: false,
            }
        },
        methods:{
            openNav(){
                document.getElementById("sidebar").style.left = "0%";
            },
            closeNav(){
                document.getElementById("sidebar").style.left = "-100%";
            }
        },
        components:{
            'channel-sidebar' : ChannelSidebar,
            'home-sidebar' : HomeSidebar,
        },
        computed: {
            getPath (){
                return this.$store.state.sidebar.home;
            },
            openSidebar(){
                return this.$store.state.sidebar.open;
            },
        },
        watch:{
            getPath(home){
                this.home = home;
            },
            openSidebar(open){
                this.open = open;
                if(open===true){
                    this.openNav();
                }
                else{
                    this.closeNav();
                }
            }
        }
    }

</script>

<style scoped>
#sidebarWrap{
    background-color: #ab2631;
    width: 100%;
    height: 92vh;

}

@media all and (max-width:640px){
    #sidebarWrap{
        left: -100%;
        overflow-y: scroll;
    }

}

</style>