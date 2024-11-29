<template>
  <div class="menu">
    <div class="search">
      <!-- 搜索查询部分 -->
      <el-form
        :inline="true"
        style="height: 40px; display: flex"
        :model="searchform"
      >
        <el-form-item label="菜单名称:">
          <el-input
            size="medium"
            placeholder="请输入菜单名称"
            v-model="searchform.menuName"
            clearable
          >
          </el-input>
        </el-form-item>
        <el-form-item label="创建时间:" style="margin-left: 30px">
          <el-date-picker
            v-model="searchform.createTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="medium"
        style="margin-left: 30px"
        @click="searchMenu"
        >搜索</el-button
      >
      <el-button
        type="warning"
        icon="el-icon-refresh-right"
        size="medium"
        style="margin-left: 30px"
        @click="restSearch()"
        >重置</el-button
      >
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      height="450"
      @selection-change="SelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column
        prop="menuName"
        label="菜单名称"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="icon" label="图标" width="180" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column
        prop="component"
        label="组件路径"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="path" label="路由路径" width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="createBy"
        label="创建者"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180"
        align="center"
      >
      </el-table-column>
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="addMenu(scope.row)"
            >新增</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="editMenu(scope.row)"
            >编辑</el-button
          >

          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="deleteMenu(scope.row)"
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
import { getMenuList } from "@/api/menu";
export default {
  data() {
    return {
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
    this.getMenuData();
  },
  methods: {
    getMenuData() {
      getMenuList({
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
    searchMenu() {
      this.$message.error("暂未开发，敬请期待^-^");
    },
    restSearch() {
      //重新加载菜单列表界面
      location.reload();
    },
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
      this.getMenuData();
    },
    //分页-改变页大小
    sizeChange() {
      //判断是否为搜索状态
      // if (this.searchform.username == "" && this.searchform.age == "") {
      //   //如果不是搜索状态执行改变所有用户的页大小

      // }
      this.getMenuData();
    },
    //增加
    addMenu() {
      this.$message.error("暂未开发，敬请期待^-^");
    },
    editMenu() {
      this.$message.error("暂未开发，敬请期待^-^");
    },
    deleteMenu() {
      this.$message.error("暂未开发，敬请期待^-^");
    },
  },
};
</script>
<style scoped>
.search {
  display: flex;
  margin-bottom: 20px;
  font-weight: bold;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
