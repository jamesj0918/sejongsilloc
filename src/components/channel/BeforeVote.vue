<template>
    <div>
        <h3>투표</h3>
        <div>{{vote.title}}</div>
        <div>{{vote.description}}</div>
        <div v-if="vote.max_responses === 1">중복 불가능</div>
        <div v-else>중복 가능</div>

        <div>
            <ul>
                <li v-for="choice in vote.choices">
                    {{choice.content}}
                </li>
            </ul>
        </div>

        <button>투표</button>

    </div>
</template>

<script>
    export default {
        name: "BeforeVote",
        props: ['vote'],
        data(){
            return{
                vote_title: '',
                vote_description: '',
            }
        },
        mounted(){
            console.log("vote",this.vote);

        }
    }
</script>

<style scoped>

</style>
