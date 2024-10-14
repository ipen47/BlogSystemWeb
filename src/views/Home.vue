<template>
  <!-- 登录成功界面布局 -->
  <div class="block">
    <el-container style="height: 100%">
      <!-- 侧边栏 -->
      <Aside :isCollapse="isCollapse"></Aside>
      <el-container>
        <!-- 头部 -->
        <Header @changeshow="changeshow" :isCollapse="isCollapse"></Header>
        <!-- 中间显示界面主体 -->
        <Main></Main>
        <!-- 底部 -->
        <el-footer>
          <Footer></Footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "../components/Container/Header.vue";
import Aside from "../components/Container/Aside.vue";
import Main from "../components/Container/Main.vue";
import Footer from "../components/Container/Footer.vue";
export default {
  components: {
    Header,
    Aside,
    Main,
    Footer,
  },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeshow() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style scoped>
* {
  padding: 0px;
  margin: 0px;
  text-decoration: none;
}
.block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.el-footer {
  background-color: #e49724;
  color: rgb(248, 243, 243);
  text-align: center;
  line-height: 60px;
}
</style>
