<template>
  <div class="log">
    <div class="search">
      <!-- 搜索查询部分 -->
      <el-form
        :inline="true"
        style="height: 60px width:100% display:flex"
        :model="searchform"
      >
        <el-form-item label="操作地址:">
          <el-input
            size="small"
            placeholder="请输入操作地址"
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
            placeholder="操作类型"
          >
            <el-option label="其他" value="0"></el-option>
            <el-option label="新增" value="1"></el-option>
            <el-option label="修改" value="2"></el-option>
            <el-option label="删除" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:" style="margin-left: 20px">
          <el-select
            size="small"
            v-model="searchform.status"
            clearable
            placeholder="操作状态"
          >
            <el-option label="正常" value="0"></el-option>
            <el-option label="异常" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间:">
          <el-date-picker
            size="small"
            v-model="searchform.loginTime"
            type="daterange"
            style="width: 250px"
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
          icon="el-icon-refresh-right"
          size="small"
          style="margin: 5px 10px"
          @click="restSearch"
          >重置</el-button
        >
      </el-form>
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

      <el-table-column label="日志编号" align="center" prop="operId" />
      <el-table-column label="系统模块" align="center" prop="title" />
      <el-table-column label="操作类型" align="center" prop="businessType">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.businessType === 3"
            >删除</el-tag
          >
          <el-tag type="success" v-else>其他</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作人员"
        align="center"
        prop="operName"
        width="110"
      />
      <el-table-column
        label="操作地址"
        align="center"
        prop="operIp"
        width="130"
      />
      <el-table-column label="操作地点" align="center" prop="operLocation" />
      <el-table-column label="操作状态" align="center" prop="status">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status === 0">正常</el-tag>
          <el-tag type="danger" v-else>异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作日期"
        align="center"
        prop="operTime"
        width="160"
        :sort-orders="['descending', 'ascending']"
      >
      </el-table-column>
      <el-table-column
        label="消耗时间"
        align="center"
        prop="costTime"
        width="110"
        :sort-orders="['descending', 'ascending']"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.costTime }}毫秒</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="180"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-view"
            >详细</el-button
          >
          <el-button
            size="mini"
            type="danger"
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
  </div>
</template>
<script>
import { getOperLog } from "@/api/log";
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
      pagesize: 5,
      total: null,
    };
  },
  created() {
    this.getOperData();
  },
  methods: {
    //获取操作日志数据
    getOperData() {
      getOperLog({
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
    //查询
    search() {
      this.$message.error("暂未开发，敬请期待^-^");
    },
    //重置搜索参数
    restSearch() {
      //重新加载菜单列表界面
      location.reload();
    },
    //批量方法
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
      this.getOperData();
    },
    //分页-改变页大小
    sizeChange() {
      //判断是否为搜索状态
      // if (this.searchform.username == "" && this.searchform.age == "") {
      //   //如果不是搜索状态执行改变所有用户的页大小

      // }
      this.getOperData();
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
