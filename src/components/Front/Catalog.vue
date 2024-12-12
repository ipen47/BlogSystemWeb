<template>
  <div>
    <el-collapse value="1" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <i
            class="el-icon-s-unfold"
            style="font-size: 16px; margin: 5px 10px"
          ></i>
          <span style="font-size: 16px; font-weight: bold">目录</span>
        </template>
        <div style="border-top: 1px solid #e7eaec">
          <ul class="catalog">
            <li
              v-for="(item, index) in navList"
              :key="index"
              @click="jump(index)"
              style="cursor: pointer; list-style: none; padding: 5px 0"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 页面内容部分 -->
    <!-- <div class="content">
      <h1 id="section1">一、项目结构和依赖</h1>
      <p>这里是项目结构和依赖的内容...</p>

      <h2 id="section2">二、代码实现详解</h2>
      <p>这里是代码实现详解的内容...</p>

      <h3 id="section3">三、功能实现</h3>
      <p>这里是功能实现的内容...</p>

      <h4 id="section4">四、只读模式</h4>
      <p>这里是只读模式的内容...</p>

      <h5 id="section5">五、总结</h5>
      <p>这里是总结的内容...</p>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      scroll: "", // 存储滚动位置
      navList: [], // 存储页面标题信息
    };
  },
  methods: {
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
.catalog {
  margin: 10px 10px;
}
.catalog li {
  padding: 5px 0;
  cursor: pointer;
}

.catalog li:hover {
  color: #409eff;
}
.el-collapse-item {
  /* height: 500px; */
  /* overflow-y: auto; 启用垂直滚动条 */
}
</style>
