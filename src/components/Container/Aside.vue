<template>
  <el-aside style="width: auto">
    <el-menu
      router
      unique-opened
      default-active="/"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i><span>首页</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-user"></i><span>用户管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-platform"></i><span>系统管理</span>
        </template>

        <el-menu-item index="/character" style="padding-left: 80px">
          ​ <i class="el-icon-s-custom"></i><span>角色管理</span> ​
        </el-menu-item>

        <el-menu-item index="/auth" style="padding-left: 80px">
          ​ <i class="el-icon-unlock"></i><span>权限管理</span> ​
        </el-menu-item>
        <el-menu-item index="/menu" style="padding-left: 80px">
          ​ <i class="el-icon-menu"></i><span>菜单管理</span> ​
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-shop"></i><span>商品模块</span>
        </template>
        <el-menu-item index="/product" style="padding-left: 80px">
          ​ <i class="el-icon-s-management"></i><span>商品管理</span> ​
        </el-menu-item>
        <el-menu-item index="/addProduct" style="padding-left: 80px">
          <i class="el-icon-plus"></i><span>添加商品</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-document-copy"></i><span>订单管理</span>
        </template>
        <el-menu-item index="/orderList" style="padding-left: 80px">
          <i class="el-icon-menu"></i><span>订单列表</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-s-data"></i><span>数据统计</span>
        </template>
        <el-menu-item index="/line" style="padding-left: 80px">
          <i class="el-icon-star-on"></i><span>折线图</span>
        </el-menu-item>
        <el-menu-item index="/bar" style="padding-left: 80px">
          <i class="el-icon-s-data"></i><span>柱形图</span>
        </el-menu-item>
        <el-menu-item index="/pie" style="padding-left: 80px">
          <i class="el-icon-star-off"></i><span>饼图</span> ​
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/screen">
        <i class="el-icon-loading"></i><span>数据大屏</span>
      </el-menu-item>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-position"></i><span>地图</span>
        </template>

        <el-menu-item index="/baidu">
          <i class="el-icon-map-location"></i><span>百度地图</span>
        </el-menu-item>
        <el-menu-item index="/gaode">
          <i class="el-icon-map-location"></i><span>高德地图</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/text">
        <i class="el-icon-edit"></i><span>我的笔记</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  props: ["isCollapse"],
};
</script>
<style scoped>
.el-aside {
  background-color: #d6e3f0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu {
  background-color: #d6e3f0;

  border-right: none;
}
.el-menu.el-menu--collapse {
  width: 60px;
}
</style>
