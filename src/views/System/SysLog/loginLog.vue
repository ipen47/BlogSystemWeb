<template>
  <div class="log">
    <div class="search">
      <!-- 搜索查询部分 -->
      <el-form
        :inline="true"
        style="height: 60px width:100% display:flex"
        :model="searchform"
      >
        <el-form-item label="登录地址:">
          <el-input
            size="medium"
            placeholder="请输入登录地址"
            v-model="searchform.ipaddr"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="用户名称:">
          <el-input
            size="medium"
            placeholder="请输入用户名称"
            v-model="searchform.userName"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select
            size="medium"
            v-model="searchform.status"
            clearable
            placeholder="登录状态"
          >
            <el-option label="成功" value="0"></el-option>
            <el-option label="失败" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录时间:">
          <el-date-picker
            v-model="searchform.loginTime"
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
      </el-form>
      <!-- 操作部分 -->
      <el-button
        type="primary"
        plain
        icon="el-icon-search"
        size="small"
        @click="search"
        >搜索</el-button
      >
      <el-button
        plain
        icon="el-icon-refresh-right"
        size="small"
        style="margin-left: 10px"
        @click="restSearch"
        >重置</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      height="450"
      @selection-change="SelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="infoId" label="访问编号" width="90" align="center">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名称"
        width="90"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="ipaddr"
        label="登录地址"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="loginLocation"
        label="登录地点"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="browser" label="浏览器" width="90" align="center">
      </el-table-column>
      <el-table-column prop="os" label="操作系统" width="180" align="center">
      </el-table-column>
      <el-table-column prop="icon" label="登录状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status === '0'">成功</el-tag>
          <el-tag type="danger" v-else>失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="msg" label="操作信息" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="loginTime"
        label="登录日期"
        width="180"
        align="center"
        :sort-orders="['descending', 'ascending']"
      >
      </el-table-column>

      <el-table-column label="操作" width="120" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            plain
            icon="el-icon-delete"
            @click="deleteLog(scope.row)"
            >删除</el-button
          >
        </template></el-table-column
      >
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
import { getLoginLog } from "@/api/log";
export default {
  data() {
    return {
      //查询表单
      searchform: {
        menuName: "",
        createTime: "",
        page: "",
        size: 3,
      },
      tableData: [],
      multipleSelection: [],
      // 分页信息
      currentPage: 1,
      pagesize: 7,
      total: null,
    };
  },
  created() {
    this.getLogData();
  },
  methods: {
    //查询登录日志数据
    getLogData() {
      getLoginLog({
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
    //搜索按钮
    search() {
      this.$message.error("暂未开发，敬请期待^-^");
    },
    //重置按钮
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
      this.getLogData();
    },
    //分页-改变页大小
    sizeChange() {
      //判断是否为搜索状态
      // if (this.searchform.username == "" && this.searchform.age == "") {
      //   //如果不是搜索状态执行改变所有用户的页大小

      // }
      this.getLogData();
    },
    //删除
    deleteLog() {
      this.$message.error("暂未开发，敬请期待^-^");
    },
  },
};
</script>
<style scoped>
.search {
  margin-bottom: 20px;
  font-weight: bold;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
