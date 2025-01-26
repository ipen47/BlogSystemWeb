<template>
  <div class="system-notice">
    <div class="title">系统公告</div>
    <el-timeline>
      <el-timeline-item
        v-for="item in noticesData"
        :key="item.noticeId"
        :timestamp="item.createTime"
      >
        {{ item.noticeContent }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getNoticeList } from "@/api/notice";
export default {
  data() {
    return {
      noticesData: [],
    };
  },
  created() {
    this.getNoticeData();
  },
  methods: {
    async getNoticeData() {
      let res = await getNoticeList();
      this.noticesData = res.data.filter((item) => item.noticeType === 2);
    },
  },
};
</script>

<style scoped>
.system-notice {
  width: 50%;

  margin: 20px auto;
  padding: 20px 40px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
}
</style>
