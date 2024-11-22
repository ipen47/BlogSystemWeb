<template>
  <!-- 获取动态菜单 -->
  <div>
    <div v-for="menu in menuTree" :key="menu.menuId">
      <!-- 循环获取一级菜单 -->
      <el-menu-item :index="menu.path" v-if="menu.children.length === 0">
        <i :class="menu.icon"></i><span>{{ menu.menuName }}</span>
      </el-menu-item>
      <!-- 循环获取子菜单 -->
      <el-submenu :index="menu.path" v-else>
        <template slot="title">
          <i :class="menu.icon"></i><span>{{ menu.menuName }}</span>
        </template>
        <!-- 递归调用组件实现多级子菜单 -->
        <menuTree :menuTree="menu.children"></menuTree>
      </el-submenu>
    </div>
  </div>
</template>
<script>
export default {
  name: "MenuTree",
  props: ["menuTree"],
};
</script>
