<template>
  <div class="login-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="login-title">🔐花蓉博客管理系统</span>
      </div>
      <div class="login-form">
        <el-form :model="form" :rules="loginRules" ref="loginForm">
          <!-- 用户名 -->
          <el-form-item prop="name">
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
          <!-- 密码 -->
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
          <!-- 验证码 -->
          <el-form-item prop="verCode">
            <el-input
              v-model="form.verCode"
              auto-complete="off"
              placeholder="请输入验证码"
              style="width: 65%"
              @keyup.enter.native="handleLogin"
            >
              <template slot="prepend"
                ><i style="font-size: 20px" class="el-icon-user"></i
              ></template>
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" class="login-code-img" @click="getCode" />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              plain
              style="width: 100%"
              type="primary"
              @click="handleLogin"
              :loading="loading"
              ><span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span></el-button
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
import { login } from "@/api/login";
import { getCodeImg } from "@/api/captcha";
import { getNewNotice } from "@/api/notice";
export default {
  name: "Login",

  data() {
    return {
      loading: false,
      form: {
        name: "admin",
        password: "123456",
        verCode: "",
        verKey: "",
      },
      codeUrl: "",

      loginRules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        verCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getCode();
  },
  mounted: function () {},
  methods: {
    getCode() {
      this.form.verCode = "";
      getCodeImg()
        .then((resp) => {
          this.form.verKey = resp.data.key;
          this.codeUrl = resp.data.codeImg;
        })
        .catch((err) => {});
    },
    handleLogin() {
      this.$refs.loginForm
        .validate()
        .then(() => {
          this.loading = true;
          //异步请求后台接口 登录操作
          setTimeout(() => {
            login(this.form)
              .then((resp) => {
                console.log(resp);
                if (resp.code == -1) {
                  //重置用户名和密码
                  this.form.name = "";
                  this.form.password = "";
                }
                if (resp.code == -2) {
                  this.form.verCode = "";
                  this.getCode();
                }

                if (resp.code == 200) {
                  //成功提示
                  this.$notify({
                    title: "登录成功",
                    message: `欢迎~~${resp.data.name}`,
                    type: "success",
                  });
                  //保存当前用户信息
                  localStorage.setItem(
                    "access-admin",
                    JSON.stringify(resp.data)
                  );
                  this.$router.push("/");
                  //获取最新公告
                  getNewNotice().then((resp) => {
                    this.$alert(
                      `${resp.data.noticeContent}`,
                      `${resp.data.noticeTitle}`,
                      {
                        confirmButtonText: "确定",
                      }
                    );
                  });
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
.login-code {
  width: 33%;
  height: 38px;
  float: right;
}
.login-code img {
  cursor: pointer;
  vertical-align: middle;
}
.login-code-img {
  height: 30px;
}
</style>
