<template>
    <div id="BeforeVote">
        <div id="voteTitle"><h4>{{vote.title}}</h4></div>
        <span class="isMulVoting" v-if="vote.max_responses == 1">( 중복 불가능 )</span>
        <span class="isMulVoting" v-else>| 중복 가능</span>
        <div id="voteDescription">{{vote.description}}</div>

        <div id="voteListWrap">
            <ul>
                <li v-for="(choice,index) in sortArrays">
                    <div class="container">

                        <input class="voteCheck"
                               v-if="max_responses !== 1"
                               type="checkbox"
                               :name="index"
                               :id="index"
                               :value="choice.id"
                               v-model="checked_choices"/>
                        <input class="voteCheck"
                               v-else
                               type="radio"
                               name="vote"
                               :id="index"
                               :value="choice.id"
                               v-model="checked_choices"/>
                        <div class="voteList" >
                            <label :for="index" class="labelWrap" style="cursor: pointer">
                                <div class="checkWrap"><i class="check icon"></i></div>
                                <span class="voteContent">{{choice.content}}</span>
                            </label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div id="voteBtnWrap">
            <button id="voteBtn" @click="submitVote" style="cursor: pointer">투표하기</button>
        </div>
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
                max_responses: 1,
            }
        },
        mounted(){
            console.log(this.vote);
            this.max_responses = this.vote.max_responses;
        },
        methods:{
            submitVote(){
                for(let i=0;i<this.checked_choices.length;i++){
                    axios.post('/addon/vote/'+this.vote.id+'/'+this.checked_choices[i]+'/')
                        .then((response)=>{
                            if(i == this.checked_choices.length-1){
                                this.$emit('vote_submit');
                            }
                        })
                }



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

    *{
        margin: 0;
        padding: 0;
        cursor: default;
        font-family: "Noto Sans KR";
    }

    ul {
        list-style: none;
    }

    #BeforeVote {
        width: 97%; height: auto;
        margin: 0 auto; margin-bottom: 3%; maring-top: 3%;
        padding: 3% 3%;
        border-radius: 10px;
        background-color: white;
        box-shadow: 0px 0px 5px 4px rgba(209, 209, 209, 0.5);
    }

    #voteTitle {
        margin-right: 1%;
        display: inline-block;
    }

    .isMulVoting {
        font-size: 1.5vh;
        font-weight: 600;
        color: #8c151f;
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

    .voteList {
        width: 100%;
        margin-top: 0.7%;
        border-radius: 7px;
        border: 1px solid rgba(209,209,209, 1);
        overflow: hidden;
        background-color: rgba(209, 209, 209, 0.1);
    }

    .voteCheck {
        display: none;
    }

    .container input:checked ~ .voteList {
        background-color: rgba(79, 79, 79, 0.2);
    }

    .checkWrap {
        width: 4%;
        margin-right: 2%;
        margin-top: 5px;

        display: none;
    }

    .container input:checked ~ .voteList .labelWrap .checkWrap {
        width: 4%;
        margin-right: 2%;
        margin-top: 5px;
        float: right;
        font-size: 2vh;
        font-weight: bold;
        color: rgba(79, 79, 79, 0.6);
        display: inline-block;
    }

    .voteContent {
        width: calc(100% - 4% - 4%);
        margin: 5px 0 3px 2%;
        font-size: 1.8vh;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
    }

    #voteBtnWrap {
        width: 100%; height: 25px;
        margin-top: 3%;
    }

    #voteBtn {
        width: 90px; height: 25px;
        margin-left: calc((100% - 90px) / 2);
        border: none;
        border-radius: 5px;
        font-weight: bolder;
        outline: none;
        color: white;
        background-color:#8c151f;

    }


</style>
