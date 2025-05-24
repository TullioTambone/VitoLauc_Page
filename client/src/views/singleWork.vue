<script>
import 'animate.css';
import { store } from '../store';
export default{
    name: 'singleWork',
    props: ['content'],

    data(){
        return {
            singleContent: {},
            store,
        }
    },
    mounted(){
        this.singleContent = this.store.wrapperFolders[store.currentIndex];
    }
}
</script>

<template>
    <div class="single-w">
        <div class="row">
            <h1>{{ this.singleContent.title }}</h1>
            <div class="cont-img col-4" v-for="e in this.singleContent.images" :key="e">
                <img :src="`${store.wrapperFolderPath}${this.singleContent.folder}/${e}`" alt="">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/main.scss';

.single-w{
    overflow-y: auto;
    padding: 0.5rem;
    height: 100vh;
    .row{
        width: calc(100% - 150px);
        margin: 0;
        .cont-img{
            padding: 0;
            width: 100%;
            img{
                width: 100%;
             //     height: 100%;
                aspect-ratio: 1;
                display: block;
                object-fit: contain;
            }
        }
    }
}

@media screen and (max-width: 430px) {
    .single-w{
        .row{
            width: 100%;
            gap: 0.5rem;
        }
    }
}
</style>
