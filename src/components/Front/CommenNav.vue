<template>
  <div>
    <!-- 通用导航部分 -->
    <div class="index-nav">
      <div class="logo" @click="$router.push('/')">
        <el-image
          style="width: 100px; height: 60px"
          :src="logoUrl"
          :fit="fits"
        ></el-image>
        <span class="title">花荣博客</span>
      </div>
      <div
        style="margin-right: auto; cursor: pointer"
        @click="$router.push('/')"
      >
        <i class="el-icon-arrow-left">返回</i>
      </div>
      <el-dropdown style="margin-right: 40px">
        <span class="el-dropdown-link">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <span style="margin-left: 11px; font-size: 14px; color: #666"
            >消息<el-badge class="mark" is-dot
          /></span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            >评论和@ <el-badge class="mark" is-dot
          /></el-dropdown-item>
          <el-dropdown-item
            >赞和收藏 <el-badge class="mark" is-dot
          /></el-dropdown-item>
          <el-dropdown-item
            >私信 <el-badge class="mark" is-dot
          /></el-dropdown-item>
          <el-dropdown-item
            >系统通知 <el-badge class="mark" is-dot
          /></el-dropdown-item>
          <el-dropdown-item>
            消息设置 <el-badge class="mark" is-dot
          /></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      fits: " scale-down  ",
      logoUrl:
        "https://peng12.oss-cn-beijing.aliyuncs.com/08f790529822720ebb5da98571cb0a46f21fab3a.png",
    };
  },
  created() {
    //获取用户登录信息
    this.userInfo = this.$store.state.user.userInfo;
  },
  methods: {},
};
</script>

<style scoped>
.index-nav {
  padding: 0px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
  margin-right: 50px;
  cursor: pointer;
}
.title {
  color: #35e0b8;
  font-size: 24px;
  font-weight: bold;
}

.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.el-dropdown-item {
  text-align: center;
}
</style>
