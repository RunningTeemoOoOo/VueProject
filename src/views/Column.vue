<template>
    <div class="column">
        <div class="cover">
            <img :src="imgsrc" />
        </div>
        <shoplist :list="shopList"></shoplist>
        <div class="download">去熊猫优选APP，找更多优惠</div>
            <div class="logo">
            <img src="http://static.anquan.org/static/outer/image/aqkx_83x30.png?id=www.xiongmaoyouxuan.com?t=30" />
        </div>
    </div>
</template>

<script>
import shoplist from '@/components/ShopList'
import axios from 'axios'
export default {
  data () {
    return {
      imgSrc: '',
      shopList: [],
      isPushed: false,
      nowStart: 0,
      imgsrc: ''
    }
  },
  methods: {
    sendAjax () {
      axios({
        url: `http://www.xiongmaoyouxuan.com/api${this.$route.fullPath}/items?start=${this.nowStart}`
      }).then(res => {
        this.shopList = res.data.data.list
      })
    },
    handleonscroll () {
      // let h = document.documentElement.scrollHeight == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight
      // let t = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop
      let t = document.scrollingElement.scrollTop
      let h = document.scrollingElement.scrollHeight
      if (h - t < 1000) {
        if (this.isPushed === false) {
          this.isPushed = true
          this.nowStart += 20
          axios({
            url: `http://www.xiongmaoyouxuan.com/api${this.$route.fullPath}/items?start=${this.nowStart}`
          }).then(res => {
            this.shopList.push(...res.data.data.list)
          })
        }
      } else {
        this.isPushed = false
      }
    }
  },
  mounted () {
    axios({
      url: `http://www.xiongmaoyouxuan.com/api${this.$route.fullPath}`
    }).then(res => {
      this.imgsrc = res.data.data.cover
    })
    this.sendAjax()
    window.addEventListener('scroll', this.handleonscroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleonscroll)
  },
  components: {
    shoplist
  }
}
</script>

<style lang="scss" scoped>
.column {
    padding-top: 0.92rem;
}
.cover {
    padding-bottom: 0.1rem;
    img {
        width: 100%;
    }
}
.download {
    height: 0.3rem;
    border: 1px solid #fa521e;
    border-radius: 0.15rem;
    padding: 0.07rem 0.15rem;
    font-size: 0.12rem;
    color: #fa521e;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: center;
    width: max-content;
    margin-top: 0.3rem;
}
.logo {
    width: 0.83rem;
    padding-top: 0.5rem;
    margin: 0 auto;
    padding-bottom: 0.1rem;
}
</style>
