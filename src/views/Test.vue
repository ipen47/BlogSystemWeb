<template>
  <div>
    <h1>测试组件</h1>
    <el-button type="text" @click="changeone">组件1</el-button>
    <el-button type="text" @click="changetwo">组件2</el-button>
    <div class="block">
      <Tool v-if="istrue"></Tool>
      <Tool2 v-if="!istrue"></Tool2>
    </div>
    <div>
      <h1 v-color="data1">自定义指令</h1>
      <input v-fous type="text" />
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
      data1: "blue",
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
  //自定义指令
  directives: {
    fous: {
      inserted(el) {
        el.focus();
      },
    },
    color: {
      inserted(el, binding) {
        el.style.color = binding.value;
      },
      update(el, binding) {
        el.style.color = binding.value;
      },
    },
  },
};
</script>
<style scoped>
.block {
  margin-top: 40px;
}
</style>
