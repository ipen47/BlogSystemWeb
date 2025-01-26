<template>
  <div class="my-feedback">
    <div class="title">我的反馈</div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        label="反馈标题"
        align="center"
        width="180px"
        prop="title"
      >
      </el-table-column>
      <el-table-column
        label="反馈内容"
        align="center"
        width="240px"
        prop="content"
      />

      <el-table-column
        label="反馈时间"
        align="center"
        prop="submitTime"
        width="180"
      />
      <el-table-column label="回复内容" align="center" prop="reply" width="240">
      </el-table-column>
      <el-table-column label="回复状态" align="center" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.reply" type="success" size="small"
            >已回复</el-tag
          >
          <el-tag v-else type="warning" size="small">未回复</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="回复时间"
        align="center"
        prop="replyTime"
        width="180"
      />

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页部分 -->
    <el-pagination
      style="margin: 10px 10px"
      background
      @current-change="pageChange"
      layout="total,prev, pager, next"
      :total="total"
      :page-size.sync="pagesize"
      :current-page.sync="currentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { feedbackList, Delete } from "@/api/feedback";
export default {
  data() {
    return {
      tableData: [
        {
          feedbackId: 1,
          title: "测试",
          content: "测试",
          userName: "admin",
          submitTime: "2025-09-09",
          reply: "测试",
          replyTime: "2024-09-09",
        },
        {
          feedbackId: 2,
          title: "测试",
          content: "测试",
          userName: "admin",
          submitTime: "2025-09-09",
          reply: "",
          replyTime: "",
        },
      ],
      // 分页信息
      currentPage: 1,
      pagesize: 5,
      total: 7,
    };
  },
  created() {
    this.getMyFeedback();
  },
  methods: {
    async getMyFeedback() {
      let userId = this.$store.getters.userId;
      const res = await feedbackList({
        currentPage: this.currentPage,
        pagesize: this.pagesize,
      });

      this.tableData = res.data.records.filter((item) => {
        return item.userId === userId;
      });
      this.total = this.tableData.length;
      console.log(this.tableData);
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm("确定删除该信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        Delete(row.feedbackId);
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getMyFeedback();
      });
    },
    //分页-改变页
    pageChange() {
      this.getMyFeedback();
    },
  },
};
</script>

<style scoped>
.my-feedback {
  height: 500px;
  margin: 20px 20px;
  padding: 20px 40px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.title {
  font-size: 28px;

  margin-bottom: 40px;
}
</style>
