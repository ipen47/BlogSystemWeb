<template>
  <!-- 轮播图 -->
  <el-carousel height="500px" indicator-position="outside">
    <el-carousel-item v-for="item in banner" :key="item">
      <el-image style="height: 500px; width: 100%" :src="item"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  data() {
    return {
      //走马灯图片
      banner: [
        "https://peng12.oss-cn-beijing.aliyuncs.com/Blog/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2/20230308044720.png",
        "https://peng12.oss-cn-beijing.aliyuncs.com/Blog/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2/article04.png",
        "https://peng12.oss-cn-beijing.aliyuncs.com/Blog/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2/IEALczmzHvjdiuHGI5ROA5nYWnDl3ihXkNobQnaY.webp",
        "https://peng12.oss-cn-beijing.aliyuncs.com/Blog/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2/article09.png",
        "https://peng12.oss-cn-beijing.aliyuncs.com/Blog/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2/article10.jpeg",
        "https://peng12.oss-cn-beijing.aliyuncs.com/Blog/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2/article13.jpeg",
      ],
    };
  },
};
</script>

<style scoped></style>
