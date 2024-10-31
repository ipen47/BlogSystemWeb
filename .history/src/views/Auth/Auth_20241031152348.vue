<template>
  <div>
    <!-- 增加权限按钮 -->
    <el-button
      style="margin-left: 10px"
      size="medium"
      type="success"
      icon="el-icon-circle-plus"
      @click="dialogFormVisible = true"
      >添加权限</el-button
    >
    <!-- 权限信息列表 -->
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.authorityName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column align="center" label="权限编号" prop="authorityId">
      </el-table-column>
      <el-table-column align="center" label="权限名称" prop="authorityName">
      </el-table-column>
      <el-table-column align="center" label="权限地址" prop="controller">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            clearable
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="authEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="authDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页信息 -->
    <el-pagination
      background
      @current-change="pageChange"
      @size-change="sizeChange"
      layout="total,sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[1, 3, 5, 7]"
      :page-size.sync="pagesize"
      :current-page.sync="currentPage"
    >
    </el-pagination>
    <!-- 添加权限弹框部分 -->
    <el-dialog
      title="添加权限"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      center
    >
      <!-- 弹框内嵌表单部分 -->
      <el-form
        status-icon
        :rules="rules"
        ref="authform"
        :model="authform"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="角色名称：" prop="authorityName">
          <el-input v-model="authform.authorityName" clearable></el-input>
        </el-form-item>
        <el-form-item label="接口地址：" prop="controller">
          <el-input v-model="authform.controller" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('authform')">取 消</el-button>
        <el-button type="primary" @click="addSubmit('authform')"
          >立即添加</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑权限弹框部分 -->
    <el-dialog
      title="编辑权限"
      :visible.sync="dialogFormVisible2"
      :before-close="handleClose"
      center
    >
      <!-- 弹框内嵌表单部分 -->
      <el-form
        status-icon
        :rules="rules"
        ref="editfrom"
        :model="editform"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="姓名：" prop="authorityName">
          <el-input v-model="editform.authorityName" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="controller">
          <el-input v-model="editform.controller" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit('editform')"
          >立即编辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { AuthList } from "@/api/getSystemData";
import axios from "axios";
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      //增加用户表单信息
      authform: {
        authId: "",
        authName: "",
      },
      //编辑用户表单信息
      editform: {},
      tableData: [],
      search: "",
      //检验规则
      rules: {
        authorityName: [
          { required: true, message: "请输入权限名称", trigger: "blur" },
        ],
        controller: [
          { required: true, message: "请输入权限名称", trigger: "blur" },
        ],
      },
      // 分页信息
      currentPage: null,
      pagesize: 3,
      total: null,
    };
  },
  created() {
    this.getAuthList();
  },
  methods: {
    getAuthList() {
      AuthList({
        currentPage: this.currentPage,
        pagesize: this.pagesize,
      }).then((resp) => {
        console.log(resp.data);
        this.tableData = resp.data.records;
        this.pagesize = resp.data.pagesize;
        this.total = resp.data.total;
      });
    },
    //关闭弹框
    handleClose(done) {
      this.$confirm("确认关闭？", {
        type: "error",
      })
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    //分页-改变页
    pageChange() {
      const _this = this;
      //判断是否为搜索状态
      axios
        .get(
          this.$store.state.globalhost +
            "authority/pageList/?page=" +
            this.currentPage +
            "&size=" +
            this.pagesize
        )
        .then(function (resp) {
          console.log(resp.data);
          _this.tableData = resp.data.records;
          _this.pagesize = resp.data.pagesize;
          _this.total = resp.data.total;
        });
    },
    //分页-改变页大小
    sizeChange() {
      const _this = this;
      axios
        .get(
          this.$store.state.globalhost +
            "authority/pageList/?page=" +
            this.currentPage +
            "&size=" +
            this.pagesize
        )
        .then(function (resp) {
          console.log(resp.data);
          _this.tableData = resp.data.records;
          _this.pagesize = resp.data.pagesize;
          _this.total = resp.data.total;
        });
    },
    // 添加权限
    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确定添加此项权限?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let _this = this;
              axios
                .post(
                  this.$store.state.globalhost + "authority/addAuth",
                  _this.authform
                )
                .then(function (resp) {
                  if (resp.data) {
                    _this.$message({
                      type: "success",
                      message: "添加成功!",
                    });
                    //重新加载用户列表界面
                    location.reload();
                    // 清空表单内容
                    _this.$refs[formName].resetFields();
                    //退出表单填写弹框
                    _this.dialogFormVisible = false;
                  }
                });
            })
            .catch(() => {
              //退出表单填写弹框
              this.dialogFormVisible = true;
            });
        } else {
          this.$message({
            type: "error",
            message: "信息填写不全，无法添加!",
          });
        }
      });
    },
    // 点击编辑权限信息展示弹框
    authEdit(row) {
      // 将获取到的行信息对象赋值给编辑对象

      this.editform = row;
      console.log(this.editform);
      //展示编辑弹框
      this.dialogFormVisible2 = true;
    },
    //修改权限
    editSubmit() {
      this.$confirm("确定修改此项权限信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let _this = this;
          axios
            .put(
              this.$store.state.globalhost + "authority/updateAuth",
              _this.editform
            )
            .then(function (resp) {
              if (resp.data) {
                _this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                //重新加载用户列表界面
                location.reload();
                //退出表单填写弹框
                _this.dialogFormVisible = false;
              }
            });
        })
        .catch(() => {
          //退出表单编辑弹框
          this.dialogFormVisible2 = true;
        });
    },
    //删除权限
    authDelete(row) {
      this.$confirm("确定删除此项权限?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let _this = this;
          axios
            .delete(
              this.$store.state.globalhost +
                "authority/deleteAuth/" +
                row.authorityId
            )
            .then(function (resp) {
              if (resp.data) {
                _this.$message({
                  type: "success",
                  message: "【权限：" + row.authName + "】已删除",
                });
                //重新加载用户列表界面
                location.reload();
              }
            });
        })
        .catch(() => {});
    },
    //取消提交重置表单内容
    resetForm(formName) {
      console.log(formName);
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.el-table {
  margin-top: 20px;
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
