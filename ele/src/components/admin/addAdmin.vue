<template>
  <el-form ref="addForm" :model="addForm" :rules="rules">
    <h4>增加管理员</h4>
    <el-form-item prop="adminName">
        <el-input ref="adminName" v-model="addForm.adminName" type="text" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item prop="passWord">
        <el-input ref="passWord" v-model="addForm.passWord" type="password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button style="width:100%" type="primary" @click="addAdmin('addForm')">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name:'add-admin',
  data () {
    return {
      rules:{
            adminName:[
                { required: true, message: '请输入要注册的管理员', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            passWord:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
        },
        addForm:{
            adminName:'',
            passWord:'',
        }
    };
  },
  methods:{
    addAdmin(form){
      this.$refs[form].validate((v)=>{
        if(v){
          var _this=this;
          this.$store.dispatch('addAdmin',{
              adminName:this.addForm.adminName,
              adminPassWord:this.addForm.passWord,
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