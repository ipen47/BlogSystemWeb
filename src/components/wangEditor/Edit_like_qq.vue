<template>
  <div>
    <div style="border-top: 1px solid #e8e8e8">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      ></Toolbar>
    </div>
    <div id="content">
      <div id="editor-container">
        <div id="title-container">
          <input placeholder="请输入文章标题（1~50字）" v-model="pageTitle" />
        </div>
        <div id="editor-text-area">
          <Editor
            class="edit"
            style="height: 500px; overflow-y: hidden"
            v-model="html"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          ></Editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      pageTitle: "",
      html: "",
      toolbarConfig: { scroll: false },
      editorConfig: { placeholder: "#创作灵感." },
      mode: "default",
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
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
#content {
  height: calc(100% - 40px);
  background-color: #f5f6f7;
  overflow-y: auto;
  position: relative;
}

#editor-container {
  width: 850px;
  margin: 30px auto 150px auto;
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
</style>
