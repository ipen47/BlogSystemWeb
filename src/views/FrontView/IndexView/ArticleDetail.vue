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
                  article.userName
                }}</i>
                <i
                  class="el-icon-date"
                  style="font-size: 12px; margin-left: 10px"
                  >{{ article.createdTime }}</i
                >

                <i
                  class="el-icon-view"
                  style="font-size: 12px; margin-left: 10px"
                  >{{ article.viewsCount }}</i
                >
                <el-tag
                  size="mini"
                  :type="getTagType(index)"
                  style="margin-left: 10px"
                  v-for="(item, index) in article.tags"
                  :key="index"
                  >{{ item }}</el-tag
                >
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
            <Comment :articleId="articleId"></Comment></div
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
import Comment from "@/components/Front/Comment.vue";
import { getArticleDetails } from "@/api/articles";
import { getArticleId, removeArticleId } from "@/utils/storage";
export default {
  components: {
    CommentNav,
    Comment,
    NoticeBar,
    BackTop,
    Catalog,
  },
  data() {
    return {
      article: {},
    };
  },
  created() {
    this.getDetails();
  },
  computed: {
    articleId() {
      let articleId = getArticleId();
      return this.$route.query.id || articleId;
    },
  },
  methods: {
    getDetails() {
      getArticleDetails({ articleId: this.articleId })
        .then((res) => {
          console.log(res.data);
          this.article = res.data;
        })
        .catch((err) => {});
    },
    //设置标签类型
    getTagType(index) {
      const tagTypes = ["default", "success", "warning"];
      return tagTypes[index % tagTypes.length];
    },
  },
  destroyed() {
    removeArticleId();
  },
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
</style>
