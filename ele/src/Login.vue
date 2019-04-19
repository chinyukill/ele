<!--  -->
<template>
<el-form class="login_container" ref="loginForm" :model="loginForm" :rules="rules">
    <h4>饿了么后台管理登陆</h4>
    <el-form-item prop="adminName">
        <el-input ref="adminName" type="text" placeholder="用户名" v-model="loginForm.adminName"></el-input>
    </el-form-item>
    <el-form-item prop="passWord">
        <el-input ref="passWord" type="password" placeholder="密码" v-model="loginForm.passWord"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button style="width:100%" type="primary" @click="goLogin('loginForm')">登录</el-button>
    </el-form-item>
</el-form>
      
      
</template>

<script>
import axios from 'axios'
export default {
  name: "Login",
  data(){
      return {
        rules:{
            adminName:[
                { required: true, message: '请输入管理员名称', trigger: 'blur' },
            ],
            passWord:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
        },
        loginForm:{
            adminName:'',
            passWord:''
        }
    };
  },
  methods:{
      goLogin(form){
          this.$refs[form].validate((v)=>{
              if(v){
                  var _this=this;
                  this.$store.dispatch('login',{
                      adminName:this.loginForm.adminName,
                      adminPassWord:this.loginForm.passWord,
                      success(msg){
                          _this.$message({
                            message: msg,
                            type: 'success'
                            });
                      },
                      fail(msg){
                          _this.$message.error(msg);
                      }
                  })
              }
          })
      }
  }
};
</script>
<style scoped>
.login_container{
    width: 350px;
    margin: 100px auto;
    border: 1px solid #eaeaea;
    padding:10px 35px;
    box-shadow: 0 0 20px #bbb;
}
.login_container h4{
    text-align: center;
    font-size: 18px;
    font-weight: normal;
}
</style>