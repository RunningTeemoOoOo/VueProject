<template>
    <div class="shoplist">
        <ul class="clear" ref="shoplist">
            <li v-for="data in list" :key="data.id">
                <div v-if="data.type===1" class="li_if" @click="toC(data.id)">
                    <img :src="data.image" />
                    <div class="bottom">
                        <h3>{{data.title}}</h3>
                        <div class="mid clear">
                            <div :class="data.platform=== 2?'left l tm':'left l tb'">{{data.platform=== 2?'天猫':'淘宝'}}</div>
                            <div class="right r">{{data.isFreePostage?'包邮':'不包邮'}}</div>
                        </div>
                        <div class="btm">
                            <span class="price">￥<span class="bigfont">{{(data.price + "").split(".")[0]}}</span>
                            {{(data.price + "").split(".")[1]?"."+(data.price + "").split(".")[1]:""}}</span>
                            <span class="people">{{data.saleNum>10000?(data.saleNum/10000).toFixed(1)+"万":data.saleNum}}人已买</span>
                            <span class="coupon" v-show="data.couponValue===''?false:true">{{data.couponValue}}</span>
                        </div>
                    </div>
                </div>
                <div v-else class="li_else" @click="toColumn(data.id)">
                    <img :src="data.image" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ['list'],
  methods: {
    toColumn (id) {
      this.$router.push(`/column/${id}`)
    },
    toC (id) {
      this.$router.push(`/c/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.shoplist {
    background: #f5f5f5;
    ul {
        li {
            width: 1.84rem;
            height: 2.78rem;
            background: #fff;
            margin-bottom: 0.06rem;
            .li_if {
                img {
                    height: 1.84rem;
                    width: 1.84rem;
                }
                .bottom {
                    padding: 0.09rem 0.1rem;
                    h3 {
                        height: 0.12rem;
                        font-size: 0.12rem;
                        line-height: 0.12rem;
                        color: #877a73;
                        width: 100%;
                        white-space:nowrap;
                        overflow: hidden;
                        text-overflow:ellipsis;
                    }
                    .mid {
                        padding-top: 0.1rem;
                        height: 0.16rem;
                        font-size: 0.12rem;
                        line-height: 0.16rem;
                        .tm {
                            color: #fff;
                            background: #df2b2f;
                            border-radius: 0.03rem;
                            padding: 0 0.03rem;
                        }
                        .tb {
                            color: #fff;
                            background: #ff9000;
                            border-radius: 0.03rem;
                            padding: 0 0.03rem;
                        }
                        .right {
                            color: #877a73;
                        }
                    }
                    .btm {
                        position:relative;
                        padding-top: 0.08rem;
                        font-size: 0.1rem;
                        .price {
                            color: #df2b2f;
                            margin-right: 0.1rem;
                            .bigfont {
                                font-size: 0.16rem;
                            }
                        }
                        .people {
                            color: #877a73;
                        }
                        .coupon {
                            color: #df2b2f;
                            border: 1px solid #df2b2f;
                            padding: 0.01rem;
                            position: absolute;
                            top: 0.08rem;
                            right: 0;
                        }
                    }
                }
            }
            .li_else {
                img {
                    height: 2.78rem;
                    width: 1.84rem;
                }
            }
        }
        li:nth-of-type(2n) {
            float: right;
        }
        li:nth-of-type(2n+1) {
            float: left
        }
    }
}
</style>
