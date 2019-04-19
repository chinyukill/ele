<template>
    <div class="wrap">
        <h3>饿了么</h3>
        <form action="">
            <p>
                <input v-model="phone" class="phone" name="phone" type="text" placeholder="手机号">
                <input  class="get-verify" @click="getVerify" type="button" value="获取验证码">
            </p>
            <p>
                <input v-model="verifyCode" class="verify" name="verify" type="text" placeholder="验证码">
            </p>
            <p>新用户登录即自动注册，并表示已同意</p>
        <button class="go-login" @click="goLogin">登录</button>
        </form>
        <h5>关于我们</h5>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'login',
  data () {
    return {
        phone:'',
        verifyCode:''
    };
  },
  methods:{
      getVerify(){
          axios.get('http://127.0.0.1/getVerify',{
              params:{
                  phone:this.phone
              }
          }).then(({data})=>{
              console.log(data)
              this.verifyCode=data.verifyCode
          })
      },
      goLogin(){
          axios.post('http://127.0.0.1/goLogin',{
              phone:this.phone,
              verifyCode:this.verifyCode
          }).then(({data})=>{
              if(data.ok===1){
                  localStorage.phone=this.phone;
                  this.$router.push('/mine')
              }


          })
      }
  }

}

</script>
<style scoped>

.wrap{
    padding:0.4rem 0.375rem 0;
}
h3{
    font-size: 0.3rem;
    text-align: center;
    color: rgb(35, 149, 255);
}
p{
    position: relative;
}
form{
    margin-top: 0.16rem
}
.get-verify{
    position: absolute;
    top: 20%;
    right: 0.1rem;
    border: none;
    outline: none;
    background: none;
}
.phone,.verify{
    height: 0.48rem;
    width: 2.85rem;
    padding-left: 0.1rem;
    margin-bottom: 0.16rem;
    border-radius: 0.05rem;
    outline: none;
    border: 1px solid #eaeaea
}
.go-login{
    background: rgb(76, 217, 111);
    border: none;
    margin-top: 0.3rem;
    height: 0.42rem;
    width: 3rem;
    color: #fff;
    font-size: 0.16rem;
}
h5{
    text-align: center;
    margin-top: 0.2rem;
    font-weight: normal;
}
</style>
