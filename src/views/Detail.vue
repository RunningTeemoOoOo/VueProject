<template>
    <div>
        <div class="back" @click="goBack()"><span class="el-icon-arrow-left"></span></div>
        <swiper :key="datalist.length" ref="myswiper">
            <div class="swiper-slide" v-for="data in datalist" :key="data.id">
                <img :src="data.url" alt="">
            </div>
        </swiper>
        <div class="more">
            <div class="bookname">
            <div class="title">     <div class="tianmao" v-if="morelist.platform===2">
                    <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAvCAYAAABuWa03AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDY0QjJFNzU2Qjk4MTFFNzkwM0FCMTk4NkYzMUM3RTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDY0QjJFNzY2Qjk4MTFFNzkwM0FCMTk4NkYzMUM3RTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENjRCMkU3MzZCOTgxMUU3OTAzQUIxOTg2RjMxQzdFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENjRCMkU3NDZCOTgxMUU3OTAzQUIxOTg2RjMxQzdFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu3eOnMAAASVSURBVHja7FxNaNRAFJ6ui+Ax+C+IkoMevAi5iCJ4yKLgQVS2qNCT2D2IiIh2LehNzeJd2MWDp6IuInpQsQFFUQSNJxVFG6woepAGPahorb4hL3YIm2lmMrtJ2nzwsds0nUy+vHk/mZn2nR0+SiIwD7gRuB64HLiQFODhO/AD8C3wLvBbp5PKEccOAIeBk0Ab+B7oFppy0QdcCewHjgBbwNPALzzBVwGvAn8D9wEfFDpKYTXwJPAFsAq8H/yixJy0BAWmFr2pEDsR3gH3o6e4BqyEBS/hLy4D68CpQjMluAHcC7yEVv9f8AHgAhS7gFrcAV4AnmF9+HHkHwUX0NBv2RkItLQvBn53U+wPFXucxkhq4WuAy4C3FTU+CGwCx4BDKQtOxR5FVlPsx1fgLeAOauEbgA8VWjcrcjuHLkAXeDgNgXZpErK5jEXNZ0WdHULRCeahbk4Ft2KeW8UMxItx7ifqSUqYsE8qGr6BdXtzKAB7Mc/7RWNmWeGFm8x3F325KjgYhNOoHqNiVDCKhVBW6EqMkLUbCm+8PoPgVsT1tJBQJqd9J2ZfTMay22kIbgj4vG5mI2YM36xzgr1oQG0LuBNlguuYcrGW0lAkohlqOw7sDiPBigjiuoTbY7OXlsxNJRGcWsUVxjraCsWWhd2hDxbTPzv0QEUFH2RiiiPTwVICsUcZv0kvXuuikFlIL03GJbVkGykpENtDsT3FN6hJpF7dRJXpS88EpyI/DYldwWN/JcmLD1mBxgieyG2KCq4zlheI7ZDZj8FQrJKGaNBsoz+1InJXJ2aFaSnO03vlTpyk8UQmS3EIM4PRocyNUxGK+uS0fXgLq0sDP2u9FDwNOAJD3+SMKk+i2GGzkiZew0kjD+9FGiZTiOmcgJ/Uyk10L1ZalWbW0O1Ks4aia9hubTYJrgm6k15Umh62b+Hf1kWtXLXgRsz3H4bAOV7GDKHNPMSqqC8vd8EqTUUPLktlffg1gztDvOiZ4G6SsjciYGZxmi4Q3MiC4KKlL+34GGM5WuhG8jgRnemg6WJgNDoM0UZGLVyXjS9ZyVJaHQqRtOYx4xRXukQGlTnBZ8IYWjxvRZfOCdqGRKakYXWpRRRW7bwKHreCbKLodY71DXJKe1F4+HCHOhyvy7i7vAhuhm6213m3F4o5tmw/VAnuMsPZIGrfkWshq+X5dZFJ7LiT1I7K+1EluM2IMoo/O4rErjJ+0yX5nfDoCwSnm38WJWysQaYX/wQiqV6tSodwP2fYiz5km3ReWdUtLAZOUMGfAw8qcCkVMv0+WiPqZnSC9JC3OLSVAwtfB3xJBX9E/PXha4GvE1pgg6S/NkXFSLK74E52AgfoJDJdOXuR+NsEC0xPIVYUtrmH+Ps4Hwez9nQ/4Xbg1kJv5aDe4xzm8lOB4BPE3201QvI1m5510Fh2HXW9SQ+w61JoOncIP48A5xd6JcI24BPqRoAnovJw+iReAc8DDxN/3yYNIONEzS6J2Y6lxP//BLuIvy/zGGrKLXyeEX+j1RbgbuAp4AoitqxgLuIH8CPwDRos3UL/U6TSvIcsoBD/BBgAutkVlEak9oYAAAAASUVORK5CYII=" alt="">
                    </div>
                <div class="taobao" v-else>
                   <img  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAvCAYAAABuWa03AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDY0QjJFNzU2Qjk4MTFFNzkwM0FCMTk4NkYzMUM3RTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDY0QjJFNzY2Qjk4MTFFNzkwM0FCMTk4NkYzMUM3RTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpENjRCMkU3MzZCOTgxMUU3OTAzQUIxOTg2RjMxQzdFOCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpENjRCMkU3NDZCOTgxMUU3OTAzQUIxOTg2RjMxQzdFOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pu3eOnMAAASVSURBVHja7FxNaNRAFJ6ui+Ax+C+IkoMevAi5iCJ4yKLgQVS2qNCT2D2IiIh2LehNzeJd2MWDp6IuInpQsQFFUQSNJxVFG6woepAGPahorb4hL3YIm2lmMrtJ2nzwsds0nUy+vHk/mZn2nR0+SiIwD7gRuB64HLiQFODhO/AD8C3wLvBbp5PKEccOAIeBk0Ab+B7oFppy0QdcCewHjgBbwNPALzzBVwGvAn8D9wEfFDpKYTXwJPAFsAq8H/yixJy0BAWmFr2pEDsR3gH3o6e4BqyEBS/hLy4D68CpQjMluAHcC7yEVv9f8AHgAhS7gFrcAV4AnmF9+HHkHwUX0NBv2RkItLQvBn53U+wPFXucxkhq4WuAy4C3FTU+CGwCx4BDKQtOxR5FVlPsx1fgLeAOauEbgA8VWjcrcjuHLkAXeDgNgXZpErK5jEXNZ0WdHULRCeahbk4Ft2KeW8UMxItx7ifqSUqYsE8qGr6BdXtzKAB7Mc/7RWNmWeGFm8x3F325KjgYhNOoHqNiVDCKhVBW6EqMkLUbCm+8PoPgVsT1tJBQJqd9J2ZfTMay22kIbgj4vG5mI2YM36xzgr1oQG0LuBNlguuYcrGW0lAkohlqOw7sDiPBigjiuoTbY7OXlsxNJRGcWsUVxjraCsWWhd2hDxbTPzv0QEUFH2RiiiPTwVICsUcZv0kvXuuikFlIL03GJbVkGykpENtDsT3FN6hJpF7dRJXpS88EpyI/DYldwWN/JcmLD1mBxgieyG2KCq4zlheI7ZDZj8FQrJKGaNBsoz+1InJXJ2aFaSnO03vlTpyk8UQmS3EIM4PRocyNUxGK+uS0fXgLq0sDP2u9FDwNOAJD3+SMKk+i2GGzkiZew0kjD+9FGiZTiOmcgJ/Uyk10L1ZalWbW0O1Ks4aia9hubTYJrgm6k15Umh62b+Hf1kWtXLXgRsz3H4bAOV7GDKHNPMSqqC8vd8EqTUUPLktlffg1gztDvOiZ4G6SsjciYGZxmi4Q3MiC4KKlL+34GGM5WuhG8jgRnemg6WJgNDoM0UZGLVyXjS9ZyVJaHQqRtOYx4xRXukQGlTnBZ8IYWjxvRZfOCdqGRKakYXWpRRRW7bwKHreCbKLodY71DXJKe1F4+HCHOhyvy7i7vAhuhm6213m3F4o5tmw/VAnuMsPZIGrfkWshq+X5dZFJ7LiT1I7K+1EluM2IMoo/O4rErjJ+0yX5nfDoCwSnm38WJWysQaYX/wQiqV6tSodwP2fYiz5km3ReWdUtLAZOUMGfAw8qcCkVMv0+WiPqZnSC9JC3OLSVAwtfB3xJBX9E/PXha4GvE1pgg6S/NkXFSLK74E52AgfoJDJdOXuR+NsEC0xPIVYUtrmH+Ps4Hwez9nQ/4Xbg1kJv5aDe4xzm8lOB4BPE3201QvI1m5510Fh2HXW9SQ+w61JoOncIP48A5xd6JcI24BPqRoAnovJw+iReAc8DDxN/3yYNIONEzS6J2Y6lxP//BLuIvy/zGGrKLXyeEX+j1RbgbuAp4AoitqxgLuIH8CPwDRos3UL/U6TSvIcsoBD/BBgAutkVlEak9oYAAAAASUVORK5CYII=" alt="">
                    </div>

                   {{thingsname}}</div>

            </div>
            <div class="message">
            <p class="bookprice"><span style="font-size:.12rem">￥</span>{{morelist.price}}</p>
            <p class="bookfoot">月销量：{{morelist.saleNum}}</p>
            </div>

        </div>
        <h2><span class="line"></span>淘宝图文详情<span  class="line"></span></h2>
        <!-- <div class="tbtw">淘宝图文详情</div> -->
        <ul style="margin-bottom:.5rem">
            <li v-for="data in looplist" :key="data.id" >
              <!-- {{data.photo.url}}   -->
              <img :src="data.photo.url" alt="">
            </li>
            </ul>
            <div class="footer">

                <div>领券购买</div>
                <p>{{pricelist}}元淘宝优惠券</p>
            </div>
    </div>
</template>

<script>
import swiper from '@/views/Detail/DetailSwiper'
import axios from 'axios'
export default {
  data () {
    return {
      looplist: [],
      datalist: [],
      thingsname: [],
      morelist: [],
      pricelist: []

    }
  },
  props: ['id'],
  components: {
    swiper
  },
  mounted () {
    this.$store.commit('showHideTabbar', false)
    console.log('要id获取详细信息', this.id)

    axios.get(`http://www.xiongmaoyouxuan.com/api/detail?id=${this.id}&normal=1&sa=`).then(res => {
      // console.log(res.data);
      this.morelist = res.data.data.detail
      this.datalist = res.data.data.detail.photo
      this.looplist = res.data.data.detail.descContentList
      this.pricelist = res.data.data.detail.coupon.price
      this.thingsname = res.data.data.share.title
      // console.log(res.data.data.detail.descContentList[1].photo.url);
      // console.log(this.pricelist)
    })
    // window.onscroll = this.handleScroll
  },
  beforeDestroy () {
    this.$store.commit('showHideTabbar', true)
  },
  // beforeDestroy(){
  // window.onscroll = null},
  methods: {

    handleScroll () {
      if (document.documentElement.scrollTop >= this.$refs.myswiper.$el.offsetHeight) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  }

}
</script>
<style lang="scss" scoped>
.back {
    height: 0.375rem;
    width: 0.375rem;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0.2rem;
    left: 0.2rem;
    color: #fff;
    border-radius: 50%;
    z-index: 5;
    line-height: 0.375rem;
    text-align: center;
}
.more{
    padding: .1rem;
.bookname{
    img{
     margin-left:.2rem;
     width: .3329rem;
     height: .17rem;
    }
    .tianmao{
        width: 0.375rem;
        height: .17rem;
        display: inline-block;
        margin-right: 0.15rem;
        // margin-top: 0.05rem;
            background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkMwM0NGM0U1M0Q2MTFFNzlENEI5MkY3RTkxNzg0NTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkMwM0NGM0Y1M0Q2MTFFNzlENEI5MkY3RTkxNzg0NTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNUE5Mzc3NTUzQ0ExMUU3OUQ0QjkyRjdFOTE3ODQ1NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNUE5Mzc3NjUzQ0ExMUU3OUQ0QjkyRjdFOTE3ODQ1NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtZzjO0AAAovSURBVHja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) no-repeat;
        background-size: .16rem .16rem;
    background-position: 0 .005rem;}
    .taobao{width: 0.375rem;
        height: .17rem;
        display: inline-block;
        margin-right: 0.15rem;
        // margin-top: 0.35rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkMwM0NGNDY1M0Q2MTFFNzlENEI5MkY3RTkxNzg0NTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkMwM0NGNDc1M0Q2MTFFNzlENEI5MkY3RTkxNzg0NTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyQzAzQ0Y0NDUzRDYxMUU3OUQ0QjkyRjdFOTE3ODQ1NiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyQzAzQ0Y0NTUzRDYxMUU3OUQ0QjkyRjdFOTE3ODQ1NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PplzYJMAAAa9SURBVHja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) no-repeat;
    background-size: .16rem .16rem;
    background-position: 0 .005rem;

    }
    .title{
        display: inline-block;
        font-size: .15rem;
        line-height: .2rem;
        font-weight: 400;
    }
}

}

.message{
    width: 100%;
    height: .5rem;
    margin-top: 0.056rem;
     line-height: .5rem;
    .bookprice{
        font-size: .22rem;
        font-weight: 700;
        color:#fa585a;
        float: left;

    }
    .bookfoot{
        font-size: 0.12rem;
        float: right;
        color:#b1a9a5;
    }
}

h2{
    text-align: center;
    height: .4rem;
    line-height: .4rem;
    color:#b1a9a5;
    font-size: .12rem;
    border-top: #b1a9a5 solid 1px;
    border-bottom: #b1a9a5 solid 1px;
}

.swiper-slide{
    img{
        width: 100%;
    }
}
img{
        width: 100%;
    }
.footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    background: #f5f5f5;
  div,p{
        font-size:16px;
        float: right;
        color:#fa585a;
    }
    p{
        padding-right: .13rem
    }
    div{
        // font-size:16px;
        font-weight:border;
        color:#fff;
        width:1.5rem;
        background:#fa585a;
        text-align:center;
    }
}

</style>
