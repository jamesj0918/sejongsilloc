<template>
    <div id="AfterVote">
        <div id="voteTitle"><h4>{{vote_result.title}}</h4></div>
        <div id="voteDescription">{{vote_result.description}}</div>
        <div id="voteListWrap">
            <ul>
                <li v-for="(choice,index) in sortArrays"  v-if="sortUserPick[index]">
                    <div id="voteList" :class="{isVoted: sortUserPick[index].picked}">
                        <div class="voteContent">{{choice.content}}</div>
                        <span class="voteCounts">{{choice.counts}}</span>
                    </div>
                </li>
            </ul>
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
                vote_page: 1,
                user_pk: localStorage.getItem("user_pk"),
            }
        },
        mounted(){
            this.afterVote();
        },
        methods:{
            afterVote(){
                axios.get('addon/vote/'+this.vote.id+'/')
                    .then((response)=>{
                        this.vote_result = response.data;
                        for(let i = 0;i<this.vote_result.choices.length;i++){
                            axios.get('addon/vote/'+this.vote_result.id+'/'+this.vote_result.choices[i].id+'/responder/?page='+this.vote_page)
                                .then((response)=>{
                                    if(response.data.results.find(c => c.id == this.user_pk)){
                                        this.user_pick.push({id: this.vote_result.choices[i].id, picked: true});
                                    }
                                    else{
                                        this.user_pick.push({id: this.vote_result.choices[i].id, picked: false});
                                    }
                                })
                        }
                    });
            }
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
        cursor: default;
        font-family: "Noto Sans KR";
    }

    ul {
        list-style: none;
    }

    #AfterVote {
        width: 97%; height: auto;
        margin: 0 auto; margin-bottom: 3%; maring-top: 3%;
        padding: 3% 3%;
        border-radius: 10px;
        background-color: white;
        box-shadow: 0px 0px 5px 4px rgba(209, 209, 209, 0.5);
    }

    #voteDescription {
        margin-top: 1%;
        font-size: 1.7vh;
        font-weight: bold;
        color: rgba(79, 79, 79, 0.8);
    }

    #voteListWrap {
        margin-top: 2%;
    }

    #voteList {
        width: 100%;
        margin-top: 0.7%;
        padding: 3px 2%; padding-top: 5px;
        border-radius: 7px;
        border: 1px solid rgba(209,209,209, 1);
        overflow: hidden;
    }

    .voteContent {
        width: calc(100% - 3vh);
        font-size: 1.8vh;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
    }

    .voteCounts {
        font-size: 1.8vh;
        font-weight: bold;
        float: right;
    }

    .isVoted{
        background-color: rgba(206, 41, 56, 0.3);
    }

</style>
