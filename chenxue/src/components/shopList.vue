<template>
  <div>
      <header>{{shopTypeName}}</header>
      <div>
           <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
                <li  v-for="item in shopListById">
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
  name:'shop-list',
  data () {
    return {
        shopTypeName:'',
        shopListById:[],
        loading:false,
    };
  },
  methods:{
      loadMore(){
          if(this.pageIndex<=this.pageSum){
              this.loading=true;
              this.pageIndex++;
              axios.get('http://127.0.0.1/getShopListById',{
              params:{
                  pageIndex:this.pageIndex
              }
          }).then(({data})=>{
            //   console.log(data)
            this.pageSum=data.pageSum
            this.loading=false
            this.shopListById=this.shopListById.concat(data.shopListById)
          })
          }
      }
  },
  mounted(){
    var id=this.$route.params.id;
    axios.get('http://127.0.0.1/getShopListById',{
        params:{
            id
        }
    }).then(({data})=>{
        this.shopListById=data.shopListById;
        // console.log(this.shopListById)

    })
    axios.get('http://127.0.0.1/getShopType',{
        params:{
            id
        }
    }).then(({data})=>{
        this.shopTypeName=data.shopTypeInfo.shopType
    })
  }
}

</script>
<style scoped>
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
