<template>
  <div>
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
        <el-descriptions-item label="用户名">kooriookami</el-descriptions-item>
        <el-descriptions-item label="性别">男</el-descriptions-item>
        <el-descriptions-item label="年龄">18</el-descriptions-item>
        <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
        <el-descriptions-item label="邮箱">zzz@123.com</el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">系统管理员</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="地址"
          >江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item
        >
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
    <el-row :gutter="20">
      <el-col :span="12">
        <!-- 折叠面板 -->
        <el-collapse v-model="activeNames">
          <el-collapse-item title="一致性 Consistency" name="1">
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>
              清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
            </div>
            <div>
              帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
            </div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>
              用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
            </div>
            <div>
              结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>

      <el-col :span="12">
        <!-- 日历 -->

        <Calendar></Calendar>
      </el-col>
    </el-row>
    <transfer></transfer>
  </div>
</template>
<script>
import Calendar from "../components/Calendar.vue";
import Transfer from "../components/Transfer .vue";
export default {
  components: {
    Calendar,
    Transfer,
  },
  data() {
    return {
      //用户信息
      adminInfo: {
        name: "",
        sex: "",
        age: "",
        telphone: "",
        email: "",
        adress: "",
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
  created() {
    this.startCountdown();
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
  },
};
</script>
<style scoped>
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
