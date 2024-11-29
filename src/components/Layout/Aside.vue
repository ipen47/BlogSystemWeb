<template>
  <el-aside style="width: auto">
    <el-menu
      router
      unique-opened
      default-active="/"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <!-- 动态生成多级菜单 -->
      <MenuTree :menuTree="menuTree" :isCollapse="isCollapse"></MenuTree>
    </el-menu>
  </el-aside>
</template>
<script>
import MenuTree from "@/components/Layout/MenuTree.vue";
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
  computed: {},
  created() {
    this.getMenuTree();
  },
  methods: {
    getMenuTree() {
      this.menuTree = this.$store.state.menu.menuTree;
      console.log(this.menuTree);
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
/* 确保折叠时隐藏文字 */
.el-menu--collapse .el-menu-item span {
  display: none !important;
}
</style>
