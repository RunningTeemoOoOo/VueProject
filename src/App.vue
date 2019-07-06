<template>
  <div id="app">
      <navbar></navbar>
      <router-view />
  </div>
</template>

<script>
import navbar from '@/components/Navbar'
export default {
  components: {
    navbar
  }
}
</script>

<style>
* {margin: 0; padding: 0;}
html, body {width: 100%; height: 100%; font-size: 0.16rem;}
ul {list-style: none;}
a {text-decoration: none; color: #000;}
img {display: block;}
h1, h2, h3 {font-size: 0.16rem; font-weight: normal;}
.l {float: left;}
.r {float: right;}
.clear:after {content: "";display: block;clear: both;}
</style>
