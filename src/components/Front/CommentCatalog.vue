<template>
  <div>
    <div class="catalog_main">
      <div
        style="margin: 0px 0px 20px 100px; font-size: 18px; font-weight: bold"
      >
        目录
      </div>
      <el-tabs
        @tab-click="handleClick"
        v-model="activeName"
        tab-position="right"
        style="height: auto"
      >
        <el-tab-pane
          :name="'tab' + index"
          :class="item.lev"
          v-for="(item, index) in navList"
          :key="index"
          :label="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "tab0",
      scroll: "",
      navList: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      this.jump(tab.index);
    },
    dataScroll: function () {
      this.scroll =
        document.documentElement.scrollTop || document.body.scrollTop;
    },
    jump(index) {
      let jump = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
      // 获取需要滚动的距离
      let total = jump[index].offsetTop - 80;
      // Chrome
      document.body.scrollTop = total;
      // Firefox
      document.documentElement.scrollTop = total;
      // Safari
      window.pageYOffset = total;
      // $('html, body').animate({
      // 'scrollTop': total
      // }, 400);
    },
    loadScroll: function () {
      let self = this;
      let navs = document.querySelectorAll(".el-tabs__item");
      // var sections = document.getElementsByClassName('section');
      for (var i = self.navList.length - 1; i >= 0; i--) {
        if (self.scroll >= self.navList[i].offsetTop - 120) {
          self.activeName = "tab" + i;
          break;
        }
      }
    },
    selectAllTitle() {
      let title = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
      this.navList = Array.from(title);
      this.navList.forEach((item) => {
        item.name = item.innerHTML;
      });
      this.navList.forEach((el) => {
        let index = el.localName.indexOf("h");
        el.lev = "lev" + el.localName.substring(index + 1, el.localName.length);
      });
    },
  },
  watch: {
    scroll: function () {
      this.loadScroll();
    },
  },
  created() {},
  mounted() {
    // scroll代表滚动条距离页面顶部距离
    window.addEventListener("scroll", this.dataScroll);
    this.selectAllTitle();
    this.$nextTick(() => {
      setTimeout(() => {
        let navs = document.querySelectorAll(".el-tabs__item");
        for (let i = navs.length - 1; i >= 0; i--) {
          // console.log($('#'+navs[i].id))
          // 从lev1到lev5分别添加不同到样式
          document.querySelector("#" + navs[i].id).style.padding = "0";
          if (this.navList[i].lev == "lev1") {
            document.querySelector("#" + navs[i].id).style.paddingLeft = "20px";
          } else if (this.navList[i].lev == "lev2") {
            document.querySelector("#" + navs[i].id).style.paddingLeft = "35px";
          } else if (this.navList[i].lev == "lev3") {
            document.querySelector("#" + navs[i].id).style.paddingLeft = "50px";
          } else if (this.navList[i].lev == "lev4") {
            document.querySelector("#" + navs[i].id).style.paddingLeft = "65px";
            document.querySelector("#" + navs[i].id).style.fontWeight = "400";
          } else if (this.navList[i].lev == "lev5") {
            document.querySelector("#" + navs[i].id).style.paddingLeft = "80px";
            document.querySelector("#" + navs[i].id).style.fontWeight = "400";
          }
        }
      });
    });
  },
};
</script>
<style scoped>
.el-tabs__header.is-right {
  height: 500px !important;
}
.catalog_main {
  position: fixed;
  top: 120px;
  right: 120px;
  width: 300px;
  height: 100%;
  z-index: 0;
}
</style>
