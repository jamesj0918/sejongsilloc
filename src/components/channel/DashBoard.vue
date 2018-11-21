<!--suppress HtmlFormInputWithoutLabel, SpellCheckingInspection -->
<template>
    <div>
        <vue-tabs
            direction="vertical"
            active-tab-color="#8c151f"
            active-text-color="white">
            <v-tab title="프로필 및 배경사진"> 사진 변경 (아직 안됨) </v-tab>
            <v-tab title="실록 이름">
                실록 이름 변경
                <br>
                <input v-model="channel_name">
            </v-tab>
            <v-tab title="실록 설명">
                실록 설명 변경
                <br>
                <input v-model="channel_description">
            </v-tab>
            <v-tab title="실록 규칙">규칙 (아직 안됨) </v-tab>
        </vue-tabs>
        <hr>
        <vue-tabs
            direction="vertical"
            active-tab-color="#8c151f"
            active-text-color="white">
            <v-tab title="구독자 목록">
                <div v-if="channel_subscribers.length === 0">구독자가 없어용 ㅎㅎ 너무 아쉽네 ;-;</div>
                <div v-else v-for="subscriber in channel_subscribers">
                    {{subscriber.username}}
                    <button @click="add_to_blacklist(subscriber); delete_from_array(channel_subscribers, subscriber.id);"> 차단 </button>
                    <br>
                </div>
            </v-tab>
            <v-tab title="차단 목록">
                <div v-if="channel_blacklist.length === 0">차단된 사용자가 없어용 ㅎㅎ</div>
                <div v-else v-for="blacked_user in channel_blacklist">
                    {{blacked_user.username}}
                    <button @click="delete_from_array(channel_blacklist, blacked_user.id)"> 차단 해제 </button>
                </div>
            </v-tab>
            <v-tab title="관리자 목록">
                <div v-for="moderator in channel_moderators">
                    {{moderator.username}}
                    <button @click="delete_from_array(channel_moderators, moderator.id)"> 관리자 삭제 </button>
                </div>
            </v-tab>
        </vue-tabs>
        <button style="cursor:pointer" @click="update_channel()"> 적용 </button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "DashBoard",
        data(){
            return{
                channel_name: "",
                channel_description: "",
                channel_id: this.$route.params.channelID,
                channel_subscribers: [],
                channel_blacklist: [],
                channel_moderators: []
            }
        },
        mounted(){
            axios.get('channel/'+this.$route.params.channelID+'/')
                .then((response)=>{
                    this.channel_name = response.data.name;
                    this.channel_description = response.data.description;
                    this.channel_subscribers = response.data.subscribers.slice();
                    this.channel_blacklist = response.data.blacklist.slice();
                    this.channel_moderators = response.data.moderators.slice();
                });
        },
        methods: {
            update_channel(){
                let channel_data = {
                    name: this.channel_name,
                    description: this.channel_description,
                    subscribers: [],
                    moderators: [],
                    blacklist: []
                };
                this.convert_array(channel_data.subscribers, this.channel_subscribers);
                this.convert_array(channel_data.moderators, this.channel_moderators);
                this.convert_array(channel_data.blacklist, this.channel_blacklist);
                axios.patch('channel/'+this.$route.params.channelID+'/', channel_data);
                this.$router.replace('/'+this.$route.params.channelID);
            },
            delete_from_array(array, id){
                if (array === this.channel_moderators && array.length === 1) alert('관리자가 최소 1명은 있어야 합니다.');
                else {
                    let delete_index, i;
                    for (i=0; i<array.length; i++){
                        if(array[i].id === id){
                            delete_index = i;
                            break;
                        }
                    }
                    array.splice(delete_index, 1);
                }
            },
            convert_array(to_array, from_array){
                for (let i=0; i<from_array.length; i++){
                    to_array.push(from_array[i].id);
                }
            },
            add_to_blacklist(subscriber){
                this.channel_blacklist.push(subscriber);
            }
        },
    }
</script>

<style scoped>

</style>