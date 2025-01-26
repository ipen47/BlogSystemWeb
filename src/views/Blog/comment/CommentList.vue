<template>
  <div class="comment">
    <div class="search" style="font-weight: bold">
      <!-- 搜索查询部分 -->
      <el-form
        :inline="true"
        style="height: 20px width:100% display:flex"
        :model="searchform"
      >
        <el-form-item label="姓名:">
          <el-input
            size="small"
            placeholder="请输入用户名称"
            v-model="searchform.userName"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="评论时间:">
          <el-date-picker
            v-model="searchform.createdTime"
            type="daterange"
            size="medium"
            style="width: 300px"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-button
          type="primary"
          plain
          style="margin-left: 20px"
          icon="el-icon-search"
          size="small"
          @click="search"
          >搜索</el-button
        >
        <el-button
          plain
          style="margin: 5px 10px"
          icon="el-icon-refresh-right"
          size="small"
          @click="restSearch"
          >重置</el-button
        >
        <el-button
          type="danger"
          plain
          style="margin-left: 10px"
          icon="el-icon-delete"
          size="small"
          disabled
          >批量删除</el-button
        >
      </el-form>
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      height="400"
      @selection-change="SelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column
        label="序号"
        align="center"
        prop="commentId"
        width="100"
      />
      <el-table-column
        label="评论内容"
        align="center"
        width="100px"
        prop="content"
      >
      </el-table-column>
      <el-table-column
        label="评论文章"
        align="center"
        width="240px"
        prop="article"
      />
      <el-table-column
        label="评论用户"
        align="center"
        width="240px"
        prop="userName"
      />
      <el-table-column
        label="回复对象"
        align="center"
        prop="target"
        width="100"
      />

      <el-table-column
        label="评论时间"
        align="center"
        prop="createdAt"
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
export default {
  components: {},
  data() {
    return {
      // 查询参数
      searchform: {
        menuName: "",
        createTime: "",
        page: "",
        size: 3,
      },
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
    this.getCommentData();
  },
  methods: {
    //获取分类数据
    getCommentData() {},

    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm("确定删除该标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {});

      this.$message.error("暂未开发，敬请期待^-^");
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
      this.getCommentData();
    },
    //分页-改变页大小
    sizeChange() {
      //判断是否为搜索状态
      // if (this.searchform.username == "" && this.searchform.age == "") {
      //   //如果不是搜索状态执行改变所有用户的页大小

      // }
      this.getCommentData();
    },
  },
};
</script>
<style scoped>
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
