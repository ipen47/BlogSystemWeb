<template>
  <div>
    <!-- 搜索查询、重置、添加功能导航部分 -->

    <div class="nav">
      <!-- 搜索查询部分 -->
      <el-form
        :inline="true"
        style="height: 40px; width200px; font-weight: bold ;display: flex"
        :model="searchform"
      >
        <el-form-item style="display: flex; margin-left: 10px" label="姓名：">
          <el-input
            size="medium"
            placeholder="请输入用户姓名"
            v-model="searchform.username"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="年龄：" style="display: flex">
          <el-input
            size="medium"
            placeholder="请输入用户年龄"
            v-model="searchform.age"
            clearable
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div style="display: flex; flex: 1">
        <el-button
          type="primary"
          icon="el-icon-search"
          size="medium"
          style="margin-left: 40px"
          @click="search(searchform)"
          >搜索</el-button
        >
        <el-button
          type="warning"
          icon="el-icon-refresh-right"
          size="medium"
          @click="resetList()"
          >重置</el-button
        >
        <el-button
          size="medium"
          type="success"
          icon="el-icon-circle-plus"
          @click="dialogFormVisible = true"
          >添加</el-button
        >
      </div>
      <div style="display: flex; flex: 1">
        <!-- 上传导入 -->
        <el-upload
          style="width: 100px; margin-left: 40px"
          class="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="1"
        >
          <el-button
            type="primary"
            icon="el-icon-folder-add"
            size="medium"
            style="height: 40px"
            >导入</el-button
          >
        </el-upload>
        <el-button type="success" icon="el-icon-folder-remove" size="medium"
          >导出</el-button
        >
      </div>
    </div>

    <!-- 添加用户弹框部分 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      center
    >
      <!-- 弹框内嵌表单部分 -->
      <el-form
        status-icon
        :rules="rules"
        ref="userform"
        :model="userform"
        label-width="100px"
        label-position="right"
      >
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="userform.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="userform.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input v-model.number="userform.age" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="telphone">
          <el-input v-model.number="userform.telphone" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="userform.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="userform.address" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('userform')">取 消</el-button>
        <el-button type="primary" @click="addSubmit('userform')"
          >立即添加</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑用户弹框部分 -->
    <el-dialog
      title="编辑用户"
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
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="editform.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="editform.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input v-model.number="editform.age" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="telphone">
          <el-input v-model.number="editform.telphone" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="editform.email" clearable></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="editform.address" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit('editform')"
          >立即编辑</el-button
        >
      </div>
    </el-dialog>
    <!-- 设置角色弹框 -->
    <el-dialog
      class="role_dialog"
      title="角色设置"
      :visible.sync="dialogFormVisible3"
      :before-close="handleClose"
      center
    >
      <!-- 弹框内嵌表单部分 -->
      <el-form
        :model="roleform"
        ref="roleform"
        :rules="rules"
        label-position="right"
      >
        <el-form-item prop="roleId">
          <el-select
            v-model="roleform.roleId"
            clearable
            placeholder="请选择"
            size="samll"
          >
            <el-option
              v-for="item in roles"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="roleSubmit('roleform')"
          >保存角色</el-button
        >
      </div>
    </el-dialog>
    <!-- 表格列表部分 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="450"
      :default-sort="{ prop: 'id', order: 'ascending' }"
    >
      <el-table-column
        prop="id"
        sortable
        label="用户编号"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="180" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="telphone"
        label="手机号"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="180" align="center">
      </el-table-column>
      <el-table-column
        label="用户操作"
        width="180"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
            >编辑</el-button
          >

          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            @click="deleteUser(scope.row)"
            >删除</el-button
          >
        </template></el-table-column
      >
      <el-table-column
        label="角色设置"
        width="120"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            icon="el-icon-s-custom"
            @click="setRole(scope.row)"
            >设置角色</el-button
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
import {
  UserList,
  UserSearch,
  UserAdd,
  UserEdit,
  UserDelete,
  getRole,
  setRole,
} from "@/api/getUserData";
import { roleList } from "@/api/getSystemData";
import axios from "axios";
export default {
  data() {
    //自定义检验年龄规则
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 0 || value > 200) {
            callback(new Error("请输入正确的年龄"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    //自定义检验手机号规则
    var checkPhone = (rule, value, callback) => {
      const phoneChack = /^1[3456789]\d{9}$/;
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        if (phoneChack.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }, 1000);
    };
    //自定义检验邮箱规则
    var checkMail = (rule, value, callback) => {
      const mailChack = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailChack.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      }, 1000);
    };

    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      //增加用户表单信息
      userform: {
        id: "",
        name: "",
        sex: "女",
        age: "",
        telphone: "",
        email: "",
        address: "",
      },
      //搜索时提交的表单信息
      searchform: {
        username: "",
        age: "",
        page: "",
        size: 3,
      },

      //编辑用户表单信息
      editform: {},
      //角色表单
      roleform: {
        roleId: "1",
      },
      //表单检验规则
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在2到10个字符", trigger: "blur" },
        ],
        age: [
          {
            required: true,
            validator: checkAge,
            trigger: "blur",
          },
        ],
        telphone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        email: [{ required: true, validator: checkMail, trigger: "blur" }],
        address: [
          { required: true, message: "请输入地址信息", trigger: "blur" },
        ],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      //表格信息
      tableData: [],
      // 分页信息
      currentPage: 1,
      pagesize: 7,
      total: null,
      //角色信息
      roles: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      UserList({
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
    //搜索用户
    search() {
      let _this = this;
      _this.currentPage = 1;
      _this.searchform.page = _this.currentPage;
      UserSearch(this.searchform).then(function (resp) {
        _this.tableData = resp.data.records;
        _this.total = resp.data.total;
        _this.pagesize = resp.data.pagesize;
      });
    },
    //重置
    resetList() {
      //重新加载用户列表界面
      location.reload();
    },
    // 增加用户提交表单内容
    addSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("确定添加该用户信息?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              let _this = this;
              UserAdd(this.userform).then(function (resp) {
                if (resp.msg == "success") {
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
              console.log(_this.userform);
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
    // 点击编辑用户信息展示弹框
    handleEdit(row) {
      // 将获取到的行信息对象赋值给编辑对象
      this.editform = row;
      //展示编辑弹框
      this.dialogFormVisible2 = true;
    },
    //修改用户
    editSubmit() {
      this.$confirm("确定修改该用户信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let _this = this;
          UserEdit(this.editform).then(function (resp) {
            if (resp.msg == "success") {
              _this.$message({
                type: "success",
                message: "修改成功!",
              });
              //重新加载用户列表界面
              location.reload();
              // 清空表单内容
              // _this.$refs[formName].resetFields();
              //退出表单填写弹框
              _this.dialogFormVisible = false;
            }
          });
          console.log(_this.userform);
        })
        .catch(() => {
          //退出表单编辑弹框
          this.dialogFormVisible2 = true;
        });
    },
    //删除用户
    deleteUser(row) {
      this.$confirm("确定删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let _this = this;
          UserDelete(row.id).then(function (resp) {
            if (resp.msg == "success") {
              _this.$message({
                type: "success",
                message: "【" + row.name + "】已删除",
              });
              //重新加载用户列表界面
              location.reload();
            }
          });
        })
        .catch(() => {});
    },
    //点击设置角色展示弹框
    setRole(row) {
      this.id = row.id;
      console.log(row.id);
      //展示角色设置弹框
      this.dialogFormVisible3 = true;
      //通过用户id来获取当前用户角色
      getRole(row.id)
        .then((resp) => {
          this.roleform.roleId = resp.roleId;
        })
        .catch(() => {});
      //获取角色信息
      roleList()
        .then((resp) => {
          this.roles = resp;
        })
        .catch(() => {});
    },
    //设置角色
    roleSubmit(formName) {
      let obj = {
        roleId: this.roleform.roleId,
        userId: this.id,
      };
      console.log(obj);
      let _this = this;
      this.$confirm("确定为该用户设定角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          _this.$refs[formName].validate((valid) => {
            if (valid) {
              axios;
              setRole(obj)
                .then((resp) => {
                  if (resp) {
                    _this.$message({
                      showClose: true,
                      message: "角色设置成功",
                      type: "success",
                    });
                    _this.dialogFormVisible3 = false;
                    location.reload;
                  }
                })
                .catch((err) => {});
            } else {
              _this.$message({
                type: "error",
                message: "未选择角色!",
              });
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
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    //分页-改变页
    pageChange() {
      //判断是否为搜索状态
      if (this.searchform.username == "" && this.searchform.age == "") {
        //如果不是搜索状态执行所有用户分页
        this.getUserList();
      } else {
        //如果是搜索状态，执行搜索结果的分页
        this.searchform.page = _this.currentPage;
        UserSearch(this.searchform)
          .then((resp) => {
            this.tableData = resp.data.records;
            this.total = resp.data.total;
            console.log(resp.data);
          })
          .catch((err) => {});
      }
    },
    //分页-改变页大小
    sizeChange() {
      //判断是否为搜索状态
      if (this.searchform.username == "" && this.searchform.age == "") {
        //如果不是搜索状态执行改变所有用户的页大小
        this.getUserList();
      } else {
        //如果是搜索状态，改变搜索结果的页大小
        _this.searchform.size = _this.pagesize;
        UserSearch(this.searchform)
          .then((resp) => {
            this.tableData = resp.data.records;
            this.total = resp.data.total;
            console.log(resp.data);
          })
          .catch((err) => {});
      }
    },
  },
};
</script>
<style scoped>
.nav {
  display: flex;
}
.el-table {
  margin-top: 10px;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.role_dialog {
  width: 60%;

  position: absolute;
  top: 20%;
  left: 20%;
}
.el-select {
  display: flex;
  justify-content: center;
}
</style>
