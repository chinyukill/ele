<template>
<div>
  <el-button type="text" @click="addShop">添加店铺类别</el-button>
  <shopTypeDialog ref="stDialog"></shopTypeDialog>
  <div>
    <el-table :data="$store.state.shop.shopTypeList" border style="width: 100%">
      <el-table-column prop="_id" label="店铺类型id" width="180">
    </el-table-column>
    <el-table-column prop="shopType" width="100px" label="店铺类型">
    </el-table-column>
    <el-table-column prop="orderNum" width="100px" label="排序">
    </el-table-column>
    <el-table-column label="添加时间" width="180px">
      <template slot-scope="scope">
        {{scope.row.addTime | date}}
      </template>
    </el-table-column>
    <el-table-column label="图片" width="140px">
      <template slot-scope="scope">
        <img width="120" :src="'http://127.0.0.1/'+scope.row.shopTypePic" alt="">
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button type="primary" size="mini" @click="openShopDialog(scope.row._id)">增加店铺</el-button>
        
      </template>
    </el-table-column>
  </el-table>
     
  </div>
  <shopDialog ref="sDialog" :shopPicF="shopPic"></shopDialog>
</div>
</template>

<script>
import shopTypeDialog from './shopTypeDialog';
import shopDialog from './shopDialog';
export default {
  name: "get-type-list",
  data() {
    return {
      shopTypeInfo:{},
      shopPic:""
    };
  },
  components:{
    shopTypeDialog,
    shopDialog
  },
  methods:{
    handleDelete(index,row){
      var id=row._id;
      var adminId=localStorage.adminId;
      this.$confirm('将删除此店铺类型并此类型下的所有店铺, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('deleteShopType',{id,adminId})
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });




      
    },
    openShopDialog(id){
        this.$store.commit('CHANGE_SHOPINFO',{});
        this.$store.commit('CHANGE_SHOPTYPEID',id);
        this.$refs.sDialog.$data.shopVisible=true;
    },
    handleEdit(index, row){
      var id=row._id;
      var _this=this
      this.$store.dispatch('getShopTypeById',{id,success(flag){
        _this.$refs.stDialog.$data.dialogFormVisible=flag;
      }})
    },
    addShop(){
      this.$refs.stDialog.$data.dialogFormVisible=true;
      this.$store.commit('CHANGE_TYPEINFO',{})
    }
  },
  mounted(){
    this.$store.dispatch('getShopType');
  }
};
</script>
<style scoped>
</style>