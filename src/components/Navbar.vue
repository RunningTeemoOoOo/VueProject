<template>
    <nav ref="nav">
        <div class="top">
            <router-link to="/search" tag="div" class="search">
                <span class="el-icon-search icon"></span>
                <span class="wenzi">搜索商品，发现更多优选</span>
            </router-link>
        </div>
        <div class="bottom clear">
            <router-link to="/index" tag="div" activeClass="act" class="tab l" v-for="data in navList.slice(0, 1)" :key="data.id">
                {{data.name}}
            </router-link>
            <div class="tab l line"></div>
            <div class="roll l clear" ref="roll">
                <div class="scroll l clear" ref="navdiv">
                    <router-link :to="'/tab/' + data.id" tag="div" activeClass="act" class="bar l" v-for="data in navList.slice(1)" :key="data.id" @click.native="moveNav(navScroll)">
                        {{data.name}}
                    </router-link>
                </div>
            </div>
            <div class="el-icon-s-fold icon" @click="showTab()"></div>
        </div>
        <div class="floatTab" v-show="isTabShow" @click="showTab()">
            <div class="bg">
                <div class="tabTitle">全部分类</div>
                <div class="el-icon-close icon"></div>
                <div class="tab">
                    <ul class="clear">
                        <router-link :to="'/tab/' + data.id" tag="li" activeClass="tab_act" class="l" v-for="data in navList" :key="data.id">
                            <img :src="data.imageUrl" />
                            <span>{{data.name}}</span>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'
import BetterScroll from 'better-scroll'
export default {
  data () {
    return {
      navFirst: [],
      navList: [],
      isTabShow: false,
      navScroll: {}
    }
  },
  methods: {
    // 控制'全部分类'显示或隐藏
    showTab () {
      this.isTabShow = !this.isTabShow
    },
    // 检测滚动条滚动方向，使导航栏向上或向下位移
    getHeight () {
      // 初始状态时，获得当前滚动条高度
      let oldTop = document.scrollingElement.scrollTop
      // 滚动条事件
      window.addEventListener('scroll', () => {
        let top = document.scrollingElement.scrollTop
        // 判断滚动方向，并控制位移
        if (oldTop >= top) {
          this.$refs.nav.style.top = '0'
        } else {
          this.$refs.nav.style.top = '-0.5rem'
        }
        // 存储新的高度
        oldTop = top
      })
    },
    // 使导航栏跟随路由滚动，参数为betterScroll对象
    moveNav (scroll) {
      setTimeout(() => {
        // 获取betterScroll对应的节点的所有子元素，遍历判断是否有activeClass
        let arr = this.$refs.navdiv.children
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].classList.length === 4) {
            // 判断是否是第一个，是则将索引+1，以便betterscroll跳转
            if (i === 0) {
              i = 1
            }
            // betterScroll函数，scrollToElement(el, time, offsetX, offsetY, easing)
            // dom元素, 动画时间, X坐标偏移量, Y坐标偏移量，缓动函数
            scroll.scrollToElement(arr[i - 1], 500)
          }
        }
      }, 1)
    }
  },
  mounted () {
    // 获取数据
    axios({
      url: 'http://www.xiongmaoyouxuan.com/api/tabs?sa='
    }).then(res => {
      this.navList = res.data.data.list
    })

    // 初始化BetterScroll
    let myscroll = new BetterScroll('.roll', {
      click: true,
      scrollY: false,
      scrollX: true,
      eventPassthrough: 'vertical',
      // 滚动动量减速越大越快
      deceleration: 0.01
    })
    // 将betterScroll对象赋值，方便函数调用
    this.navScroll = myscroll

    this.getHeight()
    this.moveNav(this.navScroll)
  },
  updated () {
    this.moveNav(this.navScroll)
  },
  beforeDestroy () {
    window.onscroll = null
  }
}
</script>

<style lang="scss" scoped>
nav {
    position: fixed;
    top: 0;
    left: 0;
    background: #fdde4a;
    height: 0.92rem;
    width: 100%;
    transition: 0.3s ease-in-out;
    z-index: 99;
    .top {
        height: 0.5rem;
        padding: 0.11rem 0.19rem 0.09rem 0.19rem;
        box-sizing: border-box;
        .search {
            height: 0.3rem;
            background: #fff;
            border-radius: 0.1rem;
            padding: 0 0.09rem;
            line-height: 0.3rem;
            color: #757575;
            .icon {
                font-size: 0.2rem;
                transform: translateY(0.02rem);
                padding-right: 0.02rem;
            }
            .wenzi {
                color: #877a73;
                font-size: 0.14rem;
            }
        }
    }
    .bottom {
        box-sizing: border-box;
        height: 0.42rem;
        padding: 0.06rem 0.15rem 0 0.2rem;
        color: #43240c;
        .line {
            box-sizing: normal;
            height: 0.22rem;
            padding-bottom: 0.1rem;
            width: 1px;
            margin: 0 0.09rem;
            background: #877a73;
            padding: 0;
        }
        .tab:first-of-type {

            height: 0.22rem;
            line-height: 0.22rem;
            padding-bottom: 0.1rem;
            font-size: 0.14rem;
            color: #6b4c10;
            padding-right: 0;
            a {
                color: #6b4c10;
            }
        }
        .roll {
            width: 2.3rem;
            height: 0.36rem;
            overflow: hidden;
            position: relative;
            .bar {
            height: 0.22rem;
            line-height: 0.22rem;
            padding-bottom: 0.1rem;
            font-size: 0.14rem;
            margin-right: 0.15rem;
            }
            .bar:last-of-type {
                margin-right: 0;
            }
            .scroll {
                overflow: hidden;
                height: 0.36rem;
                width: max-content;
                transition: 0.5s linear;
            }
        }
        .icon {
            font-size: 0.22rem;
            padding-left: 0.1rem;
        }
        .act {
            border-bottom: 0.04rem solid #43240c;
        }
    }
    .floatTab {
        position: absolute;
        height: 7rem;
        width: 100%;
        top: 0;
        left: 0;
        .bg {
            margin-top: 0.5rem;
            background: rgba(0, 0, 0, 0.3);
            height: 100%;
            width: 100%;
            .tabTitle {
                height: 0.32rem;
                background: #fdde4a;
                line-height: 0.32rem;
                color: #877a73;
                text-align: center;
                font-size: 0.14rem;
            }
            .icon {
                position: absolute;
                top: 0.56rem;
                right: 0.19rem;
                font-size: 0.2rem;
            }
            .tab {
                padding-bottom: 0.1rem;
                background: #fff;
                ul {
                    li {
                        width: 0.9375rem;
                        height: 0.67rem;
                        padding-bottom: 0.16rem;
                        text-align: center;
                        font-size: 0.12rem;
                        color: #877a73;
                        img {
                            height: 0.48rem;
                            width: 0.48rem;
                            margin: 0 auto;
                        }
                    }
                    .tab_act {
                        color: red;
                    }
                }
            }
        }
    }
}
</style>
