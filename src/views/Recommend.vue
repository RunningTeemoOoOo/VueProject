<template>
<div id="app">
<mt-swipe :auto="3000">
  <mt-swipe-item v-for="data in datalist" :key="data.id">
    <img :src="data.imageUrl">
  </mt-swipe-item>
</mt-swipe>

<section class="grids">
    <div class="grid" v-for="data in looplist" :key="data.id" @click="gridUrl(data.url)">
        <div class="grid-msg">
            <p class="title">{{data.title}}</p>
            <p class="text">{{data.text}}</p>
        </div>
        <img :src="data.imageUrl">
    </div>
</section>

<div class="top-list">
    <div class="top-swiper">
        <a href="#">
            <img src="../assets/img/hot.png" alt="">
        </a>
        <swiper perview="3" class="actorswiper" myclassname="actorswiper" :key="toplist.length">
            <div class="swiper-slide" v-for="data in toplist" :key="data.id" @click="swiperClick(data.id)">
                <div class="tag"></div>
                <img :src="data.image">
                <div class="commodity-info">
                    <div class="commodity-title">{{data.title}}</div>
                    <div class="commodity-price">
                        <span class="price">
                            <i class="price-tag">¥</i>
                            <span class="digit">{{data.price}}</span>
                        </span>
                    </div>
                </div>
            </div>
            <a href="#" class="swiper-slide" id="see-more">
                <p class="text">更多商品</p>
                <p class="sub-text">see-more</p>
            </a>
        </swiper>
    </div>
</div>

<div class="split-line">
    <span class="line"></span>
    <span class="text">
        &nbsp;&nbsp;小编精选，全场特惠 (ง •̀_•́)ง&nbsp;&nbsp;
    </span>
    <span class="line"></span>
</div>
  <shoplist :list="shopList" @event="even($event)"></shoplist>
</div>

</template>

<script>
import shoplist from '@/components/ShopList'

import { Swipe, SwipeItem, Loadmore } from 'mint-ui'
import swiper from './Index/Indexswiper'
import axios from 'axios'
import 'swiper/dist/css/swiper.min.css'

import Vue from 'vue'
Vue.component(Loadmore.name, Loadmore)

export default {
  data () {
    return {
      datalist: [],
      looplist: [],
      toplist: [],
      shopList: [],
      nowStart: 0,
      isPushed: false
    }
  },
  methods: {
    handleonscroll () {
      if (document.documentElement.scrollHeight - document.documentElement.scrollTop < 800) {
        if (this.isPushed === false) {
          this.isPushed = true
          this.nowStart += 20
          axios.get(`http://www.xiongmaoyouxuan.com/api/tab/1?start=${this.nowStart}`).then(res => {
            this.shopList.push(...res.data.data.items.list)
          })
        }
      } else {
        this.isPushed = false
      }
    },
    swiperClick (id) {
      this.$router.push(`/c/${id}`)
    },
    gridUrl (url) {
      let urltest = url.substring(10)
      let urlReg = /(.*)\?(.*)=(.*)/
      urlReg.test(urltest)
      let newurl = '/' + RegExp.$1 + '/' + RegExp.$3
      this.$router.push(newurl)
    }
  },
  mounted () {
    axios.get(`http://www.xiongmaoyouxuan.com/api/tab/1?start=${this.nowStart}`).then(res => {
      this.datalist = res.data.data.banners
      this.looplist.push(res.data.data.gridsV2[1], res.data.data.gridsV2[2], res.data.data.gridsV2[3])
      this.toplist = res.data.data.topList
      this.shopList = res.data.data.items.list
    })

    window.onscroll = this.handleonscroll
  },
  components: {
    swiper,
    shoplist
  }
}
</script>

<style lang="scss" scoped>
#app {
    padding-top: 0.92rem;
}
.mint-swipe{
    height: 1.53rem;
    width:100%;
    img{
        width: 100%;
    }
}
</style>

<style lang="scss" scoped>
.grids{
    box-sizing: border-box;
    height:1.8rem;
    width:100%;
    margin:-.2rem 0 .11rem;
    padding: .11rem;
    overflow: hidden;
    background:#fff;
    box-shadow: 0 1px 0 0 #d9d9d9;

    .grid:first-child{
        width:1.7rem;
        height:1.46rem;
        font-size: 17px;
        background-color: #fdf4e6;
        color: #877a73;
        position: relative;
        border-radius: .1rem;
        float: left;
        margin-right: .11rem;
        margin-top: .11rem;
        .grid-msg{
            width:1.115rem;
            height:.828rem;
            margin-right: .77rem;
            position: relative;
            font-size: 17px;
            z-index:2;
            box-sizing: border-box;
            .title{
                height:.25rem;
                width:.97rem;
                line-height: .25rem;
                font-size: 18px;
                font-weight: 500;
                margin:.15rem 0rem 0rem .14rem;
                color: #43240c;
            }
            .text{
                width: .97rem;
                height: .16rem;
                font-size: 12px;
                margin:0rem 0rem 0rem .14rem;
                font-weight: 500;
                color: #ff9e55;
            }
        }
        img{
            height:1.46rem;
            width:1.46rem;
            display: block;
            position: absolute;
            right:0;
            bottom:0;
            top:0;

        }
    }

    .grid:nth-of-type(2){
        width:1.7rem;
        height:.68rem;
        font-size: 17px;
        background-color: #fdf4e6;
        color: #877a73;
        position: relative;
        border-radius: .1rem;
        float: left;
        margin-top: .11rem;
        .grid-msg{
            width:1.11rem;
            height:.82rem;
            font-size: 17px;
            margin-right:.77rem;
            .title{
                height:.25rem;
                width:.97rem;
                line-height: .25rem;
                font-size: 16px;
                font-weight: 500;
                margin:.15rem 0rem 0rem .14rem;
                color: #43240c;
            }
            .text{
                width: .97rem;
                height: 12px;
                font-size: .12rem;
                margin:0rem 0rem 0rem .14rem;
                font-weight: 500;
                color: #ff9e55;
            }

        }
        img{
            height:.68rem;
            width:.68rem;
            position: absolute;
            right:.05rem;
            top:0;
            border:none;
        }
    }

    .grid:nth-of-type(3){
        width:1.7rem;
        height:.68rem;
        font-size: 17px;
        background-color: #eef9fc;
        color: #877a73;
        position: relative;
        border-radius: .1rem;
        float: left;
        margin-top: .11rem;
        .grid-msg{
            width:1.11rem;
            height:.82rem;
            font-size: 17px;
            margin-right:.77rem;
            .title{
                height:.25rem;
                width:.97rem;
                line-height: .25rem;
                font-size: 16px;
                font-weight: 500;
                margin:.15rem 0rem 0rem .14rem;
                color: #43240c;
            }
            .text{
                width: .97rem;
                height: .16rem;
                font-size: 12px;
                margin:0rem 0rem 0rem .14rem;
                font-weight: 500;
                color: #ff9e55;
            }

        }
        img{
            height:.68rem;
            width:.68rem;
            position: absolute;
            right:.05rem;
            top:0;
            border:none;
        }
    }

}
</style>

<style lang="scss" scoped>
.top-list{
    height:1.65rem;
    width:100%;
    background-color: #fff;
    margin-top:.09rem;
    .top-swiper{
        height:1.65rem;
        width:100%;
        box-sizing: border-box;
        padding:.11rem 0rem;
        a{
            width:.46rem;
            height:1.42rem;
            margin:0 .14rem 0 0;
            float:left;
            text-align: center;
            color:#43240c;
            background-color: #fee44e;
            img{
                height:.67rem;
                width:.29rem;
                margin:.36rem auto 0 auto
            }
        }
    }
}

.swiper-wrapper{
    height:100%;
    .commodity-info{
        padding: .05rem 0 0;
        box-sizing: border-box;
    .commodity-title{
        font-size: 12px;
        width: 100%;
        height: .18rem;
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
        line-height: .18rem;
        color: #43240c;
        white-space: nowrap;
            }
    .commodity-price{
        height:.25rem;
        text-align: center;
        vertical-align: bottom;

        .price{
            display: inline-block;
            color: #fa585a;
            font-size: 17px;
            font-weight: 400;
            line-height: .20rem;
            margin-right: .04rem;
            vertical-align: middle;

            .price-tag{
            font-style: normal;
            font-weight: 400;
            font-size:14px;
            }
        }
    }
    }
    .swiper-slide{
        width:100%;
        img{
            height:1rem;
            width:.9rem;
            border: 1px solid #d9d9d9;
        }
    }

    .swiper-slide:first-child{
        .tag{
            background-image: url("../assets/img/one.png");
            background-size: 100%;
            height:.24rem;
            width:.27rem;
            position: absolute;
        }
    }

    .swiper-slide:nth-of-type(2){
        .tag{
            background-image: url("../assets/img/two.png");
            background-size: 100%;
            height:.24rem;
            width:.27rem;
            position: absolute;
        }
    }

    .swiper-slide:nth-of-type(3){
        .tag{
            background-image: url("../assets/img/three.png");
            background-size: 100%;
            height:.24rem;
            width:.27rem;
            position: absolute;
        }
    }

    #see-more{
    width: 1.15rem;
    height: 1.15rem;
    font-size: 16px;
    color: #fda900;
    border: 1px solid #d9d9d9;
    text-align: center;
    box-sizing: border-box;
    display: inline-block;
    background:white;
    .text{
        display: inline-block;
        padding-top: .31rem;
        width: 100%;
        font-size: 18px;
        border-bottom: 1px solid #d9d9d9;
        padding-bottom: .04rem;
        box-sizing: border-box;
    }
    .sub-text{
        width: 100%;
        color: #877a73;
        font-size: 15px;
    }
    }
}

</style>

<style lang="scss" scoped>
.split-line{
    color: hsla(21,8%,49%,.7);
    text-align: center;
    height: .55rem;
    line-height: .55rem;
    vertical-align: middle;
    .line{
        height: 1px;
        background-color: #fdde4a;
        width: 12%;
        display: inline-block;
        margin-bottom: 3px;
    }
    .text{
        color: hsla(21,8%,49%,.7);
        font-size:14px;
        line-height: .55rem;
    }
    .text::before{
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: 3px solid #fdde4a;
        transform: rotate(45deg);
        display: inline-block;
        box-sizing: border-box;
        margin-top: -3px;
    }
    .text::after{
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: 3px solid #fdde4a;
        transform: rotate(45deg);
        display: inline-block;
        box-sizing: border-box;
        margin-top: -3px;
    }

}
</style>
