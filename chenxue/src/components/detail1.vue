<template>
    <div>
        <nav></nav>
        <div class="shop-info">
            <img :src="'http://127.0.0.1/'+shopInfo.shopPic" alt="">
            <div>
                <h4>{{shopInfo.shopName}}</h4>
                <p><span>评价4.7</span><span>月售2884单</span><span>蜂鸟专送约21分钟</span> </p>
            </div>
            <h5>共￥11 店铺 领取</h5>
            <p>满25减12，满35减15，满45减18，满60减22，满100减40</p>
            <h6>公告：庆祝双11，迎接双12，在此期间真情回馈绝美一家用户。“绝美一家便当”设计以年轻、时尚、自由为主题，食材健康新鲜，口味符合当代年轻一族的需求，您的喜欢是我们的追求！加盟热线4006553011。店主联系电话:18603515635</h6>
        </div>
        <div class="nav">
            <ul>
                <li>点餐</li>
                <li>评价</li>
                <li>商家</li>
            </ul>
        </div>
        <div class="dp">
            <img src="../assets/dp.png" alt="">
        </div>
        <!-- <div class="recommend">
            <h3>商家推荐</h3>
        </div> -->
        <div class="content">
          <div class="left" id="left">
            <ul>
              <li v-for="item in goodsTypeList">{{item.goodsTypeName}}</li>
            </ul>
          </div>
          <div class="right" id="right">
            <ul>
              <li v-for="item in goodsList">
                <div class="class-title">{{item.goodsTypeName}}</div>
                <div v-for="ite in item.list">
                  <div class="item">
                    <div class="item-left">
                      <div class="item-img">
                          <img :src="'http://127.0.0.1/'+ite.goodsPic" alt="">
                      </div>
                    </div>
                    <div class="item-right">
                      <div class="title">{{ite.goodsName}}</div>
                      <div class="subtitle"></div>
                      <div class="price"></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import jq from '../action'
export default {
  name:'detail',
  data () {
    return {
        goodsList:[],
        goodsTypeList:[],
        shopInfo:{}
    };
  },
  mounted(){
      var id=this.$route.params.id;
    axios.get('http://127.0.0.1/getGoodsById',{//通过店铺id找商品
        params:{
            id
        }
    }).then(({data})=>{
        this.goodsList=data.goodsList;
        console.log(data,111)

    })
    axios.get('http://127.0.0.1/getGoodsTypeById',{//通过店铺id找商品
        params:{
            id
        }
    }).then(({data})=>{
        this.goodsTypeList=data.goodsTypeList;
        console.log(data,222)

    })
    axios.get('http://127.0.0.1/getShopInfo',{
        params:{
            id
        }
    }).then(({data})=>{
        console.log(data,333)
        this.shopInfo=data.shopInfo
    })
    jq()
  }

}

</script>
<style scoped>
nav{
    height: 1rem;
    background: url('../assets/bg.jpeg')
}
.shop-info{
    height: 1.32rem;
    padding: 0.3rem 0 0;
    position: relative;
}
.shop-info img{
    height: 0.75rem;
    position: absolute;
    left: 40%;
    top: -0.6rem;
}
.shop-info div{
    height: 0.43rem;
    text-align: center
}
.shop-info h4{
    font-size: 0.2rem;
}

.shop-info p span{
    margin: 0.1rem
}
.shop-info h5{
    height: 0.24rem;
    margin: 0.08rem 0.375rem 0;
    text-align: center;
    font-weight: normal;
}
.shop-info>p{
    margin: 0.08rem 0.375rem 0;
    text-align: center;
    white-space: nowrap;
    width: 3rem;
    text-overflow: ellipsis;
    overflow: hidden;
}
.shop-info h6{
    margin: 0.08rem 0.375rem 0.1rem;
    text-align: center;
    white-space: nowrap;
    width: 3rem;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: normal;
}
.nav{
    height: 0.4rem;

}

.nav li{
    float: left;
    font-size: 0.16rem;
    width: 1.24rem;
    line-height: 0.4rem;
    text-align: center;
    border-bottom: 1px solid #eaeaea;

}
.dp{
    height: 0.88rem;
    padding: 0.07rem 0 0;
}
.dp img{
    height: 100%;
    width: 3.43rem;
    display: block;
    margin: 0 auto;
}
.recommend{
    height: 2.33rem;
    padding: 0.16rem;
}
.recommend h3{
    font-size: 0.16rem;
}
.swiper-container-ul{
  list-style: none;
  overflow: hidden;
  width: 100%;
  background: #fff;
  top: 0;
}
.swiper-container-ul-li{
  width: 50%;
  height: 40px;
  line-height: 40px;
  float: left;
  text-align: center;
}
.actives{
  border-bottom: 1px solid #3190e8;
  color: #3190e8;
}
.content{
  width: 100%;
  overflow: hidden;
}
.left{
  top: 41px;
  float: left;
  width: 25%;
  height: 100%;
  background: #eee;
}
.left ul{
  list-style: none;
}
.left ul li{
  padding: 15px 5px;
  text-align: center;
}
.active{
  background: #fff;
  border-left: 2px solid #3190e8;
}
.right{
  float: left;
  width: 75%;
  height: 100%;
}
.right ul{
  list-style: none;
}
.class-title{
  padding: 7px 10px;
  background: #eee;
}
.item{
  overflow: hidden;
  width: 100%;
  padding: 10px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.item-left{
  float: left;
}
.item-right{
  float: left;
  padding: 0 10px;
}
.item-img{
  width: 100px;
  height: 100px;
  background: #eee;
}
.title{
  width: 100px;
  height: 20px;
  margin-top: 10px;
  background: #eee;
}
.subtitle{
  width: 70px;
  height: 20px;
  margin-top: 10px;
  background: #eee;
}
.price{
  width: 50px;
  height: 20px;
  margin-top: 10px;
  background: #eee;
}
</style>
