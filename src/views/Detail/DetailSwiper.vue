<template>
    <div class="swiper-container filmswiper">
        <div class="swiper-wrapper">
                <slot></slot>
        </div>
        <div class="swiper-pagination film-swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import '_swiper@4.5.0@swiper/dist/css/swiper.css'
export default {
  mounted () {
    // console.log("我是轮播图")
    new Swiper('.filmswiper', {
      loop: true,
      autoplay: {
        delay: 2000
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.filmswiper{
     touch-action: none;
}
.film-swiper-pagination{
    text-align:center;
}
</style>
