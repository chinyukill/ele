<template>
  <div>
    <!-- <el-button type="text" @click="dialogFormVisible=true">添加店铺类别</el-button> -->
    <el-dialog :title="$store.state.shop.shopTypeInfo?'修改店铺类别':'添加店铺类别'" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="店铺类别名称" label-width="120px">
                <el-input style="width:150px;" ref="shopType" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排序" label-width="120px">
                <el-input style="width:150px;" ref="orderNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类别图片" label-width="120px">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action=""
                    :limit="1"
                    :on-exceed="fn"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <img width="100" v-if="shopTypePic.length>0" :src="'http://127.0.0.1/'+shopTypePic" alt="">
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addShopType">确 定</el-button>
          </div>
    </el-dialog>
  
  </div>
</template>

<script>
export default {
  name:'shop-type-dialog',
  data () {
    return {
        dialogFormVisible: false,
        shopTypeInfo:{},
        shopTypePic:''
    };
  },
  methods:{
    fn(){
      this.$message.error("只能上传一张图片")
    },
    addShopType(){
      if(this.shopTypeInfo){
        console.log(1)
        this.$refs.upload.clearFiles();
        var formdata=new FormData();
        formdata.set("shopType",this.$refs.shopType.$data.currentValue);
        formdata.set("orderNum",this.$refs.orderNum.$data.currentValue);
        formdata.set("shopTypePic",document.querySelector('.el-upload__input').files[0]);
        formdata.set("adminId",localStorage.adminId);
        formdata.set("_id",this.shopTypeInfo._id)
        var _this=this;
        var adminId=localStorage.adminId;
        this.$store.dispatch('updateShopType',{formdata,success(flag,msg){
            _this.$refs.shopType.$data.currentValue='';
            _this.$refs.orderNum.$data.currentValue='';
            _this.dialogFormVisible=flag;
            _this.$message({
              type:'success',
              message:msg
            })
        }})
      }else{
        console.log(2)
        this.$refs.upload.clearFiles();
        var formdata=new FormData();
        formdata.set("shopType",this.$refs.shopType.$data.currentValue);
        formdata.set("orderNum",this.$refs.orderNum.$data.currentValue);
        formdata.set("shopTypePic",document.querySelector('.el-upload__input').files[0]);
        formdata.set("adminId",localStorage.adminId)
        var _this=this;
        var adminId=localStorage.adminId;
        this.$store.dispatch('addShopType',{formdata,success(flag,msg){
            _this.$refs.shopType.$data.currentValue='';
            _this.$refs.orderNum.$data.currentValue='';
            _this.dialogFormVisible=flag;
            _this.$message({
              type:'success',
              message:msg
            })
        }})
        }
    },
   
  },
  mounted(){
    
  },
  updated(){
    if(this.$store.state.shop.shopTypeInfo && this.dialogFormVisible){
      this.shopTypeInfo=this.$store.state.shop.shopTypeInfo;
       this.$refs.shopType.$data.currentValue=this.shopTypeInfo.shopType;
       this.$refs.orderNum.$data.currentValue=this.shopTypeInfo.orderNum;
       this.shopTypePic=this.shopTypeInfo.shopTypePic;
    }else{
      this.shopTypeInfo=this.$store.state.shop.shopTypeInfo;
      this.shopTypePic='';
      this.$refs.shopType.$data.currentValue='';
      this.$refs.orderNum.$data.currentValue='';
    }
  }

}

</script>
<style scoped>
</style>