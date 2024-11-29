<template>
  <div>
    <h1 style="text-align: center">我的笔记</h1>
    <br />
    <WangEdit ref="edit"></WangEdit>
    <button @click="btn">显示笔记</button>
    <div class="content" id="w-e-text" v-html="content"></div>
  </div>
</template>
<script>
import WangEdit from "@/components/wangEditor/WangEdit.vue";
export default {
  data() {
    return {
      content: "",
    };
  },
  components: {
    WangEdit,
  },
  methods: {
    btn() {
      this.content = this.$refs.edit.html;
    },
  },
};
</script>
<style scoped>
.content {
  background-color: #ffffff;
}
</style>
