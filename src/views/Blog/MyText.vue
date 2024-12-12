<template>
  <div>
    <h1 style="text-align: center">我的笔记</h1>
    <br />
    <WangEdit ref="edit"></WangEdit>
    <!-- <Edit ref="edit"></Edit> -->
    <button @click="btn">显示笔记</button>
    <div
      id="editor-content-view"
      class="content editor-content-view"
      v-html="content"
    ></div>
  </div>
</template>
<script>
import WangEdit from "@/components/wangEditor/WangEdit.vue";
import Edit from "@/components/wangEditor/Edit_like_qq.vue";
export default {
  data() {
    return {
      content: "",
    };
  },
  components: {
    WangEdit,
    // Edit,
  },
  methods: {
    btn() {
      this.content = this.$refs.edit.html;
      console.log(this.content);
    },
  },
};
</script>
<style scoped>
.content {
  background-color: #ffffff;
}
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
</style>
