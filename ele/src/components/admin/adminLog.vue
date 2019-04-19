<template>
  <div>
    <el-table :data="$store.state.admin.adminLogList" border style="width: 100%">
      <el-table-column prop="_id" label="Id">
      </el-table-column>
      <el-table-column label="管理员">
          <template  slot-scope="scope">
              {{scope.row.adminInfo[0].adminName}}
          </template>
      </el-table-column>
      <el-table-column label="类型">
          <template  slot-scope="scope">
              {{scope.row.typeInfo[0].typeDescribe}}
          </template>
      </el-table-column>
      <el-table-column label="添加时间">
        <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.addTime | date}}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="detail" label="细节">
      </el-table-column>
      
      
       <el-table-column label="操作">
            <template slot-scope="scope">
                <!--<el-button-->
                    <!--size="mini"-->
                    <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div>
        <el-pagination background layout="prev, pager, next" :page-count="$store.state.admin.pageSum" :current-page.sync="$store.state.admin.pageIndex" @current-change="$store.dispatch('getAdminLogList')">
        </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'adminLog',
  data () {
    return {
    };
  },
  methods:{
     handleDelete(index,row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            var id=row._id;
            this.$store.dispatch('deletaAdminLog',{id});
            // this.$store.dispatch('getAdminLogList')
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
      }
    },
  mounted(){
    this.$store.dispatch('getAdminLogList')
    
  }

}

</script>
<style scoped>
</style>