<template>
    <div>
        <h3>투표</h3>
        <div>{{vote.title}}</div>
        <div>{{vote.description}}</div>
        {{vote.max_responses}}
        <div v-if="vote.max_responses == 1">중복 불가능</div>
        <div v-else>중복 가능</div>

        <div>
            <ul>
                <li v-for="(choice,index) in sortArrays">
                    <input type="checkbox"
                           :id="index"
                           :value="choice.id"
                           v-model="checked_choices">
                    <label :for="index">{{choice.content}}</label>
                </li>
            </ul>
        </div>
        {{checked_choices}}
        <button @click="submitVote">투표</button>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "BeforeVote",
        props: ['vote'],
        data(){
            return{
                vote_title: '',
                vote_description: '',
                checked_choices:[],
            }
        },
        mounted(){

        },
        methods:{
            submitVote(){

                for(let i=0;i<this.checked_choices.length;i++){
                     axios.post('/addon/vote/'+this.vote.id+'/'+this.checked_choices[i]+'/')
                }
                this.$emit('vote_submit');

            }
        },
        computed:{
            sortArrays: function() {
                return  _.orderBy(this.vote.choices, 'id');
            },
        }
    }
</script>

<style scoped>

</style>
