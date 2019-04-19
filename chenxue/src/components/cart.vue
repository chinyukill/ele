<template>
  <div>
      <button v-if="buyNum>0" @click="changeBuyNum(id,1)">-</button>
      <span v-if="buyNum>0">{{buyNum}}</span>
      <button  @click="changeBuyNum(id,2)">+</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'cart',
  props:['id'],
  data () {
    return {
        buyNum:0
    };
  },
  methods:{
      changeBuyNum(id,type){
        //   console.log(id)
          if(localStorage.phone){
              //购物车加减
              axios.get('http://127.0.0.1/updateCart',{
                  params:{
                      id,
                      type,
                      phone:localStorage.phone
                  }
              }).then(({data})=>{
                  if(data.ok==1){
                      axios.get('http://127.0.0.1/getCart',{
                        params:{
                            id:this.id,
                            phone:localStorage.phone
                        }
                    }).then(({data})=>{
                        this.buyNum=data.buyNum;
                        this.$emit('totalPrice',data.buyNum,data.goodsPrice/1,type)
                    })
                  }

              })
          }else{
              this.$router.push('/login')
          }
      },
      getCart(){
          axios.get('http://127.0.0.1/getCart',{
              params:{
                  id:this.id,
                  phone:localStorage.phone
              }
          }).then(({data})=>{
              this.buyNum=data.buyNum;
              this.$emit('totalPrice',data.buyNum,data.goodsPrice/1)
          })
      }
  },
  mounted(){
      this.getCart();

  }

}

</script>
<style scoped>
</style>
