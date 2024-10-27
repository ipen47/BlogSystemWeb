<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script></script>
<style>
/* 优化滚动条 */
::-webkit-scrollbar {
  /* 滚动条宽度 */
  width: 6px;
  /* 滚动条的高度 */
  height: 10px;
}
/*  滚动条的滑块 */
::-webkit-scrollbar-thumb {
  /* 设置滚动条的颜色 */
  background-color: #bec7d5;
  /* 设置滚动条的圆角 */
  border-radius: 3px;
}

/* 修改表格(el-table)的滚动条 */
.el-table__body-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/* 滚动条的滑块 */
.el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #bec7d5;
  border-radius: 3px;
}
</style>
