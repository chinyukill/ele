<template>
  <div>
    <div>
    <el-input size="mini" style="width:250px;" v-model="matchShop"></el-input>
    <el-button size="mini" type="primary" @click="getMatchShop">查询</el-button>
    <el-button type="text" @click="openShopDialog">添加店铺</el-button>
    <shopDialog ref="$sDialog"></shopDialog>
    <goodsTypeDialog ref="$gtDialog"></goodsTypeDialog>
    <goodsDialog ref="$gDialog"></goodsDialog>
    </div>
    <div>
      <el-table :data="$store.state.shop.shopList" border>
        <el-table-column prop="shopName" width="120px" label="店铺名"></el-table-column>
        <el-table-column label="店铺图片" width="120px">
          <template slot-scope="scope">
            <img width="100" :src="'http://127.0.0.1/'+scope.row.shopPic" alt="">
          </template>
        </el-table-column>
        <el-table-column width="120px" label="店铺类别">
          <template slot-scope="scope">
            {{scope.row.typeInfo[0].shopType}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editShop(scope.row._id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteShop(scope.row._id)">删除</el-button>
            <el-button size="mini" type="primary">进入店铺</el-button>
            <el-button size="mini" type="primary" @click="openGoodsTypeDialog(scope.row._id)">增加商品类型</el-button>
            <el-button size="mini" type="primary" @click="openGoodsDialog(scope.row._id)">增加商品</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import shopDialog from './shopDialog'
import goodsTypeDialog from '@/components/goods/goodsTypeDialog';
import goodsDialog from '@/components/goods/goodsDialog'
export default {
  name:'get-shop',
  data () {
    return {
      matchShop:''
    };
  },
  components:{
    shopDialog,
    goodsTypeDialog,
    goodsDialog
  },
  methods:{
    getMatchShop(){
      var _this=this;
      var matchShop=this.matchShop
      this.$store.dispatch("getMatchShop",{matchShop,success(msg){
        _this.$message({
          type:"success",
          message:msg
        })
      }})
    },
    openShopDialog(){
      this.$store.commit('CHANGE_SHOPTYPEID','');
      this.$store.commit('CHANGE_SHOPINFO',{});
      this.$refs.$sDialog.shopVisible=true;
      
    },
    openGoodsTypeDialog(id){
      this.$store.commit('CHANGE_GOODSTYPE_INFO',{})
      this.$store.commit('CHANGE_SHOPID',id);
      this.$refs.$gtDialog.goodsTypeVisible=true
    },
    editShop(id){
      var _this=this
      this.$store.dispatch('getShopById',{id,success(flag){
        _this.$refs.$sDialog.shopVisible=flag
      }});

    },
    deleteShop(id){
      var _this=this
      this.$store.dispatch('deleteShop',{
        id,
        adminId:localStorage.adminId,
        success(msg){
          _this.$message({
            type:'success',
            message:msg
          })
        },fail(msg){
           _this.$message({
            type:'error',
            message:msg
          })
        }
      })
    },
    openGoodsDialog(id){//店铺id，要根据此找出此店铺下的类型
      this.$store.commit("CHANGE_SHOPID",id);
      this.$store.commit('CHANGE_GOODSTYPE_ID','')
      this.$store.dispatch('getGoodsTypeByShop',{id});
      this.$store.commit('CHANGE_GOODSINFO','')
      this.$refs.$gDialog.goodsVisible=true
    }
  },
  mounted(){
    this.$store.dispatch('getShop')
  }

}

</script>
<style scoped>
</style>