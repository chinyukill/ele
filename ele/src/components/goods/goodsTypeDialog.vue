<template>
  <el-dialog title="增加商品类型" :visible.sync="goodsTypeVisible">
      <el-form>

          <el-form-item label="商品类型">
              <el-input autocomplete="off" ref="goodsTypeName"></el-input>
          </el-form-item>
          <el-form-item label="店铺">
              <el-select v-model="$store.state.shop.shopId" placeholder="请选择">
                  <el-option
                  v-for="item in $store.state.shop.shopList"
                  :key="item._id"
                  :label="item.shopName"
                  :value="item._id">
                  </el-option>
              </el-select>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="goodsTypeVisible=false">取消</el-button>
          <el-button type="primary" @click="addShopType">确定</el-button>
      </div>
  </el-dialog>
</template>

<script>
export default {
  name:'goods-type-dialog',
  data () {
    return {
        goodsTypeVisible:false,
        goodsTypeInfo:{}
    };
  },
  methods:{
      addShopType(){
          if(this.goodsTypeInfo){
              var formdata=new FormData();
                formdata.set("goodsTypeName",this.$refs.goodsTypeName.$data.currentValue);
                formdata.set("shopId",this.$store.state.shop.shopId);
                formdata.set("adminId",localStorage.adminId);
                formdata.set("_id",this.goodsTypeInfo._id);
                var _this=this;
                this.$store.dispatch('updateGoodsType',{formdata,success(flag,msg){
                        _this.goodsTypeVisible=flag;
                        _this.$refs.goodsTypeName.$data.currentValue='';
                        _this.$message({
                            message:msg,
                            type: 'success'
                        });
                }})
          }else{
                var formdata=new FormData();
                formdata.set("goodsTypeName",this.$refs.goodsTypeName.$data.currentValue);
                formdata.set("shopId",this.$store.state.shop.shopId);
                formdata.set("adminId",localStorage.adminId);
                var _this=this;
                this.$store.dispatch('addGoodsType',{formdata,success(flag,msg){
                        _this.goodsTypeVisible=flag;
                        _this.$refs.goodsTypeName.$data.currentValue='';
                        _this.$message({
                            message:msg,
                            type: 'success'
                        });
                }})
          }
      }

  },
  mounted(){

  },
  updated(){
      console.log(2)
     this.goodsTypeInfo=this.$store.state.goods.goodsTypeInfo;
    if(this.$store.state.goods.goodsTypeInfo && this.goodsTypeVisible){
         console.log(this.$store.state.goods.goodsTypeInfo)
        this.$refs.goodsTypeName.$data.currentValue=this.goodsTypeInfo.goodsTypeName;
    }else if(!this.$store.state.goods.goodsTypeInfo && this.goodsTypeVisible){
        console.log(this.$store.state.goods.goodsTypeInfo)
        this.$refs.goodsTypeName.$data.currentValue='';
    }
  }

}

</script>
<style scoped>
</style>
