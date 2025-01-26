<template>
  <div class="feedback-sub">
    <div class="title">提交您的反馈信息</div>
    <el-form
      :model="subForm"
      :rules="rules"
      ref="subForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="反馈标题" prop="title">
        <el-input
          v-model="subForm.title"
          placeholder="请输入反馈标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="反馈内容" prop="content">
        <el-input
          type="textarea"
          v-model="subForm.content"
          rows="10"
          placeholder="请输入您要反馈的内容"
        ></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button
        style="display: block; margin: 10px auto"
        plain
        type="success"
        @click="subFeedback"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script>
import { submit } from "@/api/feedback";
export default {
  data() {
    return {
      subForm: {},
      rules: {
        title: [{ required: true, message: "请输入反馈标题", trigger: "blur" }],

        content: [
          { required: true, message: "请输入反馈内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async subFeedback() {
      try {
        const valid = await new Promise((resolve, reject) => {
          this.$refs["subForm"].validate((valid) => {
            if (valid) {
              resolve(true);
            } else {
              reject(false);
            }
          });
        });
        if (valid) {
          this.subForm.userId = this.$store.getters.userId;
          const res = await submit(this.subForm);
          console.log(res);
          this.$message({
            type: "success",
            message: "提交成功",
          });
          this.$router.replace("/myFeedback");
        }
      } catch (error) {
        this.$message({
          type: "error",
          message: "提交失败，请检查表单输入",
        });
      }
    },
  },
};
</script>

<style scoped>
.feedback-sub {
  width: 50%;
  height: 500px;
  margin: 50px auto;
  padding: 20px 40px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.title {
  font-size: 28px;
  text-align: center;
  margin-bottom: 40px;
}
</style>
