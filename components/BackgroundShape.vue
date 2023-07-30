<script lang="ts" setup>

const props = defineProps({
  index: Number,
})

const random = Math.floor(Math.random() * (10 - 0 + 1) + 0)
const radius = (random > 5) ? '50%' : '0%';

const min = 250
const max = 500

var posX = useState(`posx-${props.index}`, () => Math.floor(Math.random() * (document.body.clientWidth - 0 + 1) + 0)) 
var posY = useState(`posy-${props.index}`, () => Math.floor(Math.random() * ((document.body.clientHeight * 1.7 - max) - 0 + 1) + 0))


const size = Math.floor(Math.random() * (max - min + 1) + min)

var hue = Math.floor(Math.random() * 360);
var color = 'hsl(' + hue + ', 100%, 85%)';

const repos = () => {
  posX.value = Math.floor(Math.random() * (document.body.clientWidth - 0 + 1) + 0)
  posY.value = Math.floor(Math.random() * ((document.body.clientHeight * 1.7 - max) - 0 + 1) + 0)
}

setInterval(() => {
  repos();
}, 10000)
setTimeout(() => {
  repos();
}, 1000);
</script>

<template>
  <div class="bg-shape-container">
    <div class="bg-shape" :style="`border-radius: ${radius}; transform: translateX(${posX}px) translateY(${posY}px); background-color: ${color}; width: ${size}px; height: ${size}px;`"></div>
  </div>
</template>