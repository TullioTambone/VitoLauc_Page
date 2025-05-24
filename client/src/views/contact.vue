<script>
import { store } from '../store';
export default {
    name: 'contact',
    data(){
        return{
            store,
        }
    },
    mounted() {
        this.slidingShit();
    },
    methods: {
        slidingShit() {
            let slider = document.querySelector('.wordSlider');
            let prevWidth = 0;
            store.wrapperFolders.forEach((e, i) => {
                let d = document.createElement('div');
                d.setAttribute('class', 'word');
                d.innerHTML = e.title;
                slider.appendChild(d);
                d.style.position = 'absolute';
                d.style.left = prevWidth + 'rem';
                prevWidth += parseInt(d.getBoundingClientRect().width);
                d.style.animationName = 'slide';
                // console.log(d.style.animationName);
                d.style.animation = (2 + i * 0.5) + 's linear infinite';
            });
        }
    }
};
</script>

<template>
    <div class="my-infos">
        <div id="contact">
            <div class="infos col-12">
                <h1 class="">VITO LAUCIELLO</h1>
                <div class="wordSlider">
                    <!-- <span class="word" v-for="(e,i) in store.wrapperFolders" :key="i">
                        {{e.folder}}
                    </span> -->
                    <!-- <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span>
                    <span class="word">hello</span> -->
                </div>
                <ul class="mt-3">
                    <li>
                        <a href="mailto:tulliotambone97@gmail.com">mail me</a>
                    </li>
                    <li class="my-1">
                        <a href="tel:+393453146440">call me</a>
                    </li>
                    <li>
                        <a href="https://www.google.com/maps/place/Via+Giorgio+la+Pira,+3,+70038+Terlizzi+BA/@41.1339391,16.5503928,17z/data=!3m1!4b1!4m6!3m5!1s0x1347f63c44a54c89:0x5504891c93cc9950!8m2!3d41.1339391!4d16.5503928!16s%2Fg%2F11c21lnssg?entry=ttu">
                            address
                        </a>
                    </li>
                </ul>
            </div>
            <div class="col-12 my-5">
                <ul class="d-flex justify-content-center gap-2">
                    <a href="https://www.instagram.com/vitolauciello_/"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.behance.net/lauciellova66b"><i class="fa-brands fa-behance"></i></a>
                    <a href=""><i class="fa-solid fa-v"></i></a>                                        
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/partials/_mixin.scss';
.my-infos{
    @include center;
    overflow: hidden;
    background-color: rgb(237, 237, 225);
    #contact{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        border: 1px solid blue;
        .wordSlider{
            position: relative;
            width: 100%;
            height: 5vh;
            border: 1px solid red;
            display: flex;
            align-items: center;
            // .word {    
            //     // border: 1px solid green;
            //     margin: 0;
            //     position: absolute;
            //     left: 0;
            //     animation: slide 1s linear infinite;
            // }
        }
        .infos{
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        ul{
            padding: 0;
        }
    }
}

@media screen and (min-width: 991px) {
    .my-infos{
        height: calc(100vh - 72px);
        #contact{
            width: 60%;
        }
    }
}

// @media screen and (max-width: 576px) {
//     .my-container{
//         width: 100%;

//     }
// }

@keyframes slide {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(300%);
    }
}
</style>