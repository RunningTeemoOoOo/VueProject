<template>
    <div>
        <ul class="sort-nav">
            <router-link to="/searchlist/SearchDefault" tag="li" activeClass="active">默认</router-link>
            <router-link to="/searchlist/SearchPrice" tag="li" activeClass="active">价格最低</router-link>
            <router-link to="/searchlist/SearchSalesVolume" tag="li" activeClass="active">销量最高</router-link>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
div{
    position: fixed;
    width:100%;
    display: block;
    top:.35rem;
    left:0;
    right:0;

.sort-nav{
    margin-top: .08rem;
    height:.47rem;
    line-height:.47rem;
    background-color: #fff;
    overflow: hidden;
    border-bottom: 1px solid #d9d9d9;
    li{
        float: left;
        width: 33.3%;
        text-align: center;
        color: #43240c;
        font-size: 13px;

    }
    .active{
            color: #fa585a;
    }
}
}
</style>
