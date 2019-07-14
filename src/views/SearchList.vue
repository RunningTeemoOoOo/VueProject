<template>
  <div id="app">
    <searchheader :word="deCode(word)"></searchheader>
      <ul class="sort-nav">
        <li @click="changeUrl(0)">默认</li>
        <li @click="changeUrl(1)">价格最低</li>
        <li @click="changeUrl(2)">销量最高</li>
      </ul>
      <!-- 列表 -->
      <shoplist :list="shopList"></shoplist>
  </div>
</template>

<script>
import axios from 'axios'
import searchheader from '@/views/search/SearchHeader'
import shoplist from '@/components/ShopList'
export default {
  data () {
    return {
      sort: 0,
      nowStart: 0,
      word: '',
      shopList: [],
      isPushed: false
    }
  },
  methods: {
    changeUrl (sort) {
      let lis = document.querySelectorAll('.sort-nav li')
      for (let i = 0; i < lis.length; i++) {
        if (i === sort) {
          lis[i].style.color = '#fa585a'
        } else {
          lis[i].style.color = '#000'
        }
      }
      this.sort = sort
      this.nowStart = 0
      this.shopList = []
      this.sendAjax()
    },
    addEvent (obj, type, fn) {
      if (obj.attachEvent) { // ie
        obj.attachEvent('on' + type, function () {
          fn.call(obj)
        })
      } else {
        obj.addEventListener(type, fn, false)
      }
    },
    deCode (code) {
      return decodeURIComponent(code)
    },
    enCode (code) {
      return encodeURIComponent(code)
    },
    sendAjax () {
      axios({
        url: `http://www.xiongmaoyouxuan.com/api/search?word=${this.word}&start=${this.nowStart}&sort=${this.sort}&couponOnly=NaN&minPrice=0&maxPrice=99999`
      }).then(res => {
        this.shopList = res.data.data.list
      })
    },
    handleonscroll () {
      if (document.documentElement.scrollHeight - document.documentElement.scrollTop < 800) {
        if (this.isPushed === false) {
          this.isPushed = true
          this.nowStart += 40
          axios({
            url: `http://www.xiongmaoyouxuan.com/api/search?word=${this.word}&start=${this.nowStart}&sort=${this.sort}&couponOnly=NaN&minPrice=0&maxPrice=99999`
          }).then(res => {
            this.shopList.push(...res.data.data.list)
          })
        }
      } else {
        this.isPushed = false
      }
    }
  },
  watch: {
    '$route.path': function () {
      this.sort = 0
      this.nowStart = 0
      this.word = this.enCode(this.$route.params.sData)
      this.changeUrl(this.sort)
      this.sendAjax()
    }
  },
  mounted () {
    this.$store.commit('showHideTabbar', false)
    this.word = this.enCode(this.$route.params.sData)
    this.changeUrl(this.sort)
    this.sendAjax()

    window.addEventListener('scroll', this.handleonscroll)
  },
  beforeDestroy () {
    this.$store.commit('showHideTabbar', true)
    window.removeEventListener('scroll', this.handleonscroll)
  },
  components: {
    searchheader,
    shoplist
  }
}
</script>

<style lang="scss" scoped>
#app {
  padding-top: 0.98rem;
}
div{
  width:100%;
  display: block;
  top:0;
  left:0;
  right:0;
  .sort-nav{
    height:.47rem;
    line-height:.47rem;
    background-color: #fff;
    overflow: hidden;
    border-bottom: 1px solid #d9d9d9;
    position: fixed;
    top: 0.5rem;
    width: 100%;
    left: 0;
    li{
      float: left;
      width: 33.3%;
      text-align: center;
      color: #43240c;
      font-size: 13px;
    }
  }
}
</style>
