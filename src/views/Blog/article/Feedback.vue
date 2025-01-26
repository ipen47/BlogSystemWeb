<template>
  <div class="feedback">
    <div class="search">
      <!-- 搜索查询部分 -->
      <el-input
        placeholder="请输入关键字"
        suffix-icon="el-icon-search"
        v-model="searchform.content"
        size="small"
      >
      </el-input>

      <el-button
        type="primary"
        plain
        style="margin: 1px 5px 7px 20px"
        icon="el-icon-search"
        size="small"
        @click="search"
        >查询</el-button
      >
      <el-button
        plain
        style="margin: 1px 5px 7px"
        icon="el-icon-refresh-right"
        size="small"
        @click="restSearch"
        >重置</el-button
      >
      <el-button
        type="danger"
        plain
        style="margin: 1px 5px 7px"
        icon="el-icon-delete"
        size="small"
        disabled
        >批量删除</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" height="400">
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column
        label="序号"
        align="center"
        prop="feedbackId"
        width="100"
      />
      <el-table-column
        label="反馈标题"
        align="center"
        width="100px"
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
        label="反馈用户"
        align="center"
        width="100px"
        prop="userName"
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
          <el-tag v-if="scope.row.reply" size="small">已回复</el-tag>
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
            plain
            type="success"
            disabled="scope.row.reply"
            @click="openReply(scope.row)"
            >回复</el-button
          >
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
    <!-- 回复框 -->
    <el-dialog title="回复" :visible.sync="open" width="40%" center>
      <el-form :model="replyForm" label-width="100px">
        <el-form-item label="回复内容" prop="reply">
          <el-input
            type="textarea"
            :rows="8"
            clearable=""
            placeholder="请输入回复信息"
            v-model="replyForm.reply"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="open = false">取 消</el-button>
        <el-button type="primary" @click="feedbackReply">回 复</el-button>
      </span>
    </el-dialog>
    <!-- 分页部分 -->
    <el-pagination
      background
      @current-change="pageChange"
      @size-change="sizeChange"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[3, 5, 7, 10, 12]"
      :page-size.sync="pagesize"
      :current-page.sync="currentPage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { feedbackList, reply, Delete } from "@/api/feedback";
export default {
  components: {},
  data() {
    return {
      // 控制回复框的打开和关闭
      open: false,
      // 查询参数
      searchform: {
        content: "",
        page: "",
        size: 3,
      },
      replyForm: {},

      // 公告表格数据
      tableData: [],
      multipleSelection: [],
      // 分页信息
      currentPage: 1,
      pagesize: 5,
      total: null,
    };
  },
  created() {
    this.getFeedbackData();
  },
  methods: {
    //获取反馈数据
    async getFeedbackData() {
      const res = await feedbackList({
        currentPage: this.currentPage,
        pagesize: this.pagesize,
      });
      this.tableData = res.data.records;
      this.total = res.data.total;
    },
    //打开回复框
    openReply(row) {
      this.open = true;
      this.replyForm.feedbackId = row.feedbackId;
    },
    //提交回复内容
    async feedbackReply() {
      console.log(this.replyForm);
      if (this.replyForm.reply) {
        await reply(this.replyForm);
        this.$message({
          type: "success",
          message: "回复成功",
        });
        this.open = false;
        this.getFeedbackData();
      } else {
        this.$message({
          type: "error",
          message: "回复不能为空",
        });
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm("确定删除该标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        Delete(row.feedbackId);
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.getFeedbackData();
      });
    },
    //查询
    search() {
      this.$message.error("暂未开发，敬请期待^-^");
    },
    //重置
    restSearch() {
      //重新加载菜单列表界面
      location.reload();
    },
    //批量操作
    SelectionChange(val) {
      this.multipleSelection = val;
      console.log("this.multipleSelection", this.multipleSelection);
    },
    //分页-改变页
    pageChange() {
      //判断是否为搜索状态
      // if (this.searchform.menuName == "" && this.searchform.createTime == "") {

      // }
      //如果不是搜索状态执行所有用户分页
      this.getFeedbackData();
    },
    //分页-改变页大小
    sizeChange() {
      //判断是否为搜索状态
      // if (this.searchform.username == "" && this.searchform.age == "") {
      //   //如果不是搜索状态执行改变所有用户的页大小

      // }
      this.getFeedbackData();
    },
  },
};
</script>
<style scoped>
.search {
  padding: 10px 0px;
  height: 40px;
  width: 100%;
  display: flex;
}
.el-input {
  width: 300px;
}
.oper {
  display: flex;

  margin-bottom: 20px;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
