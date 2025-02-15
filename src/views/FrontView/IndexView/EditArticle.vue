<template>
  <div>
    <div class="fix_top">
      <CommentNav></CommentNav>
      <div style="border-top: 1px solid #e8e8e8">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        ></Toolbar>
      </div>
    </div>
    <div id="content">
      <div id="editor-container">
        <div id="title-container">
          <input placeholder="请输入文章标题（1~50字）" v-model="form.title" />
        </div>
        <div id="editor-text-area">
          <Editor
            class="edit"
            style="height: 500px; overflow-y: hidden"
            v-model="form.content"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          ></Editor>
        </div>
      </div>
      <div class="sub_form">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="文章标签">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              size="small"
              :disable-transitions="false"
              @close="handleClose(tag)"
            >
              {{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="medium"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ 添加文章标签</el-button
            >
          </el-form-item>
          <el-form-item label="添加封面">
            <el-upload
              action="#"
              class="article-uploader"
              :http-request="uploadImg"
              :on-success="handleArticleSuccess"
              :before-upload="beforeArticleUpload"
            >
              <img
                v-if="form.articleImage"
                :src="form.articleImage"
                class="articleImg"
              />
              <i v-else class="el-icon-plus article-uploader-icon"
                >添加文章封面</i
              >
            </el-upload></el-form-item
          >
          <el-form-item label="文章摘要">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="摘要：会在推荐、列表等场景外露，帮助读者快速了解内容"
              v-model="form.summary"
            >
            </el-input
          ></el-form-item>
          <el-form-item label="文章分类" prop="categoryId">
            <el-select v-model="form.categoryId" clearable placeholder="请选择">
              <el-option
                v-for="item in categoryOptions"
                :key="item.categoryId"
                :label="item.categoryName"
                :value="item.categoryId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="fixed-bottom">
      <button class="action-button save-draft" @click="saveDraft">
        保存草稿
        <i class="dropdown-icon"></i>
      </button>
      <button
        class="action-button schedule-publish save-button"
        @click="schedulePublish"
      >
        定时发布
      </button>
      <button
        class="action-button publish-blog blue-button"
        @click="publishBlog"
      >
        发布博客
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import CommentNav from "@/components/Front/CommenNav.vue";
import { getAllCategories } from "@/api/category";
import { uploadArticleImg } from "@/api/upload";
import { saveBlog } from "@/api/articles";
export default Vue.extend({
  components: {
    CommentNav,
    Editor,
    Toolbar,
  },
  data() {
    return {
      form: {
        articleImage: "",
      },
      // 表单校验
      rules: {
        categoryId: [
          { required: true, message: "请设置文章标签", trigger: "blur" },
        ],
      },
      categoryOptions: [],
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",

      editor: null,

      toolbarConfig: {
        scroll: false,
        excludeKeys: [
          "fullScreen", // 全屏
        ],
        // toolbarKeys: [
        //   // 菜单 key
        //   "headerSelect",
        //   "bold", // 加粗
        //   "italic", // 斜体
        //   "through", // 删除线
        //   "underline", // 下划线
        //   "color", // 文字颜色
        //   "fontSize", // 字体大小
        //   "lineHeight", // 行高
        //   "uploadImage", // 上传图片

        //   "delIndent", // 缩进
        //   "indent", // 增进
        //   "deleteImage", //删除图片
        //   "divider", // 分割线
        //   "insertTable", // 插入表格
        //   "justifyCenter", // 居中对齐
        //   "justifyJustify", // 两端对齐
        //   "justifyLeft", // 左对齐
        //   "justifyRight", // 右对齐
        //   "undo", // 撤销
        //   "redo", // 重做
        //   "clearStyle", // 清除格式
        //   // "fullScreen", // 全屏
        //   "codeBlock", //代码块
        // ],
      },

      editorConfig: {
        placeholder: "#创作灵感.",
        excludeKeys: [],
      },
      mode: "default",
    };
  },
  created() {
    this.loadCategory();
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    //获取分类数据
    loadCategory() {
      getAllCategories()
        .then((res) => {
          console.log(res);
          this.categoryOptions = res;
        })
        .catch((err) => {});
    },
    async publishBlog() {
      try {
        const valid = await new Promise((resolve, reject) => {
          this.$refs["form"].validate((valid) => {
            if (valid) {
              resolve(true);
            } else {
              reject(false);
            }
          });
        });

        if (valid) {
          this.form.status = 1; // 设置状态为已发布
          await saveBlog(this.form);
          this.$message({
            type: "success",
            message: "发布成功",
          });
          this.$router.push("/index");
        }
      } catch (error) {
        this.$message({
          type: "error",
          message: "发布失败，请检查表单输入",
        });
      }
    },

    saveDraft() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.status = 0; //设置状态为草稿
          // this.$message.error("暂未开发，敬请期待^-^");
          saveBlog(this.form)
            .then((res) => {
              if (res.msg == "success") {
                this.$message({
                  type: "success",
                  message: "保存成功",
                });
                this.$router.push("/index");
              } else {
                this.$message({
                  type: "error",
                  message: "保存失败",
                });
              }
            })
            .catch((err) => {});
        }
      });

      // this.$message.error("暂未开发，敬请期待^-^");
    },
    schedulePublish() {
      this.$message.error("暂未开发，敬请期待^-^");
    },
    //上传封面
    uploadImg(option) {
      const formData = new FormData();
      formData.append("file", option.file); // 添加上传的文件

      uploadArticleImg(formData)
        .then((response) => {
          // 调用成功回调
          option.onSuccess(response, option.file);
        })
        .catch((error) => {
          // 调用失败回调
          option.onError(error);
        });
    },
    //上传成功后
    handleArticleSuccess(res, file) {
      console.log("file", file);
      this.form.articleImage = res;
      console.log(this.form.articleImage);
    },
    //上传成功前
    beforeArticleUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {}, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>

<style scoped>
@import "@wangeditor/editor/dist/css/style.css";
@import "@/assets/css/editorView.css";
.fix_top {
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 99;
  background-color: #fff;
}
#content {
  margin-top: 100px;
  padding-bottom: 100px;
  height: 100%;
  background-color: #f5f6f7;
  overflow-y: auto;
  position: relative;
}

#editor-container {
  width: 850px;
  margin: 30px auto 0px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}

#title-container {
  padding: 20px 0;
  border-bottom: 1px solid #e8e8e8;
}

#title-container input {
  font-size: 30px;
  border: 0;
  outline: none;
  width: 100%;
  line-height: 1;
}

/* 提交表单样式 */
.sub_form {
  width: 850px;
  height: 400px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px 50px 50px 50px;
  border: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}
.el-form-item {
  margin-bottom: 10px !important;
}
/* 上传文章封面 */
.article-uploader-icon {
  width: 160px !important;
  height: 90px !important;
  border: 1px dashed #d9d9d9;
  background-color: #f7f7f7;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.article-uploader-icon:hover {
  border-color: #409eff;
}
.el-icon-plus {
  font-size: 14px;
  color: #8c939d;

  line-height: 90px;
  text-align: center;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 26px;
  line-height: 26px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  height: 26px;
  width: 100px;
  margin-left: 10px;
  /* vertical-align: bottom; */
}
.articleImg {
  width: 140px;
  height: 80px;
  display: block;
}
/* 底部样式 */
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  border-top: 1px solid #e8e8e8;
  background-color: #ffffff; /* 背景颜色可以根据需要调整 */
}

/* 按钮通用样式 */
.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  margin-left: 10px;
  border: 1px solid #999aaa; /* 淡灰色边框 */
  border-radius: 20px; /* 椭圆形 */
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 保存草稿按钮 */
.save-draft {
  color: #999aaa; /* 淡灰色文字 */
  background-color: #ffffff; /* 白色背景 */
}

/* 倒小三角形图标 */
.dropdown-icon {
  margin-left: 5px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #999aaa; /* 淡灰色 */
}

/* 定时发布按钮 */
.schedule-publish {
  color: #999aaa; /* 淡灰色文字 */
  background-color: #ffffff; /* 白色背景 */
}

/* 发布博客按钮 */
.publish-blog {
  background-color: #64b5f6; /* 蓝色 */
  color: #ffffff; /* 白色文字 */
  border-color: #64b5f6;
}

/* 鼠标悬停状态下的按钮 */
.action-button:hover {
  color: #333333; /* 深灰色文字 */
  border-color: #333333; /* 深灰色边框 */
}

/* 倒小三角形图标在悬停时的变化 */
.save-draft:hover .dropdown-icon {
  border-top-color: #333333; /* 深灰色 */
}

/* 最后一个按钮在鼠标悬停时的特殊效果 */
.publish-blog:hover {
  background-color: #2196f3; /* 更深的橘红色 */
  border-color: #2196f3;
}

/* 最后一个按钮的文本颜色始终为白色，即使在悬停状态下 */
.publish-blog:hover {
  color: #ffffff;
}
.save-button {
  margin-left: 12px; /* 减少最后一个按钮的左侧间距 */
  margin-right: 0px;
}
/* 最右侧按钮额外间距 */
.blue-button {
  margin-left: 13px; /* 减少最后一个按钮的左侧间距 */
  margin-right: 284px;
}

/* 适应不同屏幕尺寸 */
@media (max-width: 600px) {
  .fixed-bottom {
    justify-content: space-around;
  }
}
</style>
