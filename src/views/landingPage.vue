<script >
export default{
    data() {
        return{
        }
    },
    mounted() {
        const container = this.$refs.parallaxContainer;
        container.addEventListener('mousemove', this.handleMouseMove);
    },
    beforeUnmount() {
        const container = this.$refs.parallaxContainer;
        container.removeEventListener('mousemove', this.handleMouseMove);
    },
    methods: {
        handleMouseMove(event) {
            const containerRect = this.$refs.parallaxContainer.getBoundingClientRect();
            const mouseX = event.clientX - containerRect.left;
            const mouseY = event.clientY - containerRect.top;

            const layers = document.querySelectorAll('.layer');

            layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const x = (mouseX - containerRect.width / 2) * speed / 100;
            const y = (mouseY - containerRect.height / 2) * speed / 100;

            layer.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    }
}
</script>

<template>
    <div class="container-fluid" ref="parallaxContainer">
        <RouterLink to="/home">
            <div id="eye" class="layer" data-speed="2">
                <div class="cover"></div>
                <img src="/img/occhio.png" alt="" id="occhio">
                <img src="/img/iride.png" id="iride" class="layer" data-speed="3" alt="">
            </div>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
@import '../style/main.scss';

.container-fluid{
    height: 100vh;
    width: 100%;
    max-width: 100%;
    @include center;
    background-color: $beige;
    #eye{
        position: relative;
        @include center;
        background-color: $beige;
        z-index: 99999;
        .cover{
            position: absolute;
            z-index: 1;
            width: 280px;
            height: 240px;
            border: 60px solid $beige;
        }
        img{
            position: absolute;
            display: block;
        }
        #occhio{
            width: 250px;
            z-index: 99;
            //filter: brightness(150%);
        }
        #iride{
            width: 230px;
            z-index: 0;
        }
    }
}

@media screen and (min-width: 575px) {
    .container-fluid{
        #eye{
            #occhio{
            width: 300px;
            }
            #iride{
                width: 280px;
            }
        }
    } 
}

@media screen and (max-width: 430px) {
    .container-fluid{
        #eye{
            animation: eyeMove 6s infinite;
            #iride{
                animation: pupillaMove 6s infinite;
            }
        }
    }
}

@keyframes eyeMove {
    0% {
        transform: translate(0px, 0px);
    }
    20% {
        transform: translate(3px, 3px);
    }
    40% {
        transform: translate(-7px, 7px);
    }
    60% {
        transform: translate(10px, -2px);
    }
    80% {
        transform: translate(-2px, -6px);
    }
    100% {
        transform: translate(0px, 0px);
    }
}

@keyframes pupillaMove {
    0% {
        transform: translate(0px, 0px);
    }
    20% {
        transform: translate(5px, 5px);
    }
    40% {
        transform: translate(-10px, 10px);
    }
    60% {
        transform: translate(15px, -5px);
    }
    80% {
        transform: translate(-5px, -10px);
    }
    100% {
        transform: translate(0px, 0px);
    }
}
</style>