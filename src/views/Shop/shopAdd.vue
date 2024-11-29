<template>
  <div>
    <h1 v-color="data1">自定义指令</h1>
    <input v-fous type="text" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: "red",
    };
  },
  methods: {},
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
