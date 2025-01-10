<template>
  <el-row :gutter="20">
    <el-col :span="6"
      ><el-card class="left">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">个人信息</span>
        </div>
        <div class="avatar">
          <el-avatar
            :size="100"
            :src="user.avatar"
            style="margin: 0 70px"
          ></el-avatar>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button size="small" type="primary" style="margin: 5px 80px"
              >点击上传</el-button
            >
          </el-upload>
        </div>

        <div class="list">
          <ul class="list-group">
            <li class="list-group-item">
              <i class="el-icon-user-solid">用户名称</i>
              <div class="pull-right">{{ user.name }}</div>
            </li>
            <li class="list-group-item">
              <i class="el-icon-male">性别</i>
              <div class="pull-right">{{ user.sex }}</div>
            </li>
            <li class="list-group-item">
              <i class="el-icon-sugar">年龄</i>
              <div class="pull-right">{{ user.age }}</div>
            </li>
            <li class="list-group-item">
              <i class="el-icon-mobile-phone">手机号码</i>
              <div class="pull-right">{{ user.telphone }}</div>
            </li>
            <li class="list-group-item">
              <i class="el-icon-message">用户邮箱</i>
              <div class="pull-right">{{ user.email }}</div>
            </li>
            <li class="list-group-item">
              <i class="el-icon-s-custom">所属角色</i>
              <div class="pull-right">{{ role }}</div>
            </li>
            <li class="list-group-item">
              <i class="el-icon-position">地址</i>
              <div class="pull-right">{{ user.address }}</div>
            </li>
          </ul>
        </div>
      </el-card>
    </el-col>
    <el-col :span="18"
      ><el-card class="right">
        <div slot="header" class="clearfix">
          <span style="font-weight: bold">修改个人信息</span>
        </div>
        <el-tabs value="first">
          <el-tab-pane label="基本资料" name="first"
            ><user-info :user="user"></user-info
          ></el-tab-pane>
          <el-tab-pane label="修改密码" name="second"
            ><reset-pwd></reset-pwd
          ></el-tab-pane>
        </el-tabs> </el-card
    ></el-col>
  </el-row>
</template>

<script>
import resetPwd from "./resetPwd.vue";
import userInfo from "./userInfo.vue";
export default {
  components: { resetPwd, userInfo },
  data() {
    return {
      user: {},
      role: "",
    };
  },
  component: {
    userInfo,
    resetPwd,
  },
  created() {
    this.getAdminInfo();
  },
  methods: {
    getAdminInfo() {
      this.user = this.$store.state.user.userInfo;
      if (this.$store.state.user.roleId === 2) {
        this.role = "超级管理员";
      } else {
        this.role = "普通用户";
      }
    },
  },
};
</script>

<style scoped>
.left {
  width: 100%;
  height: 500px;
}
.right {
  width: 100%;
  height: 500px;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e7eaec;
  border-top: 1px solid #e7eaec;
  margin-bottom: -1px;
  padding: 11px 0px;
  font-size: 13px;
}
</style>
