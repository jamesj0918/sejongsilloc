<template>
    <div id="VoteCreate">
        <div id="voteCreateHeader">
            <div id="voteCreateTitle" class="contentTitle"><h4>투표 제목</h4></div>
            <input id="voteTitleInput" placeholder="투표 제목을 입력해주세요." v-model="title" style="cursor: text"/>
        </div>
        <div id="voteDescription">
            <div id="voteDescriptionTitle" class="contentTitle"><h4>투표 설명</h4></div>
            <input id="voteDescriptionInput" placeholder="투표 설명을 입력해주세요." v-model="description" style="cursor: text"/>
        </div>
        <div v-for="(choice, index) in choices" >
            <div id="voteList">
                {{index+1}}.
                <input id="voteContentInput" v-model="choice.content" placeholder="선택지를 입력해주세요." style="cursor: text"/>
                <i class="circle minus icon" id="minusIcon" @click="minusChoice(index)" style="cursor: pointer"></i>
            </div>
        </div>
        <i id="plusIcon" class="plus circle icon" @click="addChoice" style="cursor: pointer"></i>
        <div id="mulVotingWrap">
            <div id="mulVoting" >중복 가능</div>
            <input id="checkMulVoting" type="checkbox" v-model="overlab" style="cursor: pointer"/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "VoteCreate",
        props:['bus','post_pk'],
        data() {
            return {
                choices: [{content: ''}],
                title: '',
                description: '',
                choice_count: 1,
                overlab: false,
            }
        },
        mounted(){
          this.bus.$on('createVote', this.createVote);
        },
        methods:{
            addChoice(){
                this.choice_count++;
                this.choices.push({content: ""})
            },
            minusChoice(index){
                if(this.choice_count===1){
                    alert('투표 선택지는 최소 한 개 이상이어야 합니다.');

                    return;
                }
                this.choice_count--;
                this.choices.splice(index,1)
            },
            createVote(post_id){
                if(this.overlab === false){
                    this.choice_count = 1;
                }
                const vote_data={
                    choices: this.choices,
                    title: this.title,
                    description: this.description,
                    max_responses: this.choice_count,
                };

                axios.post('addon/vote/',vote_data)
                    .then((response)=>{
                        const patch_data={
                            vote: [""+response.data.id],
                        };
                        axios.patch('post/'+post_id+'/',patch_data)
                    })
            }

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

    input {
        outline: 0;
        font-size: 12px;
        font-weight: bold;
        padding: 5px 5px;
        background-color: rgba(242,242,242,0.6);
        border-color: rgba(169,169,169,0.1);
        border-width: 1px;
        border-radius: 7px;
    }

    input:focus {
        outline: none;
    }

    input::placeholder {
        color: rgba(169, 169, 169, 1);
        font-size: 12px;
        font-weight: lighter;
    }

    input:focus::placeholder {
        color: rgba(169, 169, 169, 0.6);
    }

    #VoteCreate {
        width: 97%; height: auto;
        margin: 0 auto;
        padding: 3%;
        background-color: white;
        border-radius: 10px;
    }

    #voteCreateHeader {
        width: 100%;
        margin-bottom: 2%;
    }

    .contentTitle {
        color: #565656;
        margin-bottom: 1%;
    }

    #voteTitleInput {
        width: 100%;
    }

    #voteDescription {
        width: 100%;
        margin-bottom: 3%;
    }

    #voteDescriptionInput {
        width: 100%;
    }

    #voteList {
        width: 100%;
        margin-bottom: 3px;
    }

    #voteContentInput {
        width: calc(100% - 17px - 2px - 17px);
    }

    #minusIcon {
        margin-right: 0;
        margin-top: 2px;
        float: right;
        color: darkred;
    }

    #plusIcon {
        margin-left: 14px; margin-top: 4px;
        color: green;
    }

    #mulVotingWrap {
        height: 20px;
    }

    #checkMulVoting {
        margin-top: 5px; margin-right: 2px;
        display: inline-block;
        float: right;
    }

    #mulVoting {
        margin-top: 1px;
        display: inline-block;
        color: #565656;
        font-size: 11px;
        font-weight: bold;
        float: right;
    }

</style>
