<template>
    <div>
        <searchheader></searchheader>
        <div class="lists">
            <div class="hotSearch">
                <h2>热门搜索</h2>
                <ul class="clear">
                    <li v-for="data in hotSearchList" :key="data.word" :class="data.highlight?'light l':'l'" @click="toS(data.word)">{{data.word}}</li>
                </ul>
            </div>
            <div class="shopList">
                <h2>商品分类</h2>
                <ul class="clear">
                    <li v-for="data in shopList" :key="data.id" class="l" @click="toTab(data.id)">{{data.name}}</li>
                </ul>
            </div>
            <div class="download">去熊猫优选APP，找更多优惠</div>
            <div class="logo">
                <img src="http://static.anquan.org/static/outer/image/aqkx_83x30.png?id=www.xiongmaoyouxuan.com?t=30" />
            </div>
        </div>
    </div>
</template>

<script>
import searchheader from '@/views/search/SearchHeader'
import axios from 'axios'
export default {
  data () {
    return {
      hotSearchList: [],
      shopList: []
    }
  },
  methods: {
    toTab (id) {
      this.$router.push(`/tab/${id}`)
    },
    toS (data) {
      this.$router.push(`/s/${data}`)
    }
  },
  beforeMount () {
    this.$store.commit('showHideTabbar', false)
  },
  mounted () {
    axios({
      url: 'http://www.xiongmaoyouxuan.com/api/search/home'
    }).then(res => {
      this.hotSearchList = res.data.data.hotWords.slice(0, 8)
    })
    axios({
      url: 'http://www.xiongmaoyouxuan.com/api/tabs?sa='
    }).then(res => {
      this.shopList = res.data.data.list.slice(1)
    })
  },
  beforeDestroy () {
    this.$store.commit('showHideTabbar', true)
  },
  components: {
    searchheader
  }
}
</script>

<style lang="scss" scoped>
.lists {
    padding: 0 0.2rem;
    h2 {
        padding-top: 0.26rem;
        padding-bottom: 0.18rem;
        height: 0.14rem;
        font-size: 0.14rem;
        color: #877a73;
    }
    .hotSearch {
        ul {
            li {
                height: 0.28rem;
                padding: 0 0.11rem;
                background: #f5f5f5;
                margin-right: 0.12rem;
                margin-bottom: 0.15rem;
                border-radius: 0.05rem;
                font-size: 0.14rem;
                line-height: 0.28rem;
            }
            li.light {
                color: red;
            }
        }
    }
    .shopList {
        ul {
            li {
                width: 25%;
                height: 0.32rem;
                line-height: 0.32rem;
                padding-bottom: 0.08rem;
                text-align: center;
            }
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
        padding-top: 1rem;
        margin: 0 auto;
    }
}
</style>
