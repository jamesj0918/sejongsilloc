<template>
    <div>
        <div>
            <h3>투표 제목</h3>
            <input placeholder="투표 제목을 입력해주세요." v-model="title"/>
        </div>
        <div>
            <h3>투표 설명</h3>

            <input placeholder="투표 설명을 입력해주세요." v-model="description"/>
        </div>
        <div v-for="(choice, index) in choices" >
            <div>
                {{index+1}}.
                <input v-model="choice.content" placeholder="선택지를 입력해주세요."/>
                <i class="grey circle minus icon" @click="minusChoice(index)"></i>
            </div>

        </div>
        <i class="plus circle icon" @click="addChoice"></i>
        <input type="checkbox" v-model="overlab" /> 중복 가능
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
          this.bus.$on('createVote',this.createVote);
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

</style>
