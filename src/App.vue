<script >
import navbarComp from './components/navbarComp.vue';
import {store} from './store'

export default{
    name: "App",
    components: { navbarComp },
    data() {
        return {
            store,
            bool:false
        };
    },
    methods: {
        scrollEv() {
            let comp = document.querySelector('#comp');
            comp.addEventListener("scrollend", ()=>{
                if(this.bool){
                    this.bool = false
                }
            });
            if(comp.scrollTop == 0){
                comp.removeEventListener("scroll", this.handleScrollEnd);
                setTimeout(() => {
                    return this.bool = false;
                }, 1500);
                
            }else if(comp.scrollHeight - comp.scrollTop <= comp.clientHeight ){
                this.bool = true
            }
            this.bool = true
        }
    }
  }
</script>

<template>
<RouterView v-slot="{ Component, route }">
        <navbarComp v-if="route.name != 'landingPage'" :mario="this.bool"/>
    <transition :name="route.meta.transition" mode="out-in">
        <component id="comp" :is="Component" @scroll="scrollEv()"/>
    </transition>
</RouterView>
</template>

<style lang="scss">
@import './style/main.scss';
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease-out;
}


.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
    transform: translateY(200px);
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: 0.5s ease-out;
}
</style>
