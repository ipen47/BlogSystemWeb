const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  //代理转发
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       // 请求相对路径以/api开头的, 才会走这里的配置
  //       target: process.env.VUE_APP_BASE, // 后台接口域名 我们要代理的真实的接口地址
  //       changeOrigin: true, // 改变请求来源(欺骗后台你的请求是从http://c.m.163.com)
  //       pathRewrite: {
  //         "^/api": "", // 因为真实路径中并没有/api这段, 所以要去掉这段才能拼接正确地址转发请求
  //       },
  //     },
  //   },
  // },
  transpileDependencies: true,

  lintOnSave: false,
});
