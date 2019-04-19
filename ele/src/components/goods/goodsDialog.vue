<template>
  <el-dialog title="添加商品" :visible.sync="goodsVisible">
      <el-form>
          <el-form-item label="商品名称">
            <el-input autocomplete="off" ref="goodsName"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input autocomplete="off" ref="goodsPrice"></el-input>
          </el-form-item>
          <el-form-item label="是否热销">
            <el-radio v-model="radio" ref="isHot" label="1">是</el-radio>
            <el-radio v-model="radio" ref="isHot" label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
            class="upload-demo"
            ref="upload"
            action=""
            :limit="1"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <img width="100" :src="'http://127.0.0.1/'+this.goodsPic" alt="">
          </el-form-item>
          <el-form-item label="所属店铺">
            <el-select @change="changeType" v-model="$store.state.shop.shopId" placeholder="请选择">
              <el-option
              v-for="item in $store.state.shop.shopList"
              :key="item._id"
              :label="item.shopName"
              :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品类型">
            <!-- 商品类型这里还有bug 商品类型应该是店铺下的类型，不是所有的 -->
            <el-select v-model="$store.state.goods.goodsTypeId" placeholder="请选择">
              <el-option
              v-for="item in $store.state.goods.goodsTypeByShop"
              :key="item._id"
              :label="item.goodsTypeName"
              :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
            <el-button @click="shopVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGoods">确 定</el-button>
      </div>
  </el-dialog>
</template>

<script>
export default {
  name:'goods-dialog',
  data () {
    return {
      goodsVisible:false,
      radio:"1",
      goodsPic:''
    };
  },
  methods:{
    changeType(){
      this.$store.commit('CHANGE_GOODSTYPE_ID','')
      this.$store.dispatch('getGoodsTypeByShop',{id:this.$store.state.shop.shopId})
    },
    addGoods(){
      var formdata=new FormData();
      formdata.set('goodsName',this.$refs.goodsName.$data.currentValue);
      formdata.set('goodsPrice',this.$refs.goodsPrice.$data.currentValue);
      formdata.set('isHot',this.radio);
      formdata.set('goodsPic',document.querySelector('.el-upload__input').files[0])
      formdata.set('shopId',this.$store.state.shop.shopId);
      formdata.set('goodsTypeId',this.$store.state.goods.goodsTypeId);
      formdata.set('adminId',localStorage.adminId);
      var _this=this
      this.$store.dispatch('addGoods',{formdata,success(flag,msg){
        _this.goodsVisible=flag
        _this.$message({
          type:'success',
          message:msg
        })
      }})
    }
  },
  mounted(){
    this.goodsInfo=this.$store.state.goods.goodsInfo;
    this.$store.dispatch('getShop');
    this.$store.dispatch('getGoodsTypeByShop',{id:this.goodsInfo.shopId})
  },
  updated(){
      console.log(1)

    if(this.$store.state.goods.goodsInfo && this.goodsVisible){
      this.$refs.goodsName.$data.currentValue=this.goodsInfo.goodsName;
      this.$refs.goodsPrice.$data.currentValue=this.goodsInfo.goodsPrice;
      this.radio=this.goodsInfo.isHot;
      this.goodsPic= this.goodsInfo.goodsPic
    }
  }

}

</script>
<style scoped>
</style>
