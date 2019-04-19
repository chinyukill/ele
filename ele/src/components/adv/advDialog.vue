<template>
   <el-dialog title="增加广告"  :visible.sync="advVisible">
          <el-form>
            <el-form-item label="广告名">
              <el-input autocomplete="off" ref="advName"></el-input>
            </el-form-item>
            <el-form-item label="广告类别">
                <el-radio v-model="radio" ref="advClass" label="1">1</el-radio>
                <el-radio v-model="radio" ref="advClass" label="2">2</el-radio>
                <el-radio v-model="radio" ref="advClass" label="3">3</el-radio>
                <el-radio v-model="radio" ref="advClass" label="4">4</el-radio>
            </el-form-item>
            <el-form-item label="广告图片">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action=""
                    :limit="1"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="advVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAdv">确 定</el-button>
          </div>
        </el-dialog>

</template>

<script>
export default {
  name:'adv-dialog',
  data () {
    return {
        radio:"1",
        advVisible:false
    };
  },
  methods:{
      addAdv(){
          var formdata=new FormData();
            formdata.set('advName',this.$refs.advName.$data.currentValue);
            formdata.set('advClass',this.radio);
            formdata.set('advPic',document.querySelector('.el-upload__input').files[0])
            formdata.set('adminId',localStorage.adminId);
            var _this=this;
            console.log(1222)
            this.$store.dispatch('addAdv',{formdata,success(flag,msg){
                _this.goodsVisible=flag
                _this.$message({
                type:'success',
                message:msg
                })
            }})
      },

  },


}

</script>
<style scoped>
</style>
