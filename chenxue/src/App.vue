<template>
  <div id="app">
    <router-view/>
    <div class="footer" v-if="flag">
      <router-link to="/index">首页</router-link>
      <router-link to="/search">发现</router-link>
      <router-link to="/order">订单</router-link>
      <router-link to="/mine">我的</router-link>
    </div>
  </div>
</template>

<script>
import './assets/font/iconfont.css'
export default {
  name: 'App',
  data(){
      return{
            flag:['index','search','order','mine'].includes(this.$route.name)
      }

  },
  updated(){
      this.flag=['index','search','order','mine'].includes(this.$route.name);
  }
}
</script>

<style>
  ul,ol,dd,dt,dl,h2,h3,h4,h5,h6,p,body{
    margin:0;padding:0;/*去掉所有 有默认边距元素的边距*/
  }
  body,html{
    font-family:"微软雅黑";/*统一页面的字体*/
  }
  a,u,s{
    text-decoration:none;/*去掉有修饰线元素的修饰线*/
    color:#666;/*统一a标签字体颜色*/
  }
  ul,li,ol{
    list-style:none;/*去掉页面列表的样式*/
  }
  html{
    font-size: 26.67vw;
  }
  body{
    font-size: 0.1rem;
    margin: 0;
  }
  header{
    font-size: 0.18rem;
    text-align: center;
    height: .45rem;
    background: rgb(35, 149, 255);
    font-weight: 900;
    color: #fff;
    line-height: .45rem;
    padding: 0 0.14rem
  }
  .footer{
    height: 0.6rem;
    position: fixed;
    bottom: 0;
    background: #fff;
  }
  .footer a{
    display: inline-block;
    width: 0.9rem;
    text-align: center;
    line-height: 0.6rem
  }
</style>
