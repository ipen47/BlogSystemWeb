<template>
  <!-- 首页导航部分 -->
  <div class="index-nav">
    <div class="logo" @click="$router.push('/')">
      <el-image
        style="width: 100px; height: 60px"
        :src="logoUrl"
        :fit="fits"
      ></el-image>
      <span class="title">花荣博客</span>
    </div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item index="/index">首页</el-menu-item>
      <el-menu-item index="/articleCategory">文章分类</el-menu-item>
      <el-menu-item index="/news">热点资讯</el-menu-item>
      <el-menu-item index="/questionSub">问题反馈</el-menu-item>
      <el-menu-item index="/peopleCenter">个人中心</el-menu-item>
    </el-menu>
    <!-- 搜索 -->
    <div style="margin-right: auto">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        size="small"
        class="input-with-select"
        style="color: blue"
        clearable
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="编程" value="1"></el-option>
          <el-option label="美食" value="2"></el-option>
          <el-option label="旅游" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <!-- 如果未登录，则显示登录按钮 -->
    <el-button
      v-if="!userInfo"
      type="text"
      style="margin-right: 10px"
      @click="$router.push('/login')"
      >登录|注册</el-button
    >
    <!-- 如果登录，则显示登录信息 -->
    <el-dropdown v-else style="margin-right: 10px">
      <span class="el-dropdown-link">
        <el-avatar size="medium" :src="userInfo.avatar"></el-avatar
        ><span style="margin-left: 5px">{{ userInfo.name }}</span
        ><i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/userCenter"
          ><el-dropdown-item icon=" el-icon-user"
            >个人中心</el-dropdown-item
          ></router-link
        >
        <el-dropdown-item
          icon=" el-icon-thumb"
          v-if="userInfo.roleId === 2"
          @click.native="loginHome"
          >登录后台</el-dropdown-item
        >

        <el-dropdown-item icon=" el-icon-switch-button" @click.native="LogOut">
          退出登录</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getNewNotice } from "@/api/notice";
export default {
  data() {
    return {
      userInfo: {},
      fits: " scale-down  ",
      logoUrl:
        "https://peng12.oss-cn-beijing.aliyuncs.com/08f790529822720ebb5da98571cb0a46f21fab3a.png",

      input: "",
      select: "",
    };
  },
  created() {
    //获取用户登录信息
    this.userInfo = this.$store.state.user.userInfo;
  },
  methods: {
    handleSelect() {},
    //登录后台
    loginHome() {
      this.$router.push("/home");
      //获取最新公告
      getNewNotice({ noticeType: 2 }).then((resp) => {
        this.$alert(`${resp.data.noticeContent}`, `${resp.data.noticeTitle}`, {
          confirmButtonText: "确定",
        }).catch((err) => {});
      });
      console.log("aaa");
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
.index-nav {
  padding: 0px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e7eaec;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
  margin-right: auto;
  cursor: pointer;
}
.title {
  color: #35e0b8;
  font-size: 24px;
  font-weight: bold;
}
/* 中间的菜单项 */
.el-menu-demo {
  display: flex;
  justify-content: space-between;
  margin-right: auto;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  color: rgb(8, 1, 1);
}
.el-dropdown-item {
  text-align: center;
}
</style>
