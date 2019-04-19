<template>
  <div>
      <el-table :data="$store.state.admin.adminList" border style="width: 100%">
      <el-table-column prop="_id" label="Id">
      </el-table-column>
      
      <el-table-column prop="adminName" label="用户名">
      </el-table-column>
      <el-table-column label="添加时间">
        <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.addTime | date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
            <template slot-scope="scope">
                <!--<el-button-->
                    <!--size="mini"-->
                    <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index,scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:'admin',
  data () {
    return {
    };
  },
  mounted(){
    
    this.$store.dispatch('getAdminList')
  }

}

</script>
<style scoped>
</style>