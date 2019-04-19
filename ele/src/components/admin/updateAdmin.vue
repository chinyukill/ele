<template>
  <el-form ref="updateForm" :model="updateForm" :rules="rules">
    <h4>修改密码</h4>
    <el-form-item prop="passWord">
        <el-input ref="passWord" v-model="updateForm.passWord" type="text" placeholder="旧密码"></el-input>
    </el-form-item>
    <el-form-item prop="newPassWord">
        <el-input ref="newPassWord" v-model="updateForm.newPassWord" type="password" placeholder="新密码"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button style="width:100%" type="primary" @click="updateAdminPassWord('updateForm')">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name:'update-admin',
  data () {
    return {
      rules:{
            passWord:[
                { required: true, message: '请输入旧密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            newPassWord:[
                { required: true, message: '请输入新密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
        },
        updateForm:{
            passWord:'',
            newPassWord:''
        }
    };
  },
  methods:{
    updateAdminPassWord(form){
      this.$refs[form].validate((v)=>{
        if(v){
          var _this=this;
          this.$store.dispatch('updateAdminPassWord',{
              adminId:localStorage.adminId,
              passWord:this.updateForm.passWord,
              newPassWord:this.updateForm.newPassWord,
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
}

</script>
<style scoped>
.el-form{
  width: 350px;
  margin: 0 auto;
  border: 1px solid #eaeaea;
  padding: 30px;
}
.el-form h4{
  text-align: center
}
</style>