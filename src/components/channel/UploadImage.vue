<template>
    <div>
        <input type="file" @change="add_images($event)" value="" name="upload[]" multiple>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "UploadImage",
        props:['bus', 'post_pk'],
        data(){
            return{
                images: [],
                image_pk: []
            }
        },
        mounted(){
            this.bus.$on('createImage', this.submit_image);
        },
        methods: {
            add_images(event){
                for (let i=0; i<event.target.files.length; i++) {
                    let image = new FormData();
                    image.append('image', event.target.files[i]);
                    this.images.push(image);
                }
            },
            async submit_image(post_pk) {
                for (let i=0; i<this.images.length; i++) {
                    await axios.post('addon/image/', this.images[i], {
                        headers:{
                            'Content-Type': 'multipart/formdata; charset=utf-8;boundary=${image_boundary}',
                            'Authorization': 'JWT '+ localStorage.getItem('token')
                        }
                    })
                        .then((response)=>{
                            this.image_pk.push(response.data.id);
                        })
                }
                const patch_data = {
                    image : this.image_pk
                };
                await axios.patch('post/'+post_pk+'/', patch_data);
            }
        }
    }
</script>

<style scoped>

</style>
