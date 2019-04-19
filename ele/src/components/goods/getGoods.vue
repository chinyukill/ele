<template>
  <div>
    <goodsDialog ref="$gDialog"></goodsDialog>
    <div>
      <el-button type="text" @click="openGoodsDialog">添加商品</el-button>
    </div>

    <el-table :data="$store.state.goods.goodsList" border>
      <el-table-column label="id" prop="_id" width="220"></el-table-column>
      <el-table-column label="商品名称" prop="goodsName" width="100"></el-table-column>
      <el-table-column label="商品价格" prop="goodsPrice" width="100"></el-table-column>
      <el-table-column label="所属店铺" width="100">
        <template slot-scope="scope" >
          {{scope.row.shopInfo[0].shopName}}
        </template>
      </el-table-column>
      <el-table-column label="所属类型" width="100">
        <template slot-scope="scope" >
          {{scope.row.goodsTypeInfo[0].goodsTypeName}}
        </template>
      </el-table-column>
      <el-table-column label="是否热销" width="100">
        <template slot-scope="scope" >
          <div v-if="scope.row.isHot==1">
            是
          </div>
          <div v-else>
            否
          </div>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="140px">
      <template slot-scope="scope">
        <img width="120" :src="'http://127.0.0.1/'+scope.row.goodsPic" alt="">
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="160">
        <template slot-scope="scope">
          {{scope.row.addTime | date}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteGood(scope.row._id)">删除</el-button>
          <!-- <el-button size="mini" @click="openGoodsDialog(scope.row._id,scope.row.shopId)">修改商品</el-button> -->
          <el-button size="mini" @click="editGoods(scope.row._id,scope.row.shopId,scope.row.goodsTypeId)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import goodsDialog from './goodsDialog'
export default {
  name:'get-goods',
  data () {
    return {
    };
  },
  components:{
    goodsDialog
  },
  methods:{
    openGoodsDialog(){
      this.$store.dispatch('getShop');
      this.$store.commit('CHANGE_GOODSINFO','')
      this.$refs.$gDialog.goodsVisible=true
    },
    deleteGood(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this=this;
          var adminId=localStorage.adminId
          this.$store.dispatch('deleteGoods',{id,adminId,success(flag,msg){
              _this.$refs.$gDialog.goodsVisible=flag
              _this.$message({
              type: 'success',
              message:msg
              });
          }})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    },
    editGoods(id,shopId,goodsTypeId){
      var _this=this
      this.$store.commit('CHANGE_SHOPID',shopId);
      this.$store.commit('CHANGE_GOODSTYPE_ID',{goodsTypeId})
      this.$store.dispatch('getShopTypeById',{shopId,success(flag){
        _this.$refs.$gDialog.goodsVisible=flag
      }})
      this.$store.dispatch('getGoodsInfo',{id})
    }
  },
  mounted(){
    this.$store.dispatch('getGoodsList')
  }

}

</script>
<style scoped>
</style>
