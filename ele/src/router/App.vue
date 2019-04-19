<template>
  <el-container class="wrap">
    <el-header style="background:pink">
      <el-row>
        <el-col :span="8" class="logo" :style="{width:isCollapse?'64px':'240px'}">{{isCollapse?'ELE':'饿了么管理系统'}}</el-col>
        <el-col :span="8" class="tool"><i :class="isCollapse?'el-icon-caret-left':'el-icon-caret-bottom'" @click="isCollapse=!isCollapse"></i> </el-col>
        <el-col :span="8" class="admin_info">
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="./assets/admin.jpeg">
              <span>{{$store.state.admin.adminName}}</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="$store.commit('OUT_LOGIN')">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
  <el-container class="blow">
    <el-aside :width="isCollapse?'auto':'240px'">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
      :collapse-transition="false"
      :collapse="isCollapse">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title" @click="$router.push('/')">查看日志</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">管理员管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1" @click="$router.push('/updateAdmin')">修改密码</el-menu-item>
            <el-menu-item index="2-2" @click="$router.push('/admin')">查看管理员</el-menu-item>
            <el-menu-item index="2-3" @click="$router.push('/addAdmin')">添加管理员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">店铺管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="$router.push('/getShopType')">店铺类型管理</el-menu-item>
            <el-menu-item index="3-2" @click="$router.push('/getShop')">店铺管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="$router.push('/getGoodsType')">商品类型管理</el-menu-item>
            <el-menu-item index="4-2" @click="$router.push('/getGoods')">商品管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="5">
          <i class="el-icon-menu"></i>
          <span slot="title" @click="$router.push('/getAdv')">广告管理</span>
        </el-menu-item>
    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  data(){
      return {
          isCollapse:false
      }
  },
};
</script>

<style>
html,body{
  height: 100%;
  margin: 0;
}
.wrap{
  height: 100%
}
.el-header{
  padding: 0;
  height: 60px;
  background: pink;
  color: #fff;
}
.logo{
        font-size:25px;
        text-align:center;
        line-height:60px;
        border-right:1px solid rgba(238,241,146,0.3);
        width:240px;
    }
    .tool{
        font-size:30px;
        line-height:60px;
    }
.admin_info{
  float: right;
  text-align: right;
  line-height: 60px;
  padding-right: 20px;
  color: #fff;
}
.admin_info img{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  vertical-align: middle;
}
.blow{
  height: 100%;
}
.el-menu-vertical-demo{
  background: pink;
  height: 100%
}
</style>
