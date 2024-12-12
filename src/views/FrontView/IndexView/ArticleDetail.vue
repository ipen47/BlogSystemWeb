<template>
  <div>
    <div class="header">
      <NoticeBar style="margin-left: 10px"></NoticeBar>
      <CommentNav></CommentNav>
    </div>
    <div style="background-color: #f5f5f5; margin-top: 110px">
      <el-row>
        <el-col :span="4" class="left"
          ><div style="background-color: #fff; margin: 10px 20px">
            <Catalog></Catalog></div
        ></el-col>
        <el-col :span="16" style="margin-left: 250px"
          ><div style="padding: 10px 0px">
            <!-- 文章内容部分 -->
            <div class="article_main">
              <div class="article_title">{{ article.title }}</div>
              <div class="article_info">
                <i class="el-icon-user" style="font-size: 12px">{{
                  article.user
                }}</i>
                <i
                  class="el-icon-date"
                  style="font-size: 12px; margin-left: 10px"
                  >{{ article.createTime }}</i
                >

                <i
                  class="el-icon-view"
                  style="font-size: 12px; margin-left: 10px"
                  >{{ article.viewsCount }}</i
                >
                <el-tag size="mini" style="margin-left: 10px">{{
                  article.category
                }}</el-tag>
              </div>
              <div class="article_content">
                <div
                  id="editor-content-view"
                  class="editor-content-view"
                  v-html="article.content"
                ></div>
              </div>
            </div>
            <!-- 点赞 -->
            <div class="article_like">
              <div class="item">
                <svg-icon icon-class="like3" />
                <span style="margin: 0px 5px; font-size: 20px; color: #2d99f4">
                  2</span
                >
              </div>
              <div class="item" style="margin-left: 20px">
                <svg-icon icon-class="star3" />
                <span style="margin: 0px 5px; font-size: 20px; color: #2d99f4">
                  2</span
                >
              </div>
            </div>
            <!-- 评论 -->
            <div class="article_comment">
              <div class="article_comment_item">
                <span style="padding: 10px">评论</span>
                <span style="margin-left: 10px">5</span>
              </div>
              <div class="article_comment_item">
                <el-input
                  style="margin: 0 10px"
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="comment"
                ></el-input>
              </div>
              <div class="article_comment_item" style="justify-content: end">
                <el-button type="primary" style="margin-right: 10px"
                  >发送</el-button
                >
              </div>
              <div class="article_comment_item">占位</div>

              <div></div>
            </div></div
        ></el-col>
        <el-col :span="4" class="right">
          <!-- 推荐部分 -->
          <div style="background-color: #fff; margin: 10px 20px">
            <el-collapse value="2" accordion>
              <el-collapse-item name="2">
                <template slot="title">
                  <i
                    class="el-icon-collection"
                    style="font-size: 16px; margin: 5px 10px"
                  ></i>
                  <span style="font-size: 16px; font-weight: bold">推荐</span>
                </template>
                <div style="border-top: 1px solid #e7eaec">
                  <div class="recommend">
                    <div class="recommend_title">程序员该如何生存</div>
                    <span>2024-12-06 17:33:35</span>
                    <span style="margin-left: 10px">来自：lp</span>
                  </div>
                  <div class="recommend">
                    <div class="recommend_title">python指南</div>
                    <span>2024-12-06 17:33:35</span>
                    <span style="margin-left: 10px">来自：lp</span>
                  </div>
                  <div class="recommend">
                    <div class="recommend_title">编程技巧</div>
                    <span>2024-12-06 17:33:35</span>
                    <span style="margin-left: 10px">来自：lp</span>
                  </div>
                </div>
              </el-collapse-item></el-collapse
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <BackTop
      transitionName="fade"
      :visibilityHeight="400"
      :backPosition="0"
    ></BackTop>
  </div>
</template>

<script>
import CommentNav from "@/components/Front/CommenNav.vue";
import NoticeBar from "@/components/Front/NoticeBar.vue";
import BackTop from "@/components/Front/BackTop";
import Catalog from "@/components/Front/Catalog.vue";

export default {
  components: {
    CommentNav,
    NoticeBar,
    BackTop,
    Catalog,
  },
  data() {
    return {
      article: {},
      comment: "",
    };
  },
  created() {
    if (this.$route.query.id === "1") {
      this.article = {
        id: this.$route.query.id,
        title:
          "Python 语法及入门 （超全超详细） 专为Python零基础 一篇博客让你完全掌握Python语法",
        content: `<h2>1、标识符</h2><p style="text-indent: 2em;"><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;">标识符是编程时使用的名字，用于给变量、</span><a href="https://marketing.csdn.net/p/3127db09a98e0723b83b2914d9256174?pId=2782&amp;utm_source=glcblog&amp;spm=1001.2101.3001.7020" target="_blank" style="text-align: start;">函数</a><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;">、语句块等命名，</span><a href="https://so.csdn.net/so/search?q=Python&amp;spm=1001.2101.3001.7020" target="_blank" style="text-align: start;">Python</a><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;"> 中标识符由字母、数字、下划线组成，不能以数字开头，区分大小写。以下划线开头的标识符有特殊含义，单下划线开头的标识符，如：_xxx ，表示不能直接访问的类属性，需通过类提供的接口进行访问，不能用 from xxx import * 导入；双下划线开头的标识符，如：__xx，表示私有成员；双下划线开头和结尾的标识符，如：__xx__，表示 Python 中内置标识，如：__init__() 表示类的构造函数。</span></p><h2>2 、关键字</h2><table style="width: 100%; text-align: center;"><tbody><tr><td colspan="1" rowspan="1" width="auto">and</td><td colspan="1" rowspan="1" width="auto">exec</td><td colspan="1" rowspan="1" width="auto">not</td><td colspan="1" rowspan="1" width="auto">assert</td><td colspan="1" rowspan="1" width="auto">finally</td><td colspan="1" rowspan="1" width="auto">or</td></tr><tr><td colspan="1" rowspan="1" width="auto"><strong>break</strong></td><td colspan="1" rowspan="1" width="auto"><strong>for</strong></td><td colspan="1" rowspan="1" width="auto"><strong>pass</strong></td><td colspan="1" rowspan="1" width="auto"><strong>class</strong></td><td colspan="1" rowspan="1" width="auto"><strong>from</strong></td><td colspan="1" rowspan="1" width="auto"><strong>print</strong></td></tr><tr><td colspan="1" rowspan="1" width="auto"><strong>continue</strong></td><td colspan="1" rowspan="1" width="auto"><strong>global</strong></td><td colspan="1" rowspan="1" width="auto"><strong>raise</strong></td><td colspan="1" rowspan="1" width="auto"><strong>def</strong></td><td colspan="1" rowspan="1" width="auto"><strong>if</strong></td><td colspan="1" rowspan="1" width="auto"><strong>return</strong></td></tr><tr><td colspan="1" rowspan="1" width="auto"><strong>del</strong></td><td colspan="1" rowspan="1" width="auto"><strong>import</strong></td><td colspan="1" rowspan="1" width="auto"><strong>try</strong></td><td colspan="1" rowspan="1" width="auto"><strong>elif</strong></td><td colspan="1" rowspan="1" width="auto"><strong>in</strong></td><td colspan="1" rowspan="1" width="auto"><strong>while</strong></td></tr><tr><td colspan="1" rowspan="1" width="auto"><strong>else</strong></td><td colspan="1" rowspan="1" width="auto"><strong>is</strong></td><td colspan="1" rowspan="1" width="auto"><strong>with</strong></td><td colspan="1" rowspan="1" width="auto"><strong>except</strong></td><td colspan="1" rowspan="1" width="auto"><strong>lambda</strong></td><td colspan="1" rowspan="1" width="auto"><strong>yield</strong></td></tr></tbody></table><h2 style="text-align: start;">3 、引号</h2><p style="text-align: start;"> &nbsp; &nbsp;Python 可以使用引号（<span style="color: rgb(199, 37, 78); background-color: rgb(249, 242, 244); font-size: 14px;"><code>'</code></span>）、双引号（<span style="color: rgb(199, 37, 78); background-color: rgb(249, 242, 244); font-size: 14px;"><code>"</code></span>）、三引号（<span style="color: rgb(199, 37, 78); background-color: rgb(249, 242, 244); font-size: 14px;"><code>'''</code></span> 或 <span style="color: rgb(199, 37, 78); background-color: rgb(249, 242, 244); font-size: 14px;"><code>"""</code></span>）来表示字符串，引号的开始与结束须类型相同，三引号可以由多行组成。如下所示：</p><pre><code class="language-python">id = '001'
    name = "张三"
    skill = '''
    唱歌
    跳舞'''
    skill = """
    唱歌
    跳舞"""
    </code></pre><h2>4、 编码</h2><p> &nbsp; &nbsp;Python2 中默认编码为 ASCII，假如内容为汉字，不指定编码便不能正确的输出及读取，比如我们想要指定编码为 UTF-8，Python 中通过在开头加入 # -*- coding: UTF-8 -*- 进行指定。</p><p> &nbsp; &nbsp;Python3 中默认编码为 UTF-8，因此在使用 Python3 时，我们通常不需指定编码。</p><p><br></p><h1 id="section1">一、项目结构和依赖</h1>
          <p>这里是项目结构和依赖的内容...</p>
          <h2 id="section2">二、代码实现详解</h2>
          <p>这里是代码实现详解的内容...</p>
          <h3 id="section3">三、功能实现</h3>
          <p>这里是功能实现的内容...</p>
          <h4 id="section4">四、只读模式</h4>
          <p>这里是只读模式的内容...</p>
          <h5 id="section5">五、总结</h5>
          <p>这里是总结的内容...</p>
          <h1 id="section1">一、测试1</h1>
          <p>这里是测试的内容...</p>
          <h2 id="section2">二、一、测试2</h2>
          <p>这里是测试的内容...</p>
          <h3 id="section3">三、测试3</h3>
          <p>这里是测试的内容...</p>
          <h4 id="section4">四、测试4</h4>
          <p>这里是测试的内容...</p>
          <h5 id="section5">五、测试5</h5>
          <p>这里是测试的内容...</p>`,
        category: "编程",
        user: "吉多·范罗苏姆",
        viewsCount: 200,
        likes: 50,
        createTime: "2024年12月02日",
      };
    } else {
      this.article = {
        id: this.$route.query.id,
        title: "Vue学习之从入门到神经(两万字收藏篇)",
        content: `<h2 style="text-align: start;">前言</h2><p style="text-indent: 2em;">Vue.js是一套构建用户界面的渐进式框架，采用自底向上增量开发的设计，核心库只关注视图层。另一方面，Vue完全有能力驱动采用单文件组件和Vue生态系统支持的库开发的复杂单页应用。Vue是一个框架，也是一个生态。可以用不同的方式使用Vue：无需构建步骤，渐进式增强静态的HTML；在任何页面中作为Web Components嵌入；单页应用 (SPA)；全栈/服务端渲染 (SSR)；Jamstack/静态站点生成 (SSG)；开发桌面端、移动端、WebGL，甚至是命令行终端中的界面。</p><p style="text-align: start;"><strong>概述</strong>：Vue是一款前端渐进式框架，可以提高前端开发效率。</p><p style="text-align: start;"><strong>特点</strong>：</p><p style="text-align: start;">​ Vue通过MVVM模式,能够实现视图与模型的双向绑定。</p><p style="text-align: start;">​ 简单来说，就是数据变化的时候, 页面会自动刷新, 页面变化的时候，数据也会自动变化.</p><h2 style="text-align: start;">一、 Vue导入</h2><p style="text-align: start;"><strong>概述</strong>：Vue是一个类似于Jquery的一个JS框架，所以，如果想使用Vue，则在当前页面导入Vue.js文件即可。</p><p style="text-align: start;"><strong>语法</strong>：</p><pre><code class="language-javascript">&lt;!-- 在线导入 --&gt;
    &lt;!-- 开发环境版本，包含了用帮助的命令行警告 --&gt;
    &lt;script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"&gt;&lt;/script&gt;
    &lt;!-- 生产环境版本，优化了尺寸和速度 --&gt;
    &lt;script src="https://cdn.jsdelivr.net/npm/vue"&gt;&lt;/script&gt;
    &lt;!-- 本地导入 --&gt;
    &lt;script src="node_modules/vue/dist/vue.js"&gt;&lt;/script&gt;
    </code></pre><p><span style="color: rgb(77, 77, 77); background-color: rgb(255, 255, 255); font-size: 16px;"><strong>案例</strong></span></p><pre><code class="language-html">&lt;div id="app"&gt;
        &lt;h1&gt;用户名:&lt;input type="text" v-model="name"/&gt;&lt;/h1&gt; &lt;br/&gt;
        &lt;h1&gt;您输入的用户名是: {{name}}&lt;/h1&gt;
    &lt;/div&gt;
    &lt;script type="text/javascript"&gt;
        //创建一个Vue对象
        var app = new Vue({
            //指定,该对象代表&lt;div id="app"&gt;,也就是说,这个div中的所有内容,都被当前的app对象管理
            el: "#app",
            //定义vue中的数据
            data: {
                name: ""
            }
        });
    &lt;/script&gt;
    </code></pre><h2 style="text-align: start;">二、Vue基本语法</h2><h3 style="text-align: start;">1.钩子<a href="https://marketing.csdn.net/p/3127db09a98e0723b83b2914d9256174?pId=2782&amp;utm_source=glcblog&amp;spm=1001.2101.3001.7020" target="_blank">函数</a></h3><p style="text-align: start;"><strong>概述</strong>：<strong>钩子函数</strong>, 其实就是Vue提前定义好的事件, 其作用类似于Servlet的init方法和distory方法</p><p style="text-align: start;"><strong>语法</strong>：</p><pre><code class="language-html">&lt;script type="text/javascript"&gt;
        var app = new Vue({
            el:"#app",
            //钩子函数created,该方法在页面显示之后,自动执行
            created() {
                console.log("created...");
            }
        });
    &lt;/script&gt;
    </code></pre><p>（1）什么是vue生命周期?</p><p style="text-indent: 2em;">Vue 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。</p><p>（2）vue生命周期的作用是什么?</p><p style="text-indent: 2em;">Vue生命周期中有多个事件钩子，让我们在控制整个Vue实例过程时更容易形成好的逻辑。</p><p>（3）vue生命周期总共有几个阶段?</p><p style="text-indent: 2em;">可以总共分为8个阶段：创建前/后, 载入前/后,更新前/后,销毁前/后。</p><p>（4）第一次页面加载会触发哪几个钩子?</p><p style="text-indent: 2em;">第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子</p><p>（5）DOM 渲染在 哪个周期中就已经完成?</p><p style="text-indent: 2em;">DOM 渲染在 mounted 中就已经完成了。</p><p>（6）简单描述每个周期具体适合哪些场景?</p><p><span style="background-color: rgb(245, 219, 77);">生命周期钩子的一些使用方法：</span></p><ul><li>beforecreate : 可以在此阶段加loading事件，在加载实例时触发；</li><li>created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用；</li><li>mounted : 挂载元素，获取到DOM节点；</li><li>updated : 如果对数据统一处理，在这里写上相应函数；</li><li>beforeDestroy : 可以做一个确认停止事件的确认框；</li><li>nextTick : 更新数据后立即操作dom；</li></ul><h3> 2.事件修饰符</h3><p style="text-indent: 2em; text-align: start;">在事件处理函数中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。因此，vue 提供了事件修饰符的概念，来辅助程序员更方便的对事件的触发进行控制。在事件处理函数中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。因此，vue 提供了事件修饰符的概念，来辅助程序员更方便的对事件的触发进行控制。</p><p><br></p><table style="width: auto;"><tbody><tr><th colspan="1" rowspan="1" width="200" style="text-align: center;">事件修饰符</th><th colSpan="1" rowSpan="1" width="629">说明</th></tr><tr><td colspan="1" rowspan="1" width="auto" style="text-align: center;">.prevent</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">阻止默认行为（阻止 a 链接的跳转、阻止表单的提交）<br></td></tr><tr><td colspan="1" rowspan="1" width="auto" style="text-align: center;">.stop</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">阻止事件冒泡<br></td></tr><tr><td colspan="1" rowspan="1" width="auto" style="text-align: center;">.capture</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">以捕获模式触发当前的事件处理函数<br></td></tr><tr><td colspan="1" rowspan="1" width="auto" style="text-align: center;">.once	</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">绑定事件只触发一次<br></td></tr><tr><td colspan="1" rowspan="1" width="auto" style="text-align: center;">.self	</td><td colspan="1" rowspan="1" width="auto" style="text-align: center;">只有在 event.target 是当前元素自身时触发事件处理函数<br></td></tr></tbody></table><p><br></p>`,
        category: "vue",
        user: "lp",
        viewsCount: 1000,
        likes: 600,
        createTime: "2024年12月04日",
      };
    }
  },
  methods: {},
  watch: {},

  mounted() {},
};
</script>

<style scoped>
@import "@/assets/css/editorView.css";
.header {
  position: fixed;
  width: 100%;
  top: 0px;
  left: 0px;
  z-index: 99;
  background: #fff;
  border-bottom: 1px solid #e7eaec;
}
.left {
  position: fixed;
  top: 110px;
  left: 0px;
  z-index: 99;
}
.right {
  position: fixed;
  top: 110px;
  right: 0px;
  z-index: 99;
}

.recommend {
  padding: 10px 10px;
}
.recommend span {
  font-size: 12px;
  color: #666;
}

.recommend:hover {
  background-color: #a9e4f4;
  cursor: pointer;
}
.article_main {
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
.article_title {
  font-size: 20px;
  font-weight: bold;
}
.article_info {
  display: flex;
  align-items: center;
  margin: 15px 0px;
}
.article_content {
  text-align: justify;
  margin: 20px 0px;
}
.article_like {
  background-color: #fff;
  width: 100%;
  padding: 20px 0px;
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
.item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.article_comment {
  background-color: #fff;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  margin: 20px 0px;
}
.article_comment_item {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px;
}
</style>
