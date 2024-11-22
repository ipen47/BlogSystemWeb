<template>
  <el-aside style="width: auto">
    <el-menu
      router
      unique-opened
      default-active="/index"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <!-- 动态生成多级菜单 -->
      <MenuTree :menuTree="menuTree"></MenuTree>
    </el-menu>
  </el-aside>
</template>
<script>
import MenuTree from "@/components/MenuTree";
import { createMenu } from "@/api/menu";
export default {
  props: ["isCollapse"],
  components: {
    MenuTree,
  },
  data() {
    return {
      menuTree: [],
    };
  },
  created() {
    this.getMenuTree();
  },
  methods: {
    getMenuTree() {
      createMenu()
        .then((res) => {
          this.menuTree = res.data;
          console.log(res);
        })
        .catch((err) => {});
    },
  },
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
