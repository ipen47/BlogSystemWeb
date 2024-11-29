<template>
  <div calss="container">
    <h1>欢迎你，开始美好的一天吧！</h1>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 走马灯 -->
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="item in banner" :key="item">
        <el-image style="height: 300px,width:380px" :src="item"></el-image>
      </el-carousel-item>
    </el-carousel>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 用户描述列表 -->
    <div class="userinfo">
      <el-descriptions title="用户信息">
        <el-descriptions-item
          v-for="(item, index) in userInfoList"
          :label="item.label"
          :key="index"
        >
          {{ item.value }}
        </el-descriptions-item>

        <el-descriptions-item label="角色">
          <el-tag size="small">{{ role }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </div>
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
export default {
  components: {},
  data() {
    return {
      label: ["用户名", "性别", "年龄", "手机号", "邮箱", "地址"],
      userInfo: {
        name: "",
        sex: "",
        age: "",
        telphone: "",
        email: "",
        address: "",
        role: "",
      },
      //倒计时日期参数
      yeardate: new Date("2025-01-29"), //2025春节
      targetDate: new Date("2025-01-01T00:00:00"), // 2025年元旦
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
    userInfoList() {
      // 将 userInfo 对象的值和 label 数组合并成一个新数组
      const values = Object.values(this.userInfo);
      return this.label.map((label, index) => ({
        label: label,
        value: values[index],
      }));
    },
  },
  created() {
    this.getAdminInfo();
    this.startCountdown();
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    getAdminInfo() {
      this.userInfo = this.$store.state.user.userInfo;
      if (this.$store.state.user.roleId === 2) {
        this.role = "超级管理员";
      } else {
        this.role = "普通用户";
      }
    },
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
  },
};
</script>
<style scoped>
.container {
  height: 100%;
  overflow-x: hidden;
}
.userinfo {
  background-color: #fff;
  margin-top: 20px;
  padding-left: 2%;
}
.el-collapse {
  padding-left: 1%;
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
