<template>
    <header class="clear">
        <div class="back l" @click="goBack()">返回</div>
        <div class="searchBox l">
            <span class="el-icon-search icon l"></span>
            <input class="l" type="text" placeholder="搜索商品，发现更多优选" v-model="data">
        </div>
        <div class="search r" @click="toS()">搜索</div>
    </header>
</template>

<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    toS () {
      this.$router.push(`/s/${this.data}`)
    }
  }
}
</script>

<style lang="scss" scoped>
header {
    height: 0.5rem;
    background: #fdde4a;
    padding: 0.09rem 0.12rem 0.11rem 0.2rem;
    box-sizing: border-box;
    line-height: 0.3rem;
    color: #43240c;
    box-shadow: 1px 2px 5px hsla(0,11%,79%,.5);
    .back, .search {
        width: 0.4rem;
        font-size: 0.14rem;
    }
    .search {
        text-align: right;
    }
    .searchBox {
        width: 2.62rem;
        background: #eee;
        border-radius: 0.05rem;
        height: 0.3rem;
        line-height: 0.3rem;
        padding-left: 0.1rem;
        box-sizing: border-box;
        color: #737373;
        input {
            background: none;
            border: none;
            outline: none;
            height: 0.3rem;
            width: 2.2rem;
            line-height: 0.3rem;
            font-size: 0.14rem;
            display: block;
            color: #757575;
            margin-left: 0.02rem;
        }
        .icon {
            font-size: 0.2rem;
            height: 0.3rem;
            line-height: 0.3rem;
        }
    }
}
</style>
