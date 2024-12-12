<template>
  <div class="index">
    <!-- 首页顶部 -->
    <front-header></front-header>
    <!-- 首页导航部分 -->
    <front-nav></front-nav>

    <!-- 根据导航切换不同页面 -->

    <router-view></router-view>
  </div>
</template>

<script>
import FrontHeader from "@/components/Front/FrontHeader.vue";
import FrontNav from "@/components/Front/FrontNav.vue";

export default {
  name: "FrontLayout",
  components: {
    FrontHeader,
    FrontNav,
  },
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped></style>
