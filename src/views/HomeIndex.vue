<template>
  <div calss="container">
    <h1>欢迎你--{{ userName }}，开始美好的一天吧！</h1>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 走马灯 -->
    <!-- <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="item in banner" :key="item">
        <el-image style="height: 300px,width:380px" :src="item"></el-image>
      </el-carousel-item>
    </el-carousel> -->

    <!-- 博客数据统计展示部分 -->
    <el-row :gutter="0">
      <el-col :span="5" style="background-color: #fff">
        <div class="card">
          <i class="el-icon-reading" style="color: red; font-size: 40px"></i>
          <span
            ><div style="margin-bottom: 5px">总阅读量</div>
            <div>55</div></span
          >
        </div>
      </el-col>
      <el-col :span="5" style="background-color: #fff; margin-left: 70px">
        <div class="card">
          <i
            class="el-icon-document-copy"
            style="color: pink; font-size: 40px"
          ></i>
          <span
            ><div style="margin-bottom: 5px">文章总数</div>
            <div>128</div></span
          >
        </div>
      </el-col>
      <el-col :span="5" style="background-color: #fff; margin-left: 70px">
        <div class="card">
          <i
            class="el-icon-s-comment"
            style="color: green; font-size: 40px"
          ></i>
          <span
            ><div style="margin-bottom: 5px">评论总数</div>
            <div>456</div></span
          >
        </div>
      </el-col>
      <el-col :span="5" style="background-color: #fff; margin-left: 70px">
        <div class="card">
          <i class="el-icon-message" style="color: blue; font-size: 40px"></i>
          <span
            ><div style="margin-bottom: 5px">留言总总数</div>
            <div>25</div></span
          >
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="24" style="background-color: #fff"
        ><div ref="line" style="width: 100%; height: 350px"></div
      ></el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row :gutter="0">
      <el-col :span="11" style="background-color: #fff">
        <div ref="bar" style="width: 100%; height: 350px"></div>
      </el-col>
      <el-col :span="11" style="background-color: #fff; margin-left: 105px">
        <div ref="pie" style="width: 100%; height: 350px"></div>
      </el-col>
    </el-row>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 倒计时 -->
    <el-row :gutter="20">
      <el-col :span="24">
        <!-- 元旦倒计时 -->
        <el-card class="countdown-card" shadow="hover" style="width: 100%">
          <div slot="header" class="clearfix">
            <span>🎉距离 2025 年元旦还有:🎉</span>
          </div>
          <div class="time-remaining">
            <el-statistic title="天" :value="days" />
            <el-statistic title="小时" :value="hours" />
            <el-statistic title="分钟" :value="minutes" />
            <el-statistic title="秒" :value="seconds" />
          </div>
        </el-card>
        <!-- 春节倒计时 -->
        <el-card shadow="hover" style="width: 100%">
          <div style="width: 100%; display: inline-block">
            <el-statistic
              format="DD天HH小时mm分钟"
              :value="yeardate"
              time-indices
              title="🚩距离2025春节还有："
            >
            </el-statistic>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 分割线 -->
    <el-divider></el-divider>
  </div>
</template>
<script>
import * as echarts from "echarts";
import { getAdminInfo } from "@/utils/storage";
export default {
  components: {},
  data() {
    return {
      //倒计时日期参数
      yeardate: new Date("2025-01-29"), //2025春节
      targetDate: new Date("2026-01-01T00:00:00"), // 2025年元旦
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: null,

      //走马灯图片
      banner: [
        require("/src/assets/banner/banner1.jpg"),
        require("/src/assets/banner/banner2.jpg"),
        require("/src/assets/banner/banner3.jpg"),
        require("/src/assets/banner/banner4.jpg"),
        require("/src/assets/banner/banner5.jpg"),
        require("/src/assets/banner/banner6.jpg"),
      ],
      //折叠面板参数
      activeNames: ["1"],
    };
  },
  computed: {
    userName() {
      const userInfo = getAdminInfo();
      return userInfo.userName;
    },
  },
  created() {
    this.startCountdown();
  },
  mounted() {
    this.initLine();
    this.initBar();
    this.initPie();
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    startCountdown() {
      //setInterval计算一次剩余时间，并动态更新days、、hours和minutes的seconds值。
      this.interval = setInterval(() => {
        const now = new Date();
        const timeRemaining = this.targetDate - now;

        if (timeRemaining > 0) {
          this.days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          this.hours = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          this.minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          );
          this.seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        } else {
          clearInterval(this.interval);
        }
      }, 1000);
    },
    initLine() {
      let chartDom = this.$refs.line;

      let myChart = echarts.init(chartDom);
      let option;
      option = {
        title: {
          text: "一月博客数据",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: "left",
          data: ["文章", "评论", "点赞", "留言"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "文章",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "评论",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "点赞",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "留言",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      };
      option && myChart.setOption(option);
    },
    initBar() {
      let chartDom = this.$refs.bar;
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "阅读量",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 150, 115, 223, 126, 158, 229],
          },
        ],
      };

      option && myChart.setOption(option);
    },
    initPie() {
      let chartDom = this.$refs.pie;
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        title: {
          text: "文章分类",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "分类",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "前端" },
              { value: 735, name: "vue" },
              { value: 580, name: "java" },
              { value: 484, name: "mysql" },
              { value: 300, name: "springboot" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>
<style scoped>
.container {
  height: 100%;
  overflow-x: hidden;
}
.el-collapse {
  padding-left: 1%;
}
.card {
  display: flex;
  width: 100%;
  height: 100px;
  font-size: 12px;
  font-weight: bold;
  justify-content: space-around;
  align-items: center;
}
/* 走马灯 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* 倒计时 */
.countdown-card {
  width: 300px;
  /* margin: 50px auto; */
  text-align: center;
  font-size: 18px;
}

.time-remaining {
  display: flex;
  justify-content: space-around;
  font-size: 24px;
  font-weight: bold;
}
</style>
