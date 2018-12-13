<template>
    <div>
        <div>
            <h3>추천 실록</h3>
        </div>
        <div>
            <ul>
                <li v-for="(channel,id) in channel_list" @click="link_to_channel(channel.slug)">
                    {{id+1}}위 {{channel_list[id].name}}
                </li>
            </ul>

        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "RankNavi",
        data(){
            return {
                channel_list: [],
            }
        },
        mounted(){
            axios.get('channel/?page=1')
                .then((response)=>{
                    console.log(response);
                    for(let i=0;i<4;i++){
                        this.channel_list.push(response.data.results[i]);
                    }
                    console.log(this.channel_list);
                })
        },//mounted
        methods: {
            link_to_channel(object){
                this.$router.push('/'+object);
            }
        }

    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    li{
        list-style: none;
    }

</style>
