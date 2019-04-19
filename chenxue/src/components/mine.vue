<template>
  <div>
      <header>我的</header>
      <div class="login">
          <img src="../assets/tx.png" alt="">
          <div class="login_right">
              <h4 v-if="userName.length===0" @click="$router.push('/login')">登录/注册</h4>
              <h4 v-else>fdksd3124432</h4>
              <p v-if="userName.length===0">登录后享受更多特权</p>
              <p v-else>{{userName}}</p>
          </div>
      </div>
      <div class="money">
          <ul>
              <li>
                    <i  v-if="userName.length===0" class="iconfont icon-jinbi"></i>
                    <i v-else>￥0.00</i>
                    <span>钱包</span>
              </li>
              <li>
                    <i  v-if="userName.length===0" class="iconfont icon-hongbao"></i>
                    <i v-else>0</i>
                    <span>红包</span>
              </li>
              <li>
                  <i  v-if="userName.length===0" class="iconfont icon-coin"></i>
                  <i v-else>{{goldNum}}</i>
                  <span>金币</span>
              </li>
          </ul>
      </div>
      <div class="area1">
            <p>
                <i class="iconfont icon-place"></i>
                我的地址
            </p>
      </div>
      <div class="area2">
            <p>
                <i class="iconfont icon-tubiaozhizuomoban-"></i>
                金币商城
            </p>
            <p>
                <i class="iconfont icon-liwu"></i>
                分享拿十元现金
            </p>
      </div>
      <div class="area3">
            <p>
                <i class="iconfont icon-kefu"></i>
                我的客服
            </p>
            <p>
                <i class="iconfont icon-eliaomo"></i>
                下载饿了么App
            </p>
      </div>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'mine',
  data () {
    return {
        userName:'',
        goldNum:0
    };
  },
  methods:{
      getUser(){
          axios.get('http://127.0.0.1/getUser',{
              params:{
                  phone:localStorage.phone
              }
          }).then(({data})=>{
              console.log(data)
              this.goldNum=data.userInfo.goldNum
          })
      }
  },
  mounted(){
      this.getUser()
      this.userName=localStorage.phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");

  }

}

</script>
<style scoped>
.login{
    height: 0.6rem;
    background: rgb(35, 149, 255);
    padding: 0.25rem 0.15rem;
}
.login img{
    display: block;
    float: left;
    height: 100%;
    border-radius: 50%;
}
.login_right{
    float: left;
    margin-left: 0.18rem;
    color: #fff;
}
.login_right h4{
    font-size: 0.21rem;
    margin-bottom: 0.08rem;
}
.money{
    height: 0.84rem;

}
.money li{
    float: left;
    height: 0.44rem;
    width: 1.24rem;
    padding: 0.2rem 0;
    border-right: 1px solid #eaeaea;
}
.money li:nth-child(1) .iconfont{
    color: rgb(245, 166, 35)
}
.money li:nth-child(2) .iconfont{
    color: rgb(216, 30, 6);
}
.money li:nth-child(3){
    border: none
}
.money li:nth-child(3) .iconfont{
    color: rgb(106, 194, 11)
}
.money .iconfont{
    font-size: 0.26rem;
    width: 0.26rem;
    display: block;
    margin: 0 auto;
}
.money span{
    font-size: 0.12rem;
    font-weight: 700;
    display: block;
    margin: 0.05rem auto 0;
    width: 0.26rem;
}
.area1{
    height: 0.445rem;
    line-height: 0.445rem;
    font-size: 0.16rem;
    padding-left: 0.25rem;
    background: #fff;
    margin-top: 0.1rem;
    box-shadow: 0 0 5px #aeaeae
}
.area2{
    height: 0.895rem;
    line-height: 0.445rem;
    font-size: 0.16rem;
    padding-left: 0.25rem;
    background: #fff;
    margin-top: 0.1rem;
   box-shadow: 0 0 5px #aeaeae
}
.area3{
    height: 0.895rem;
    line-height: 0.445rem;
    font-size: 0.16rem;
    padding-left: 0.25rem;
    background: #fff;
    margin-top: 0.1rem;
    box-shadow: 0 0 5px #aeaeae
}
.area2 p:nth-child(1),.area3 p:nth-child(1){
    border-bottom: 1px solid #eaeaea;
    /* border-top: 1px solid #eaeaea */
}
.area1 .iconfont,.area2 .iconfont,.area3 .iconfont{
    margin-right: 0.1rem;
}
</style>
