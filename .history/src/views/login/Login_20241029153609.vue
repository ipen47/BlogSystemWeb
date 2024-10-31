<template>
  <div class="login-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="login-title">🔐后台管理系统</span>
      </div>
      <div class="login-form">
        <el-form :model="form" :rules="loginRules" ref="loginForm">
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="form.name"
              auto-complete="off"
              placeholder="请输入用户名"
            >
              <template slot="prepend"
                ><i style="font-size: 20px" class="el-icon-user"></i
              ></template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              show-password
              auto-complete="off"
              placeholder="请输入密码"
            >
              <template slot="prepend"
                ><i style="font-size: 20px" class="el-icon-key"></i
              ></template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              plain
              style="width: 100%"
              type="primary"
              @click="handleLogin"
              :loading="loading"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
        <router-link to="/regist"
          ><el-link type="info" icon="el-icon-link" :underline="false"
            >没有账户？点击注册</el-link
          >
        </router-link>
      </div>
    </el-card>
  </div>
</template>
<script>
import login from "@/api/login.js";
export default {
  name: "Login",

  data() {
    return {
      loading: false,
      form: {
        name: "admin",
        password: "123456",
      },
      loginRules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted: function () {},
  methods: {
    handleLogin() {
      this.$refs.loginForm
        .validate()
        .then(() => {
          this.loading = true;
          let _this = this;
          //异步请求后台接口 登录操作
          setTimeout(() => {
            login(this.form)
              .then(function (resp) {
                if (resp.code == -1) {
                  //错误提示
                  _this.$notify({
                    title: "用户名不存在",
                    message: "请重新输入",
                    type: "error",
                  });
                  //重置用户名和密码
                  _this.form.name = "";
                  _this.form.password = "";
                }
                if (resp.code == -2) {
                  //错误提示
                  _this.$notify({
                    title: "密码错误",
                    message: "请重新输入",
                    type: "error",
                  });
                  //重置用户名和密码
                  _this.form.name = "";
                  _this.form.password = "";
                }
                if (resp.code == 0) {
                  //成功提示
                  _this.$notify({
                    title: "登录成功",
                    message: `欢迎~~${resp.data.name}`,
                    type: "success",
                  });
                  //保存当前用户信息
                  localStorage.setItem(
                    "access-admin",
                    JSON.stringify(resp.data)
                  );
                  _this.$router.push("/home");
                }
              })
              .catch(function (error) {
                console.log(error);
              });
            this.loading = false;
          }, 1000);
        })
        .catch((error) => {
          this.$message({
            message: "输入错误！",
            type: "warning",
          });
        });
    },
  },
};
</script>
<style scoped>
.login-page {
  background-image: linear-gradient(180deg, #2af598 30%, #009efd 100%);
  /* background-image: url("/src/assets/banner/banner5.jpg");
  background-repeat: no-repeat;
  background-size: 100%; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-title {
  font-size: 20px;
}

.box-card {
  width: 375px;
  position: relative;
}
.el-link {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>
