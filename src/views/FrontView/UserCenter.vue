<template>
  <div class="user-center"><user-center></user-center></div>
</template>

<script>
import UserCenter from "@/components/userCenter/Index.vue";
export default {
  components: {
    UserCenter,
  },
};
</script>

<style scoped>
.user-center {
  padding: 50px 200px;
}
</style>
