<template>
  <div class="tag">
    <div class="search" style="font-weight: bold">
      <!-- 搜索查询部分 -->
      <el-form
        :inline="true"
        style="height: 20px width:100% display:flex"
        :model="searchform"
      >
        <el-form-item label="标签:">
          <el-input
            size="small"
            placeholder="请输入标签名称"
            v-model="searchform.tagName"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="创建时间:">
          <el-date-picker
            v-model="searchform.createdAt"
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
      </el-form>
    </div>

    <!-- 操作部分 -->
    <div class="oper" style="display: flex margin-bottom:20px">
      <el-button
        type="primary"
        plain
        icon="el-icon-plus"
        size="small"
        @click="handleAdd"
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
      <el-table-column label="序号" align="center" prop="tagId" width="120" />
      <el-table-column
        label="标签名称"
        align="center"
        width="180px"
        prop="tagName"
      >
        <template slot-scope="scope">
          <el-tag type="warning" size="small">{{ scope.row.tagName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="文章数量"
        align="center"
        prop="articleCount"
        width="100"
      />
      <el-table-column
        label="创建者"
        align="center"
        prop="createdBy"
        width="120"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createdAt"
        width="180"
      >
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
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
    <!-- 添加或修改标签对话框 -->
    <el-dialog
      title="添加标签"
      :visible.sync="open"
      width="500px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="标签名称" prop="tagName">
              <el-input
                v-model="form.tagName"
                placeholder="请输入标签名称"
                clearable
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { addTag, getTagPages, updateTag, deleteTag } from "@/api/tags";
export default {
  components: {},
  data() {
    return {
      // 是否显示弹出层
      open: false,
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
      rules: {
        tagName: [
          { required: true, message: "标签名称不能为空", trigger: "blur" },
        ],
      },
      multipleSelection: [],
      // 分页信息
      currentPage: 1,
      pagesize: 5,
      total: null,
    };
  },
  created() {
    this.getTagData();
  },
  methods: {
    //获取分类数据
    getTagData() {
      let params = {
        currentPage: this.currentPage,
        pagesize: this.pagesize,
      };
      getTagPages(params)
        .then((res) => {
          this.total = res.data.total;
          this.tableData = res.data.records;
        })
        .catch((err) => {});
    },
    // form表单重置
    reset() {
      this.form = {};
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    handleAdd() {
      this.reset();
      this.open = true;
    },
    handleUpdate(row) {
      this.form = row;

      this.open = true;
    },
    /**新增/修改-提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.tagId != undefined) {
            updateTag(this.form).then((response) => {
              this.$message({
                type: "success",
                message: "修改成功!",
              });
              this.open = false;
              this.getTagData();
            });
          } else {
            addTag(this.form).then((resp) => {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              //重新加载用户列表界面

              this.open = false;
              this.getTagData();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm("确定删除该标签?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteTag(row.tagId)
          .then((res) => {
            if (res.msg == "success") {
              this.$message({
                type: "success",
                message: "【" + row.tagName + "】已删除",
              });
              //重新加载用户列表界面
              this.getTagData();
            }
          })
          .catch((err) => {});
      });

      // this.$message.error("暂未开发，敬请期待^-^");
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
      this.getTagData();
    },
    //分页-改变页大小
    sizeChange() {
      //判断是否为搜索状态
      // if (this.searchform.username == "" && this.searchform.age == "") {
      //   //如果不是搜索状态执行改变所有用户的页大小

      // }
      this.getTagData();
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
