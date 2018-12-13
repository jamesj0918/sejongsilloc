<template lang="html">
  <div id="MainLayoutWrap">
    <div id="header">
        <search-form></search-form>
    </div>
    <div id = "body">
      <div id = "sidebar">
        <sidebar></sidebar>
      </div>
        <div id = "contents" @click="closeNav">
          <router-view></router-view>
        </div>
      <div id = "rankNaviLayout">
        <rank-navi id="rankNavi"></rank-navi>
      </div>
    </div>
  </div>
</template>

<script>
    import SearchForm from './SearchForm'
    import Sidebar from './sidebar/SidebarLayout.vue'
    import RankNavi from './rank/RankNavi.vue'

    export default {
        components: {
            'search-form' : SearchForm,
            'sidebar' : Sidebar,
            'rank-navi' : RankNavi,
        },
        methods: {
            closeNav(){
                if(this.$store.state.sidebar.open===true){
                    this.$store.state.sidebar.open = false
                }
            }
        },
    }
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  font-family: "Noto Sans KR";
}
#MainLayoutWrap{
  height: 100vh;
  overflow: hidden;
  background: #f8f8f8;
}
#body{
  width: 80%;
  margin: 0 auto;
  height: 92vh;
}


#header {
  width: 100%;
  height: 8vh;
  max-height: 50px;
  background-color: #ab2631;
}

#sidebar{
  display: inline-block;
  width: 20%;
  float : left;
  height: 100%;
}
#contents{

  display: inline-block;
  width: 60%;
  height: 100%;
}
  #rankNaviLayout{
    display:inline-block;
    width: 20%;
    height: 100%;
    float: right;
  }

  #rankNavi{
    display: inline-block;
    width :90%; height: auto;
    margin-top: 10vh;
    margin-left: 10%;
    padding-top: 10px;
    border: solid 1px rgba(196, 196, 196, 0.5);
    border-radius: 7px;
    background-color: white;
  }

    @media all and (max-width:640px){
        #body{
            width: 100%;
        }
        #contents{
            width: 100%;
        }
        #sidebar{
            position: fixed;
            width: 70%;
            left: -100%;
            height: 100%;
            transition: .7s;
            backface-visibility: hidden;
            z-index: 1000;
        }
        #rankNavi{
            display: none;
        }
    }





</style>
