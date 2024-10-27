<template>
  <div>
    <el-button type="text" @click="changeone">组件1</el-button>
    <el-button type="text" @click="changetwo">组件2</el-button>
    <div class="block">
      <Tool v-if="istrue"></Tool>
      <Tool2 v-if="!istrue"></Tool2>
    </div>
  </div>
</template>
<script>
import Tool from "/src/components/eleement ui/Tool";
import Tool2 from "/src/components/eleement ui/Tool2";
export default {
  components: {
    Tool,
    Tool2,
  },
  data() {
    return {
      istrue: true,
    };
  },
  methods: {
    changeone() {
      this.istrue = true;
    },
    changetwo() {
      this.istrue = false;
    },
  },
};
</script>
<style scoped>
.block {
  margin-top: 40px;
}
</style>
