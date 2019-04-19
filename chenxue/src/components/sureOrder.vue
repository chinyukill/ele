<template>
  <div>
      <header>确认订单</header>
      <div>
          <ul>
              <li v-for="v in cartGoodsList">

                <div v-for="item in v.cartGoods">
                      <img :src="'http://127.0.0.1/'+item.goodsPic" alt="">
                      {{item.goodsName}}
                      <span>X{{v.buyNum}}</span>
                      <span>￥{{item.goodsPrice}}</span>
                      <span>￥{{v.buyNum*item.goodsPrice}}</span>
                </div>
              </li>
          </ul>
      </div>
      <div class="footer">
          <span>{{price}}</span>
          <span class="goDeal" @click="goDeal">去支付</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'sure-order',
  data () {
    return {
        cartGoodsList:[],
        price:0
    };
  },
  methods:{
      getCartList(){
          axios.get('http://127.0.0.1/getCartList',{
              params:{
                  phone:localStorage.phone
              }
          }).then(({data})=>{
              this.cartGoodsList=data.cartGoodsList;
              this.getPrice()
          })
      },
      getPrice(){
          this.cartGoodsList.map(v=>{
              v.cartGoods.map(item=>{
                  this.price+=(v.buyNum*item.goodsPrice)
              })
          })
      },
      goDeal(){
          axios.get('http://127.0.0.1/deal',{
              params:{
                  phone:localStorage.phone,
                  price:this.price
              }
          }).then(({data})=>{
              this.getCartList()
              this.$router.push('/mine')
          })
      }
  },
  mounted(){
      this.getCartList()
  }

}

</script>
<style scoped>
.footer{
    height: 0.44rem;
    background: rgb(60, 60, 60);
    width: 100%;
    color: #fff;
    line-height: 0.44rem
}
.goDeal{
    float: right;
    width: 1.05rem;
    background: rgb(0, 224, 103);
    text-align: center;
}
</style>
