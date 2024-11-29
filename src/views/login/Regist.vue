<template>
  <div class="login-page">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="regist-title">🔐后台管理系统</span>
      </div>
      <div class="regist-form">
        <el-form :model="registForm" :rules="registRules" ref="registForm">
          <el-form-item prop="username">
            <el-input
              type="text"
              v-model="registForm.name"
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
              v-model="registForm.password"
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
              @keyup.enter="handleRegist"
              @click="handleRegist"
              :loading="loading"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
        <router-link to="/login"
          ><el-link type="info" icon="el-icon-link" :underline="false"
            >已有用户？点击登录</el-link
          >
        </router-link>
      </div>
    </el-card>
  </div>
</template>
<script>
import { regist } from "@/api/login";
export default {
  name: "regist",
  data() {
    return {
      loading: false,
      registForm: {
        name: "",
        password: "",
      },
      registRules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted: function () {},
  methods: {
    handleRegist() {
      this.$refs.registForm
        .validate()
        .then(() => {
          this.loading = true;
          //异步请求后台接口 登录操作
          setTimeout(() => {
            regist(this.registForm)
              .then((resp) => {
                console.log(resp);
                if (resp.code == -1) {
                  //重置用户名和密码
                  this.registForm.name = "";
                  this.registForm.password = "";
                }
                if (resp.code == 200) {
                  //成功提示
                  this.$notify({
                    title: "注册成功",
                    message: "请登录",
                    type: "success",
                  });

                  this.$router.push("/login");
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
  background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);
  /* background-image: url("/src/assets/banner/banner5.jpg");
  background-repeat: no-repeat; */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.regist-title {
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
