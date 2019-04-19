<template>
  <div>
    <goodsTypeDialog ref="$gtDialog"></goodsTypeDialog>
    <goodsDialog  ref="$gDialog"></goodsDialog>
    <div>
    <el-input size="mini" style="width:250px;" ></el-input>
    <el-button size="mini" type="primary">查询</el-button>
    <el-button type="text" @click="openGoodsTypeDialog">添加商品类型</el-button>

    </div>
    <el-table :data="$store.state.goods.goodsTypeList" border>
      <el-table-column label="id" prop="_id" width="220"></el-table-column>
      <el-table-column label="商品类别" prop="goodsTypeName" width="100"></el-table-column>
      <el-table-column label="所属店铺" width="100">
        <template slot-scope="scope">
          {{scope.row.shopInfo[0].shopName}}
        </template>
      </el-table-column>
      <el-table-column label="添加时间" width="160">
        <template slot-scope="scope">
          {{scope.row.addTime | date}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteGoodType(scope.row._id)">删除</el-button>
          <el-button size="mini" @click="openGoodsDialog(scope.row._id,scope.row.shopId)">增加商品</el-button>
          <el-button size="mini" @click="updateGoodType(scope.row._id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import goodsTypeDialog from './goodsTypeDialog';
import goodsDialog from './goodsDialog'
export default {
  name:'get-goods-type',
  data () {
    return {
    };
  },
  methods:{
    openGoodsTypeDialog(){
      this.$store.commit('CHANGE_GOODSTYPE_INFO',{})
      this.$store.commit("CHANGE_SHOPID",'');
      this.$refs.$gtDialog.goodsTypeVisible=true
    },
    deleteGoodType(id){
      this.$confirm('此操作将永久删除此商品类型以及以下所有商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this=this
          var adminId=localStorage.adminId
          this.$store.dispatch('deleteGoodType',{id,adminId,success(msg){
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
    updateGoodType(id){//是商品类型id
      var _this=this
      this.$store.dispatch('getGoodsTypeById',{id,success(flag,shopId){
        _this.$store.commit('CHANGE_SHOPID',shopId);
        _this.$refs.$gtDialog.goodsTypeVisible=flag
      }});
      this.gDialog=true
    },
    openGoodsDialog(id,shopId){//有商品的类型id
      this.$store.dispatch('getGoodsTypeByShop',{id:shopId});
      this.$store.commit('CHANGE_SHOPID',shopId)
      this.$store.commit('CHANGE_GOODSTYPE_ID',id)
      this.$store.commit('CHANGE_GOODSINFO','')
      this.$refs.$gDialog.goodsVisible=true;
      this.gDialog=true
    }
  },
  components:{
    goodsTypeDialog,
    goodsDialog
  },
  mounted(){
    this.$store.dispatch('getShop')
    this.$store.dispatch('getGoodsType')

  }

}

</script>
<style scoped>
</style>
