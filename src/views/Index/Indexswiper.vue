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
import 'swiper/dist/css/swiper.min.css'

export default {
  props: ['perview', 'myclassname'],

  mounted () {
    // console.log(this.myclassname)
    this.$nextTick(() => {
      let swiper = new Swiper('.swiper-container', {
        slidesPerView: this.perview,
        spaceBetween: 10,
        freeMode: true
      })
      swiper.allowClick = true
    })
  }

}
</script>

<style lang="scss" scoped>

.swiper-wrapper{

  img{
       height:.97rem;
        width:.97rem;
  }
}

</style>
