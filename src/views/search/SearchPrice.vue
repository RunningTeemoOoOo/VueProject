<template>
        <div>
            aaaaaaaaaaaa
            <ul v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                <li v-for="data in datalist" :key="data.index" @click="handleChangePage(data.id)"  >
                   <div v-if="data.id>=10000">
                       <img :src="data.image" class="vif"/>
                        <div class="messages">
                        <p class="nametitle">{{data.title}}</p>
                        <div class="no1">
                           <div class="l"> <p v-if="data.platform!==1" style="background:#df2b2f;color:#fff;padding:0.01125rem .01875rem 0rem .01875rem;border-radius: 0.03rem">天猫</p>
                            <p v-else style="background:#ff9000;color:#fff;padding:0.01125rem .01875rem 0rem .01875rem;border-radius: 0.03rem">淘宝</p>
                            </div>

                            <div class="r">
                            <p  v-if="data.platform!==false" style="color:hsla(21,8%,49%,.7);">包邮</p>
                            <p v-else ></p>
                            </div>

                        </div>

                        <div class="no2">
                            <p class="l no2p1">￥<span>{{data.price}}</span></p>
                            <p class="l no2p2" style="">{{data.saleNum}}人已买</p>
                            <p class="r no2p3" style="">{{data.couponValue}}</p>
                        </div>

                    </div>
                    </div>
                    <div v-else>
                    <img :src="data.image" class="velse"/>
                    <!-- <div>
                        <p style="font-size:.12rem">{{data.title}}</p>
                        <p>{{data.price}}</p>
                        <p>{{data.originPrice}}</p>
                    </div> -->
                    </div>

                    </li>

             </ul>
        </div>
    </template>
<script>

import axios from 'axios'
import Vue from 'vue'
import Mint from 'mint-ui'
Vue.use(Mint)

// Vue.filter("actorfilter",function(data){
// var newlist = data.map(item=>item.name)
// console.log(newlist.join(' '))
// return newlist.join(' ')
// })
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      current: 0
    }
  },

  mounted () {
    axios.get('http://www.xiongmaoyouxuan.com/api/search?word=%E5%8F%A3%E7%BA%A2&start=0&sort=1&couponOnly=NaN&minPrice=0&maxPrice=99999').then(res => {
      console.log(res.data)
      this.datalist = res.data.data.list
    })
  },
  methods: {
    handleChangePage (id) {
      console.log(id)
      if (id < 10000) {
        this.$router.push({ name: 'lrzdetail', params: { id: id } })
      } else {
        this.$router.push({ name: 'kerwindetail', params: { id: id } })
      }
    },
    loadMore () {
      this.loading = true
      this.current += 20
      axios.get(`http://www.xiongmaoyouxuan.com/api/search?word=%E5%8F%A3%E7%BA%A2&start=${this.current}&sort=1&couponOnly=NaN&minPrice=0&maxPrice=99999`).then(res => {
        console.log(res.data)
        this.datalist = [...this.datalist, ...res.data.data.list]
        this.loading = false
      })

      //   setTimeout(() => {
      //     let last = this.datalist[this.datalist.length - 1];
      //     for (let i = 1; i <= 10; i++) {
      //       this.datalist.push(last + i);
      //     }
      //     this.loading = false;
      //   }, 1000);
    }

  }
}
</script>
    <style lang="scss" scoped>

            .l{
                float: left;
            }
            .r{
                float: right;

            }
            .nametitle{
                font-size:.12rem ;
                        width:100%;
                        white-space:nowrap;
                         overflow:hidden;
                        text-overflow:ellipsis;
                        color:#877a73;
                        margin-bottom:0.03rem;
            }
            .messages{
                padding:0.09rem 0.11rem;
            }
            .no1{
                height: .15rem;
                font-size: .12rem;
            }
            .no2{
                width: 100%;
                height: .15rem;
                font-size: .12rem;
                margin-top: .08rem;
                .no2p1{
                    color:#fa585a;
                    span{
                        font-size:0.14rem;font-weight:bold;
                    }
                }
                .no2p2{
                    color:hsla(21,8%,49%,.7);
                    margin-top:0.03rem;
                    margin-left:0.03rem;
                    font-size: .12rem;
                }
                .no2p3{
                    color:#fa585a;
                    border:1px solid #fa585a;
                    border-radius:0.02rem;
                    font-size:.07rem;
                    padding-left:0.03rem;
                    padding-right:0.03rem;
                    margin-top:0.03rem;
                }
            }
            .xiaobian{
                background: #f5f5f5;
                font-size: .12rem;
                text-align: center;
                height: .5rem;
                line-height: .5rem;
                width: 100%;
                color:hsla(21,8%,49%,.7)
            }
            ul{
                background:#f5f5f5;
            display: flex;
            flex-wrap: wrap;
                li{box-sizing: border-box;
                   height: 2.76rem;
                   background: #fff;
                // width: 49%;
                margin-bottom: 0.06rem;
               // border: 1px #000 solid;
                text-align: center;
                .vif{
                    display: inline-block;
                height: 1.82rem;

            }
               .velse{
                    display: inline-block;
                width:100%;

            }
            }
             li:nth-child(2n){
                 box-sizing: border-box;
               margin-left: 0.03rem;
               width: 49%;
             }
             li:nth-child(2n-1){
                 box-sizing: border-box;
                  margin-right: 0.03rem;
                width: 49%;
             }
            }

            </style>
