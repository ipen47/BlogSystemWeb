const { defineConfig } = require("@vue/cli-service");

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     // 配置路径别名
    //     "@": resolve("src"),
    //   },
    // },
  },

  //代理转发
  // devServer: {
  //   proxy: {
  //     "/api": {
  //       // 请求相对路径以/api开头的, 才会走这里的配置
  //       target: process.env.VUE_APP_BASE_URL, // 后台接口域名 我们要代理的真实的接口地址
  //       changeOrigin: true, // 改变请求来源(欺骗后台你的请求是从http://c.m.163.com)
  //       pathRewrite: {
  //         "^/api": "", // 因为真实路径中并没有/api这段, 所以要去掉这段才能拼接正确地址转发请求
  //       },
  //     },
  //   },
  // },
  chainWebpack(config) {
    // 禁用系统内部对svg的处理
    config.module.rule("svg").exclude.add(resolve("src/assets/icon")).end();
    // 新建规则处理svg文件
    config.module
      .rule("icons")
      .test(/\.svg$/) //添加匹配规则
      .include.add(resolve("src/assets/icon")) //添加我们要处理的文件路径
      .end() //上面的add方法改变了上下文，调用end()退回到include这一级
      .use("svg-sprite-loader") //使用"svg-sprite-loader"依赖
      .loader("svg-sprite-loader") //选中这个依赖
      .options({
        symbolId: "icon-[name]", // 这个配置是这个包的配置不属于webpack，可以查看相关文档，symbolId指定我们使用svg图片的名字
      })
      .end();
  },

  transpileDependencies: true,

  lintOnSave: false,
});
