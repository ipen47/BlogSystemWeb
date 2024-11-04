import Vue from "vue";
import SvgIcon from "@/components/SvgIcon";

// 全局注册svg组件
Vue.component("svg-icon", SvgIcon);
// 工程化导入svg图片
const req = require.context("./svg", false, /\.svg$/);
// 定义一个加载目录的函数
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
// 加载目录下的所有svg文件
let res = requireAll(req);
