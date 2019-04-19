<template>
  <div>
      <el-button type="text" @click="openAdvDialog">添加广告</el-button>
      <advDialog ref="$aDialog"></advDialog>
      <el-table :data="$store.state.adv.advList" border>
      <el-table-column label="id" prop="_id" width="220"></el-table-column>
      <el-table-column label="商品类别" prop="advName" width="100"></el-table-column>

      <el-table-column label="图片" width="140px">
      <template slot-scope="scope">
        <img width="120" :src="'http://127.0.0.1/'+scope.row.advPic" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteGoodType(scope.row._id)">删除</el-button>
          <el-button size="mini" @click="openGoodsDialog(scope.row._id)">增加商品</el-button>
          <el-button size="mini" @click="updateGoodType(scope.row._id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import advDialog from './advDialog'
export default {
  name:'get-adv',
  data () {
    return {
    };
  },
  components:{
      advDialog
  },
  methods:{
      openAdvDialog(){
         this.$refs.$aDialog.advVisible=true
      }
  },
  mounted(){
      this.$store.dispatch('getAdv')
  }
}

</script>
<style scoped>
</style>
