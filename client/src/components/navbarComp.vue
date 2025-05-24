<script>
import 'animate.css';

export default{
    name:'navbarComp',
    props: ['mario'],
    data(){
        return{}
    },
    mounted(){
        this.nav = document.querySelector('#nav');
    },
    beforeMount(){
        if(this.$route.name == 'works' || this.$route.name == 'work'){
            this.changeBackroundBlack()
        }
    },
    watch:{
        mario(value){
            this.showUnShow(value)
        }
    },
    methods:{
        changeBackroundBlack(){
            let bar = document.querySelector('#bar');
            bar.style.backgroundColor= 'rgba(0,0,0,0.8)';
            bar.style.transition= '1500ms linear';
        },
        changeBackroundNormal(){
            let bar = document.querySelector('#bar');
            bar.style.backgroundColor= 'rgba(0,0,0,0.08)';
            bar.style.transition= '1500ms linear';
        },
        showUnShow(event){
            if(event){
                this.nav.classList.remove("animate__fadeInUp");
                this.nav.classList.add("animate__fadeOutDown");
            }else{
                this.nav.classList.remove("animate__fadeOutDown");
                this.nav.classList.add("animate__fadeInUp");
            }
        }
    }
}

</script>

<template>
<aside id="bar" class="animate__animated animate__fadeInRight">
    <div>
        <ul>
            <li>
                <RouterLink to="/home" @click="changeBackroundNormal()">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/works" @click="changeBackroundBlack()">Works</RouterLink>
            </li>
            <li>
                <RouterLink to="/contact" @click="changeBackroundBlack()" >Contact</RouterLink>
            </li>
        </ul>
    </div>
</aside>

<nav id="nav" class="animate__animated animate__fadeInUp" @mario="showUnShow">
    <div>
        <ul>
            <li>
                <RouterLink to="/home">Home</RouterLink>
            </li>
            <li>
                <RouterLink to="/works">Works</RouterLink>
            </li>
            <li>
                <RouterLink to="/contact">Contact</RouterLink>
            </li>
        </ul>
    </div>
</nav>
</template>

<style lang="scss" scoped>
@import '../style/partials/_mixin.scss';
@import '../style/main.scss';
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
aside{
    height: 100vh;
    width: 150px;
    position: fixed;
    right: 0;
    z-index: 99999999999999999999999999999999999999999999999;
    background-color: rgba($color: #000000, $alpha: 0.08);
    div{
        height: 100%;

        ul{
            padding: 50% 0;
            height: 100%;
            
            
            li{
                width: 100%;
                a{
                    display: block;
                    width: 100%;
                    box-shadow: inset 0 0 0 0 #54b3d6;
                    color: white;
                    
                    padding: 0 1rem;
                    transition: color .3s ease-in-out, box-shadow .3s ease-in-out;
    
                    &:hover{
                        box-shadow: inset 150px 0 0 0 rgba($color: #000000, $alpha: 0.4);
                        color: white;
                    }
                }
            }
        }
    }
}

nav{
    display: none;
    width: 100%;
    height: 10vh;
    position: fixed;
    z-index: 99999999999999999999999999999999999999999999999;
    bottom: 0;
    div{
        width: inherit;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.5);
        ul{
            height: 100%;
            padding: 0;
            display: flex;
            justify-content: space-around;
            align-items: center;
            li{
                width: 100%;
                text-align: center;
                a{
                    display: block;
                    width: 100%;
                    color: white;
                    &:hover{
                        animation: colori 0.5s linear;
                    }
                }
            }
        }
    }
}

@keyframes colori{
    0%{
        color: cyan;
    };
    50%{
        color: black;
    }
    100%{
        color: white;
    }
}

@media screen and (max-width:430px){
    aside{
        display: none;
    }
    nav{
        display: flex;
    }
}
</style>