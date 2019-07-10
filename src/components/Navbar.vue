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
    showTab () {
      this.isTabShow = !this.isTabShow
    },
    getHeight () {
      let oldTop = document.scrollingElement.scrollTop
      window.onscroll = () => {
        let top = document.scrollingElement.scrollTop
        if (oldTop >= top) {
          this.$refs.nav.style.top = '0'
        } else {
          this.$refs.nav.style.top = '-0.5rem'
        }
        oldTop = top
      }
    },
    moveNav (scroll) {
      setTimeout(() => {
        let arr = this.$refs.navdiv.children
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].classList.length === 4) {
            scroll.scrollToElement(arr[i - 1], 500)
          }
        }
      }, 1)
    }
  },
  mounted () {
    console.log('mounted')
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
      deceleration: 0.01
    })
    this.navScroll = myscroll

    // 滚动条
    this.getHeight()
    this.moveNav(this.navScroll)
  },
  updated () {
    this.moveNav(this.navScroll)
    console.log('updated')
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
