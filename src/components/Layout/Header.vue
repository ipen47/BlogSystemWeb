<template>
  <!-- 头部界面 -->
  <el-header>
    <!-- 折叠图标 -->
    <i v-show="!isCollapse" class="icon el-icon-s-fold" @click="change"></i>
    <i v-show="isCollapse" class="icon el-icon-s-unfold" @click="change"></i>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="item in breadcrumbList"
        :key="item.path"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <!-- 下拉菜单 -->
    <el-dropdown>
      <span class="el-dropdown-link">
        <span style="margin-right: 10px">{{ adminInfo.name }}</span>
        <el-avatar size="medium" :src="adminInfo.avatar"></el-avatar
        ><i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/userCenter"
          ><el-dropdown-item icon="el-icon-user"
            >个人中心</el-dropdown-item
          ></router-link
        >
        <el-dropdown-item icon="el-icon-thumb" @click.native="loginIndex">
          返回前台</el-dropdown-item
        >
        <el-dropdown-item icon=" el-icon-switch-button" @click.native="LogOut">
          退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>
<script>
import globalConfig from "@/utils/gloabl.config";
export default {
  props: ["isCollapse"],

  data() {
    return {
      url: "https://gitee.com/y_project/RuoYi-Vue",
      // 定义用户登录对象
      adminInfo: {},
    };
  },
  computed: {
    breadcrumbList() {
      let matched = this.$route.matched;
      console.log("matched:", matched);
      // matched[0].path = "/home";
      let invaildList = globalConfig.invaildRoutes;
      //失效路由名单
      //循环将不用跳转的路由置为空
      for (let item of matched) {
        if (invaildList.indexOf(item.path) != -1) {
          //路由在失效路由名单中，将其设为空
          item.path = "";
        }
      }
      return this.$route.matched;
    },
  },
  created() {
    //获取用户登录信息
    this.adminInfo = this.$store.state.user.userInfo;
  },
  methods: {
    goto() {
      window.open(this.url);
    },
    change() {
      this.$emit("changeshow");
    },
    //返回前台页面
    loginIndex() {
      this.$router.push("/");
      this.$message({
        message: "欢迎回来",
        type: "success",
      });
    },
    //退出登录
    LogOut() {
      this.$confirm("确定要退出当前用户登录界面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then((res) => {
            console.log(res);
            location.reload();
          });

          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
};
</script>
<style scoped>
* {
  text-decoration: none;
}
.el-header {
  display: flex;
  align-items: center;
  background-color: #7fb7d7;
  color: rgb(17, 3, 3);
  text-align: center;
  line-height: 60px;
}

.el-breadcrumb {
  margin-left: 5px;
}
.el-dropdown {
  margin-left: auto;
}
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  color: rgb(8, 1, 1);
}
</style>
