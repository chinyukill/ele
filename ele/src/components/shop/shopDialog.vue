<template>

      <el-dialog title="增加店铺"  :visible.sync="shopVisible">
          <el-form>
            <el-form-item label="店铺名">
              <el-input autocomplete="off" ref="shopName"></el-input>
            </el-form-item>
            <el-form-item label="店铺类别">
                <el-select v-model="$store.state.shop.shopTypeId" placeholder="请选择">
                    <el-option
                    v-for="item in $store.state.shop.shopTypeList"
                    :key="item._id"
                    :label="item.shopType"
                    :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺图片">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action=""
                    :limit="1"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <img  width="100" :src="'http://127.0.0.1/'+shopPic" alt="">
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="shopVisible = false">取 消</el-button>
                <el-button type="primary" @click="addShop">确 定</el-button>
          </div>
        </el-dialog>

</template>

<script>
export default {
  name:'shop-dialog',
  props:["shopPicF"],
  data () {
    return {
        shopVisible: false,
        shopInfo:{},
        shopPic:""
    };
  },
  methods:{
      addShop(){
            if(this.shopInfo){
                var formdata=new FormData();
                var _this=this;
                formdata.set('shopName',this.$refs.shopName.$data.currentValue);
                formdata.set('shopPic',document.querySelector('.el-upload__input').files[0]);
                formdata.set('shopTypeId',this.$store.state.shop.shopTypeId);
                formdata.set('adminId',localStorage.adminId);
                formdata.set('_id',this.shopInfo._id)
                this.$store.dispatch('updateShop',{
                    formdata,
                    success(flag,msg){
                    _this.shopVisible=flag;
                    _this.$refs.shopName.$data.currentValue='';
                    _this.$refs.upload.clearFiles();
                    _this.$message({
                        message:msg,
                        type: 'success'
                    });
                }})
            }else{
                var formdata=new FormData();
                var _this=this;
                formdata.set('shopName',this.$refs.shopName.$data.currentValue);
                formdata.set('shopPic',document.querySelector('.el-upload__input').files[0]);
                formdata.set('shopTypeId',this.$store.state.shop.shopTypeId);
                formdata.set('adminId',localStorage.adminId)
                this.$store.dispatch('addShop',{
                    formdata,
                    success(flag,msg){
                    _this.shopVisible=flag;
                    _this.$refs.shopName.$data.currentValue='';
                    _this.$refs.upload.clearFiles();
                    _this.$message({
                        message:msg,
                        type: 'success'
                    });
                }})
          }

      }
  },
  mounted(){
      this.$store.dispatch('getShopType')
      this.shopPic=this.shopPicF||'';

  },
  updated(){
      if(this.$store.state.shop.shopInfo && this.shopVisible){
          this.shopInfo=this.$store.state.shop.shopInfo;
          this.$refs.shopName.$data.currentValue=this.shopInfo.shopName;
          this.shopPic=this.shopInfo.shopPic
      }else if(!this.$store.state.shop.shopInfo && this.shopVisible){
            this.shopInfo=this.$store.state.shop.shopInfo
            this.$refs.shopName.$data.currentValue=''
            this.shopPic=''
      }

  }

}

</script>
<style scoped>
</style>
