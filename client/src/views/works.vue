<script>
import 'animate.css';
import { store } from '../store';

export default{
    name: 'works',
    data(){
        return{
            store
        }
    },
    mounted() {
        if (window.matchMedia("(max-width: 430px)").matches) {
            window.addEventListener('scroll', this.handleScroll);
        }
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods:{
        onIntersect(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__fadeIn');
                }
            });
        }
    }
}
</script>

<template>
    <div class="row">
        <RouterLink 
            :to="{ name: 'work'}" 
            class="col-12 col-md-6 col-lg-4 works" 
            v-for="(e) in this.store.wrapperFolders" 
            :key="e" 
            @click="store.currentIndex = e.index"
        >
            <img
                :src="`${store.wrapperFolderPath}${e.folder}/${e.cover}`" 
                class="carousel__item animate__animated"
                ref="image"
            >
            <div class="title">{{ e.title.toUpperCase() }}</div>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/main.scss';

.row{
    overflow-y: auto;
    margin: 0;
    padding: 0;
    width: calc(100% - 150px);
    height: 100vh;
    .works{
        border:1px solid black;
        padding: 0;
        margin: 0;
        // height: 50vh;
        aspect-ratio: 1;
        position: relative;
        .title{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            // height: 10vh;
            z-index: 9;
            @include center;

            color: white;

            // background: rgb(0,0,0);
            // background: -moz-linear-gradient(0deg, rgba(0,0,0,0.27503501400560226) 100%, rgba(255,255,255,0) 100%);
            // background: -webkit-linear-gradient(0deg, rgba(0,0,0,0.27503501400560226) 100%, rgba(255,255,255,0) 100%);
            // background: linear-gradient(0deg, rgba(0,0,0,0.27503501400560226) 100%, rgba(255,255,255,0) 100%);
            // filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#ffffff",GradientType=1);
        }
        img{
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: center;
        }
        &:hover{
            filter: grayscale(100%);
        }
    }
}

@media screen and (max-width: 430px) {
    .row{
        width: 100%;
    }
}
</style>
