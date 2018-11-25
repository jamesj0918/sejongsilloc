<template>
    <div>
        <div>
            {{vote_result.title}}
            {{vote_result.description}}
            {{vote}}}

            <div>
                <ul>
                    <li v-for="(choice,index) in sortArrays"  v-if="sortUserPick[index]" :class="{isVoted: sortUserPick[index].picked}">
                         {{choice.id}}. {{choice.content}} {{choice.counts}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import _ from 'lodash'
    export default {
        name: "AfterVue",
        props: ['vote'],
        data(){
            return{
                vote_result: [],
                user_pick: [],
                user_pick_sort: [],
                user_pk: localStorage.getItem("user_pk"),
            }
        },
        mounted(){
            axios.get('addon/vote/'+this.vote.id+'/')
                .then((response)=>{
                    this.vote_result = response.data;
                    for(let i = 0;i<this.vote_result.choices.length;i++){
                        axios.get('addon/vote/'+this.vote_result.id+'/'+this.vote_result.choices[i].id+'/responder/')
                            .then((response)=>{
                                if(response.data.find(c => c.id == this.user_pk)){
                                    this.user_pick.push({id: this.vote_result.choices[i].id, picked: true});
                                }
                                else{
                                    this.user_pick.push({id: this.vote_result.choices[i].id, picked: false});
                                }
                            })
                    }
                });
        },
        computed:{
            sortArrays: function() {

               return  _.orderBy(this.vote_result.choices, 'id');
            },
            sortUserPick: function(){
                return _.orderBy(this.user_pick, 'id');
            }
        },
    }
</script>

<style scoped>

    *{
        margin: 0;
        padding: 0;
    }

    .isVoted{
        background-color: lightcyan;
    }
</style>
