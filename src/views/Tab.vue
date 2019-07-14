<template>
<div style="margin-top:1rem">
    <div class="hots">
        <div class="split-line">
            <span class="line"></span>
            <span class="text">潮流精选</span>
            <span class="line"></span>
        </div>
        <ul>
            <li v-for="data in datalist" :key="data.id" @click="handleChangePage(data.url)">
                <img :src="data.imageUrl" alt="">
                <div class="title">  {{data.title}}</div>
            </li>
        </ul>
    </div>
    <shoplist :list="shopList" @event="even($event)"></shoplist>
</div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import shoplist from '@/components/ShopList'
export default {
  data () {
    return {
      datalist: [],
      nowUrl: '',
      nowStart: 0,
      shopList: [],
      isPushed: false
    }
  },
  mounted () {
    this.nowUrl = this.$router.history.current.fullPath
    this.sentAjax(this.nowUrl, this.nowStart)

    window.addEventListener('scroll', this.handleonscroll)
    window.onscroll = this.handleonscroll
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleonscroll)
  },
  watch: {
    '$route.path': function () {
      this.nowUrl = this.$router.history.current.fullPath
      this.datalist = [],
      this.shopList = [],
      this.nowStart = 0
      this.sentAjax(this.nowUrl, this.nowStart)
    }
  },
  methods: {
    handleChangePage (id) {
      console.log(id)
      var idd = id.slice(-4)
      console.log(idd)
      this.$router.push({ name: 'lrzdetail', params: { id: idd } })
    },
    sentAjax (url, start) {
      axios({
        url: `http://www.xiongmaoyouxuan.com/api${url}?start=${start}`
      }).then(res => {
        this.datalist = res.data.data.categories
        this.shopList = res.data.data.items.list
      })
    },
    handleonscroll () {
      if (document.documentElement.scrollHeight - document.documentElement.scrollTop < 800) {
        if (this.isPushed === false) {
          this.isPushed = true
          this.nowStart += 20
          axios.get(`http://www.xiongmaoyouxuan.com/api${this.nowUrl}?start=${this.nowStart}`).then(res => {
            this.shopList.push(...res.data.data.items.list)
          })
        }
      } else {
        this.isPushed = false
      }
    }
  },
  components: {
    shoplist
  }
}
</script>

<style lang="scss" scoped>
.hots {
    background-color: #fff;
    overflow: hidden;

.split-line{
    color: hsla(21,8%,49%,.7);
    font-size: .32rem;
    text-align: center;
    height: .5rem;
    line-height: .5rem;
    vertical-align: middle;
    font-size: 0;
    .split-line .line {
    height: 1px;
    background-color: #fdde4a;
    width: 12%;
    display: inline-block;
    margin-bottom: 3px;
}
.line  {
    height: 1px;
    background-color: #fdde4a;
    width: 12%;
    display: inline-block;
    margin-bottom: 3px;
}
 .text {
    font-size:.12rem
        //font-size: 0.32rem;

}
}
ul{

    list-style-type: none;
    overflow: hidden;

    li{
      width: 25%;
    float: left;
    text-align: center;
    font-size: .16rem;
    margin-bottom:.16rem;
    text-align: center;
    img{

        display: inline-block;
        width:.48rem;
    height: .48rem;
   // margin-left: 0.5rem
    }
    }
    .title{
      font-size: .12rem;
    color: #877a73;
    text-align: center;

    }

}
}
</style>
