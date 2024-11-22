<template>
  <div>
    <el-calendar style="height: 200px">
      <template slot="dateCell" slot-scope="{ data }">
        <div :class="data.isSelected ? 'choseDay' : ''">
          <p>
            {{ data.day.slice(8) }}
          </p>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<style scoped>
/* 一 二 三 四 五 六 日 */
::v-deep .el-calendar-table thead th {
  padding: 0;
  font-size: 13px;
  color: #9cb2cd;
}
/* 去除边框 */
::v-deep .el-calendar-table tr td:first-child {
  border: none;
}
::v-deep .el-calendar-table tr:first-child td {
  border: none;
}
::v-deep .el-calendar-table__row td {
  border: none;
}
/* 当前月样式 */
::v-deep .el-calendar-table:not(.is-range) {
  color: rgba(156, 178, 205, 1);
}
.choseDay {
  position: relative;
  top: -12px;
  width: 36px;
  height: 36px;
  background-color: rgba(83, 143, 255, 1);
  color: #fff;
  border-radius: 30px;
  line-height: 35px;
  z-index: 6;
}

.el-calendar__header .el-calendar__title {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  font: 17px "OPPOSans-R";
  color: #273142;
}

.el-calendar-table thead th:before {
  color: #9cb2cd;
  font-size: 13px;
  content: "周";
}

.el-calendar__button-group {
  width: 100%;
}

.el-button-group {
  display: flex;
  justify-content: space-between;
}

.el-button-group::after,
.el-button-group::before {
  content: unset;
}

.el-button-group > .el-button:not(:first-child):not(:last-child) {
  display: none;
}

.el-button-group > .el-button:first-child:before {
  content: "<";
}

.el-button-group > .el-button:last-child:before {
  content: ">";
}

.el-button-group > .el-button:first-child {
  position: relative;
  left: -18px;
}

.el-button-group > .el-button:last-child {
  position: relative;
  left: 210px;
}

.el-button-group > .el-button:first-child span,
.el-button-group > .el-button:last-child span {
  display: none;
}

.el-calendar .el-calendar-table .el-calendar-day {
  padding: 0px;
  text-align: center;
  font: 13px "Poppins-Regular";
  background-color: rgb(255, 255, 255);
  height: 23px;
  width: 36px;
}
</style>
