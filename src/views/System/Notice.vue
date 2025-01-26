<template>
  <div class="notice">
    <div class="search" style="font-weight: bold">
      <!-- 搜索查询部分 -->
      <el-form
        :inline="true"
        style="height: 20px width:100% display:flex"
        :model="searchform"
      >
        <el-form-item label="公告标题:">
          <el-input
            size="small"
            placeholder="请输入公告标题"
            v-model="searchform.ipaddr"
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
        <el-form-item label="类型:" style="margin-left: 20px">
          <el-select
            size="small"
            v-model="searchform.status"
            clearable
            placeholder="公告类型"
          >
            <el-option label="通知" value="1"></el-option>
            <el-option label="公告" value="2"></el-option>
          </el-select>
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
          icon="el-icon-refresh-right"
          size="small"
          style="margin: 5px 10px"
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
        type="success"
        plain
        style="margin-left: 10px"
        icon="el-icon-edit"
        size="small"
        @click="search"
        disabled
        >修改</el-button
      >
      <el-button
        type="danger"
        plain
        style="margin-left: 10px"
        icon="el-icon-delete"
        size="small"
        disabled
        @click="deleteLog"
        >删除</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      height="450"
      @selection-change="SelectionChange"
    >
      <el-table-column type="selection" width="55" align="center">
      </el-table-column>
      <el-table-column
        label="序号"
        align="center"
        prop="noticeId"
        width="100"
      />
      <el-table-column
        label="公告标题"
        align="center"
        width="250px"
        prop="noticeTitle"
      />
      <el-table-column
        label="公告类型"
        align="center"
        prop="noticeType"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.noticeType === 1">通知</el-tag>
          <el-tag type="success" v-else>公告</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="创建者"
        align="center"
        prop="createBy"
        width="100"
      />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="160"
      >
      </el-table-column>
      <el-table-column
        label="更新者"
        align="center"
        prop="updateBy"
        width="100"
      />
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="160"
      >
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="180"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            plain
            icon="el-icon-delete"
            @click="deleteLog(scope.row)"
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
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公告标题" prop="noticeTitle">
              <el-input
                v-model="form.noticeTitle"
                placeholder="请输入公告标题"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告类型" prop="noticeType">
              <el-select v-model="form.noticeType" placeholder="请选择公告类型">
                <el-option label="通知" value="1"></el-option>
                <el-option label="公告" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <!-- <editor v-model="form.noticeContent" :min-height="192" /> -->
              <!-- <WangEdit ref="edit"></WangEdit> -->
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.noticeContent"
              >
              </el-input>
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
import { getNotice, addNotice } from "@/api/notice";
import WangEdit from "@/components/wangEditor/WangEdit.vue";
export default {
  components: {
    // WangEdit,
  },
  data() {
    return {
      // 是否显示弹出层
      open: false,
      // 弹出层标题
      title: "",
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
        noticeTitle: [
          { required: true, message: "公告标题不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
      multipleSelection: [],
      // 分页信息
      currentPage: 1,
      pagesize: 7,
      total: null,
    };
  },
  created() {
    this.getNoticeData();
  },
  methods: {
    //获取通知数据
    getNoticeData() {
      getNotice({
        currentPage: this.currentPage,
        pagesize: this.pagesize,
      })
        .then((resp) => {
          console.log(resp.data);
          this.tableData = resp.data.records;
          this.pagesize = resp.data.pagesize;
          this.total = resp.data.total;
        })
        .catch((err) => {});
    },
    // form表单重置
    reset() {
      this.form = {
        noticeId: undefined,
        noticeTitle: undefined,
        noticeType: undefined,
        noticeContent: undefined,
        status: "0",
      };
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加公告";
    },
    /** 修改按钮操作 */
    // handleUpdate(row) {
    //   this.reset();
    //   const noticeId = row.noticeId || this.ids
    //   getNotice(noticeId).then(response => {
    //     this.form = response.data;
    //     this.open = true;
    //     this.title = "修改公告";
    //   });
    // },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.noticeId != undefined) {
            updateNotice(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addNotice(this.form).then((resp) => {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              //重新加载用户列表界面

              this.open = false;
              location.reload();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      // const noticeIds = row.noticeId || this.ids
      // this.$modal.confirm('是否确认删除公告编号为"' + noticeIds + '"的数据项？').then(function() {
      //   return delNotice(noticeIds);
      // }).then(() => {
      //   this.getList();
      //   this.$modal.msgSuccess("删除成功");
      // }).catch(() => {});
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
      this.getNoticeData();
    },
    //分页-改变页大小
    sizeChange() {
      //判断是否为搜索状态
      // if (this.searchform.username == "" && this.searchform.age == "") {
      //   //如果不是搜索状态执行改变所有用户的页大小

      // }
      this.getNoticeData();
    },
    //删除
    deleteLog() {
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
