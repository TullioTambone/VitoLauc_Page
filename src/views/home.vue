<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination } from 'vue3-carousel';
import { store } from '../store';
export default{
    components: {
        Carousel,
        Slide,
        Pagination,
    },
    data(){
        return{
            store
        }
    }
}
</script>

<template>
    <div class="container-fluid">
        <Carousel :autoplay="6000" :wrap-around="true">
            <Slide v-for="e in this.store.wrapperFolders" :key="e">
                <RouterLink :to="{ name: 'work'}" @click="store.currentIndex = e.index">
                    <img :src="`${store.wrapperFolderPath}${e.folder}/${e.cover}`">
                </RouterLink>
            </Slide>
        </Carousel>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/main.scss';
.container-fluid{
    padding: 0;
    margin: 0;
    height: 100vh;
    width: 100%;
    position: relative;
    div{
        ol{
            img{
                height: 100vh;
                width: 100vw;
                object-fit: cover;
            }
        }
    }

}
</style>