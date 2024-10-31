<template>
  <div>
    <!-- 增加角色按钮 -->
    <el-button
      style="margin-left: 10px"
      size="medium"
      type="success"
      icon="el-icon-circle-plus"
      @click="dialogFormVisible = true"
      >添加角色</el-button
    >
    <!-- 角色信息列表 -->
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.roleName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column align="center" label="角色编号" prop="roleId">
      </el-table-column>
      <el-table-column align="center" label="角色名称" prop="roleName">
      </el-table-column>

      <el-table-column
        label="用户操作"
        width="180"
        align="center"
        fixed="right"
      >
        <template slot="header" slot-scope="scope">
          <el-input
            clearable
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="roleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="roleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column
        label="权限设置"
        width="120"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-unlock"
            @click="setAuth(scope.row)"
            >设置权限</el-button
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
    <!-- 添加角色弹框部分 -->
    <el-dialog
      title="添加角色"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      center
    >
      <!-- 弹框内嵌表单部分 -->
      <el-form
        status-icon
        :rules="rules"
        ref="roleform"
        :model="roleform"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="角色名称：" prop="roleName">
          <el-input v-model="roleform.roleName" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('roleform')">取 消</el-button>
        <el-button type="primary" @click="addSubmit('roleform')"
          >立即添加</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑用户弹框部分 -->
    <el-dialog
      title="编辑角色"
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
        <el-form-item label="姓名：" prop="roleName">
          <el-input v-model="editform.roleName" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit('editform')"
          >立即编辑</el-button
        >
      </div>
    </el-dialog>
    <!-- 设置权限弹框 -->
    <el-dialog
      class="auth_dialog"
      title="权限设置"
      :visible.sync="dialogFormVisible3"
      :before-close="handleClose"
      center
    >
      <!-- 弹框内嵌表单部分 -->
      <el-form label-position="right">
        <el-form-item>
          <el-select v-model="authCheck" multiple placeholder="请选择">
            <el-option
              v-for="item in auths"
              :key="item.authorityId"
              :label="item.authorityName"
              :value="item.authorityId"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="authSubmit()">保存权限</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  CharacterList,
  CharacterAdd,
  CharacterEdit,
  CharacterDelete,
} from "@/api/getSystemData";
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      //增加角色表单信息
      roleform: {
        roleId: "",
        roleName: "",
      },
      //编辑角色表单信息
      editform: {},
      tableData: [],
      search: "",
      // 设置权限数据
      auths: [],
      authCheck: [],
      //检验规则
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      // 分页信息
      currentPage: null,
      pagesize: 3,
      total: null,
    };
  },
  created() {
    this.getChacterList();
  },
  methods: {
    getChacterList() {
      CharacterList({
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
      //判断是否为搜索状态
      CharacterList({
        currentPage: this.currentPage,
        pagesize: this.pagesize,
      }).then((resp) => {
        console.log(resp.data);
        this.tableData = resp.data.records;
        this.pagesize = resp.data.pagesize;
        this.total = resp.data.total;
      });
    },
    //分页-改变页大小
    sizeChange() {
      CharacterList({
        currentPage: this.currentPage,
        pagesize: this.pagesize,
      }).then((resp) => {
        console.log(resp.data);
        this.tableData = resp.data.records;
        this.pagesize = resp.data.pagesize;
        this.total = resp.data.total;
      });
    },
    // 添加角色
    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确定添加该用户信息?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              CharacterAdd(this.roleform).then((resp) => {
                if (resp.data) {
                  this.$message({
                    type: "success",
                    message: "添加成功!",
                  });
                  //重新加载用户列表界面
                  location.reload();
                  // 清空表单内容
                  this.$refs[formName].resetFields();
                  //退出表单填写弹框
                  this.dialogFormVisible = false;
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
    // 点击编辑角色信息展示弹框
    roleEdit(row) {
      // 将获取到的行信息对象赋值给编辑对象

      this.editform = row;
      console.log(this.editform);
      //展示编辑弹框
      this.dialogFormVisible2 = true;
    },
    //修改角色
    editSubmit() {
      this.$confirm("确定修改该角色信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let _this = this;
          axios
            .put(
              this.$store.state.globalhost + "role/updateRole",
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
    //删除角色
    roleDelete(row) {
      this.$confirm("确定删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let _this = this;
          axios
            .delete(
              this.$store.state.globalhost + "role/deleteRole/" + row.roleId
            )
            .then(function (resp) {
              if (resp.data) {
                _this.$message({
                  type: "success",
                  message: "【角色：" + row.roleName + "】已删除",
                });
                //重新加载用户列表界面
                location.reload();
              }
            });
        })
        .catch(() => {});
    },
    // 设置权限
    setAuth(row) {
      this.roleId = row.roleId;
      //展示权限设置弹框
      this.dialogFormVisible3 = true;
      //通过角色id来获取当前角色权限
      axios
        .get(
          this.$store.state.globalhost +
            "roleAuthority/getAuthByRoleId/" +
            row.roleId
        )
        .then((resp) => {
          this.authCheck = resp.data;
        });
      // 获取权限信息
      axios
        .get(this.$store.state.globalhost + "authority/list")
        .then((resp) => {
          console.log(resp.data);
          this.auths = resp.data;
        });
    },
    //提交设置权限
    authSubmit() {
      console.log("aaa");
      this.$confirm("确定为该用户设定角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios
            .put(this.$store.state.globalhost + "roleAuthority/updateAuth", {
              roleId: this.roleId,
              ids: this.authCheck,
            })
            .then((resp) => {
              if (resp.data) {
                this.$message({
                  showClose: true,
                  message: "权限设置成功",
                  type: "success",
                });
                this.dialogFormVisible3 = false;
                location.reload;
              }
            });
        })
        .catch(() => {
          //回到表单编辑弹框
          this.dialogFormVisible3 = true;
        });
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
.el-select {
  display: flex;
  justify-content: center;
}
</style>
