<template>
  <div>
      <header>
          <span>正义路北京市人民</span>
      </header>
      <div class="search_wrap">
          <div class="search_in"></div>
      </div>

        <mt-swipe class="shopType" :auto="0"  >
        <mt-swipe-item v-for="array in shopTypeList">
            <div @click="$router.push('/shopList/'+item._id)" v-for="item in array">
                <img :src="'http://127.0.0.1/'+item.shopTypePic">
                <span>{{item.shopType}}</span>
            </div>
        </mt-swipe-item>

        </mt-swipe>

      <div class="adv">
          <div class="adv_up">
              <div class="adv_up_left">
                  <h3>品质套餐</h3>
                  <p>搭配齐全吃得好</p>
                  <h5>立即抢购</h5>
                  <img src="../assets/2.jpeg" alt="">
              </div>
              <div class="adv_up_right">
                  <h3>品质套餐</h3>
                  <p>搭配齐全吃得好</p>
                  <h5>立即抢购</h5>
                  <img src="../assets/2.jpeg" alt="">
              </div>
          </div>
            <mt-swipe :auto="4000" class="adv_blow">
                <mt-swipe-item v-for="item in advList">
                    <img :src="'http://127.0.0.1/'+item.advPic" alt="">
                </mt-swipe-item>
            </mt-swipe>
      </div>
      <div class="getShop">
          <h4>推荐商家</h4>
          <div class="option">
              <ul>
                  <li>综合排序</li>
                  <li>距离最近</li>
                  <li>品质联盟</li>
                  <li>筛选</li>
              </ul>
          </div>
            <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
                <li v-for="item in shopList">
                    <div class="shop-item" @click="$router.push('/detail/'+item._id)">
                        <div class="shop-item-up">
                            <img :src="'http://127.0.0.1/'+item.shopPic" alt="">
                            <div class="item-content">
                                <p>{{item.shopName}}</p>
                                <h5><img src="../assets/star.svg" alt=""> <span>4.7</span>月售1111单 </h5>
                                <h5><span>￥20起送</span><span>配送费￥3</span></h5>
                            </div>
                        </div>
                        <div class="shop-activity">
                            <p>
                                <span>减</span>
                                <span>满69减30，满129减40，满199减50</span>
                            </p>
                            <p>
                                <span>折</span>
                                <span>XB-酸菜炒莜面5折</span>
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'index',
  data () {
    return {
        shopTypeList:[],
        advList:[],
        shopList:[],
        pageIndex:1,
        loading:false,
        pageSum:1,
        shopListById:[]
    };
  },
  methods:{
      getShopTypeList(){
        //   console.log(1)
          axios.get('http://127.0.0.1/getShopTypeList').then(({data})=>{
              this.shopTypeList=data.shopTypeList
          })
      },
      getAdvList(){
          axios.get('http://127.0.0.1/getAdvList',{
              params:{
                  advClass:1
              }
          }).then(({data})=>{
              this.advList=data.advList
            //   console.log(this.advList)
          })
      },
      getShopList(pageIndex){
          axios.get('http://127.0.0.1/getShopList',{
              params:{
                  pageIndex
              }
          }).then(({data})=>{
            //   console.log(data)
            this.loading=false
            this.shopList=this.shopList.concat(data.shopList)
          })
      },
      loadMore(){

          if(this.pageIndex<=this.pageSum){
              this.loading=true;
              this.pageIndex++;
              axios.get('http://127.0.0.1/getShopList',{
              params:{
                  pageIndex:this.pageIndex
              }
          }).then(({data})=>{
            //   console.log(data)
            this.pageSum=data.pageSum
            this.loading=false
            this.shopList=this.shopList.concat(data.shopList)
          })
          }





      }

  },
  mounted(){
      this.getShopTypeList();
      this.getAdvList();
      this.getShopList(this.pageIndex)
  }

}

</script>
<style scoped>

header span{
    float: left;
}
.search_wrap{
    padding: 0.075rem 0.14rem;
    background: rgb(35, 149, 255);
}
.search_in{
    height: 0.36rem;
    background: #fff;
}
.shopType::after{
    content: '';
    display: block;
    clear: both;
}
.shopType{
    height: 1.77rem
}

.shopType .mint-swipe-item div{
    float: left;
    width: 0.75rem;
    height: 0.64rem;
}
.shopType .mint-swipe-item img{
    display: block;
    margin: 0 auto;
    height: 0.45rem;
    width: 0.45rem;
}
.shopType .mint-swipe-item span{
    display: block;
    text-align: center
}
.adv{
    height: 2.27rem;
    padding: 0 0.1rem 0.08rem;
}
.adv_up div::after{
    content: '';
    display: block;
    clear: both;
}
.adv_up::after{
    content: '';
    display: block;
    clear: both;
}
.adv_up{
    height: 1.48rem;
}
.adv_up_left{
    width: 1.61rem;
    height: 1.36rem;
    padding: 0.12rem 0 0 0.15rem;
    position: relative;
    float: left;
}
.adv_up_right{
    width: 1.61rem;
    height: 1.36rem;
    padding: 0.12rem 0 0 0.15rem;
    position: relative;
    float: left;
    margin-left: 0.02rem
}
.adv_up h3{
    font-size: 0.17rem;
    padding-bottom: 0.05rem
}
.adv_up p{
    padding-bottom: 0.09rem;
    font-size: 0.13rem
}
.adv_up h5{
    font-size: 0.12rem;
    font-weight: normal
}
.adv_up img{
    position: absolute;
    bottom:0.08rem;
    right: 0;
    height: 0.8rem;
    width: 1.2rem;
}
.adv_blow{
    height: 0.88rem
}
.adv_blow img{
    height: 0.88rem;
}
.getShop h4{
    text-align: center;
    line-height: 0.36rem;
    font-size: 0.15rem;
    font-weight: normal
}
.option ul{
    height: 0.4rem;
    line-height: 0.4rem;

}
.option li{
    float: left;
    width: 0.93rem;
    text-align: center
}
.shop-item{
    height: 1.44rem;
    padding: 0.15rem 0;
}
.shop-item-up{
    padding: 0 0.1rem;
    height: 0.65rem;
}
.shop-item-up>img{
    float: left;
    height: 0.65rem;
}
.item-content{
    float: left;
    margin-left: 0.1rem
}
.item-content p{
    font-size: 0.15rem;
    font-weight: 700;
}
.item-content h5{
    font-weight: normal;
    font-size: 0.11rem;
}
.item-content h5 span{
    margin: 0 5px;
}
.item-content h5 span:nth-child(1)::after{
    content: '|';
    height: 0.11rem;
    width: 1px;
    margin-left: 5px;
    background: #eaeaea;
}
.shop-activity{
    height: 0.68rem;
    margin-left: 0.85rem;
}
</style>
