<template>
  <div>
    <h1 style="text-align: center">我的笔记</h1>
    <br />
    <TextEdit></TextEdit>
  </div>
</template>
<script>
import TextEdit from "../components/TextEdit.vue";
export default {
  components: {
    TextEdit,
  },
};
</script>
<style scoped></style>
