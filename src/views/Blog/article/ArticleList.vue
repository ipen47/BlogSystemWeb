<template>
  <div class="article">
    <div class="search" style="font-weight: bold">
      <!-- 搜索查询部分 -->
      <el-form
        :inline="true"
        style="height: 20px width:100% display:flex"
        :model="searchform"
      >
        <el-form-item label="文章关键词:">
          <el-input
            size="small"
            placeholder="请输入文章关键词"
            v-model="searchform.article"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="操作人员:" style="margin-left: 20px">
          <el-input
            size="small"
            placeholder="请输入操作人员"
            v-model="searchform.userName"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="分类:" style="margin-left: 20px">
          <el-select
            size="small"
            v-model="searchform.category"
            clearable
            placeholder="文章分类"
          >
            <el-option label="后端" value="1"></el-option>
            <el-option label="前端" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" style="margin-left: 20px">
          <el-select
            size="small"
            v-model="searchform.status"
            clearable
            placeholder="文章状态"
          >
            <el-option label="已发布" value="1"></el-option>
            <el-option label="草稿" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作部分 -->
    <div class="oper" style="display: flex margin-bottom:20px">
      <div style="margin-right: 50px">
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
          icon="el-icon-refresh-right"
          size="small"
          @click="restSearch"
          >重置</el-button
        >
      </div>
      <el-button type="primary" plain icon="el-icon-plus" size="small"
        >新增</el-button
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
        prop="articleId"
        width="100"
      />
      <el-table-column
        label="文章封面"
        align="center"
        width="100px"
        prop="articleImage"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 80px; height: 50px"
            :src="scope.row.articleImage"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        label="文章标题"
        align="center"
        width="280px"
        prop="title"
      />
      <el-table-column
        label="文章内容"
        align="center"
        prop="content"
        width="80"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-view"
            @click="loadDetail(scope.row)"
            >详细</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="类别" align="center" prop="category" width="100">
        <template slot-scope="scope">
          <el-tag size="small">{{ scope.row.categoryName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center" prop="userName" width="80" />
      <el-table-column label="状态" align="center" prop="status" width="80">
        <template slot-scope="scope">
          <el-tag type="success" size="small" v-if="scope.row.status === 1"
            >已发布</el-tag
          >
          <el-tag type="warning" size="small" v-else>草稿</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="创建时间"
        align="center"
        prop="createdTime"
        width="160"
      >
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="250"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit"
            >修改</el-button
          >

          <el-button
            size="mini"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="deleteArticle(scope.row)"
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
    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body>
      <div v-html="content"></div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="exit">退出</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getArticleList } from "@/api/articles";
export default {
  components: {},
  data() {
    return {
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
      content: "",
      // 查询参数
      searchform: {
        menuName: "",
        createTime: "",
        page: "",
        size: 3,
      },
      // 公告表格数据
      tableData: [],
      // 表单参数
      form: {},
      // 表单校验

      multipleSelection: [],
      // 分页信息
      currentPage: 1,
      pagesize: 5,
      total: null,
    };
  },
  created() {
    this.getArticleData();
  },
  methods: {
    //获取文章数据
    getArticleData() {
      let params = {
        currentPage: this.currentPage,
        pagesize: this.pagesize,
      };
      getArticleList(params)
        .then((res) => {
          this.total = res.data.total;
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
    // form表单重置
    reset() {
      this.form = null;
    },
    // 退出详情按钮
    exit() {
      this.open = false;
      this.reset();
    },
    /** 文章详情按钮操作 */
    loadDetail(row) {
      console.log(row);
      this.reset();
      this.open = true;
      this.title = row.title;
      this.content = row.content;
    },
    /** 提交按钮 */
    submitForm() {},
    /** 删除按钮操作 */
    handleDelete(row) {},
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
      this.getArticleData();
    },
    //分页-改变页大小
    sizeChange() {
      //判断是否为搜索状态
      // if (this.searchform.username == "" && this.searchform.age == "") {
      //   //如果不是搜索状态执行改变所有用户的页大小

      // }
      this.getArticleData();
    },
    //删除
    deleteArticle() {
      this.$message.error("暂未开发，敬请期待^-^");
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
