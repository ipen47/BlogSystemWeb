<template>
  <div>
    <!-- 轮播图 -->
    <carousel></carousel>
    <el-row :gutter="20">
      <!-- 左边分类部分 -->
      <el-col :span="5"
        ><div class="article_type_nav">
          <span style="font-size: 20px; margin-right: auto">分类</span>
          <span
            style="
              color: #409eff;
              padding: 7px 30px;
              font-size: 12px;
              cursor: pointer;
            "
            >更多 <i class="el-icon-d-arrow-right"></i
          ></span>
        </div>
        <div class="article_type_info">
          <div v-for="item in typeList" :key="item.id">
            <el-image
              fit="cover"
              :src="item.articleImage"
              style="width: 250px; height: 140px"
            >
            </el-image>
          </div>
        </div>
      </el-col>
      <!-- 中间博客部分 -->
      <el-col :span="14"
        ><div class="article_content_nav">
          <div
            class="nav_item"
            :class="{ active: sort === 'hot' }"
            style="margin-right: 30px"
            @click="loadBySort('hot')"
          >
            热门文章
          </div>
          <div
            class="nav_item"
            :class="{ active: sort === 'new' }"
            style="margin-right: auto"
            @click="loadBySort('new')"
          >
            最新发表
          </div>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit-outline"
            @click="editArticle"
            >发布</el-button
          >
        </div>
        <div class="article_content_info">
          <div v-for="item in articleList" :key="item.id">
            <div
              class="article_card"
              @click="$router.push(`/detail?id=${item.id}`)"
            >
              <!-- 文章封面 -->
              <el-image
                fit="cover"
                :src="item.articleImage"
                style="width: 250px; height: 140px"
              >
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
              <div style="flex: 1; margin-left: 20px; color: #666">
                <!-- 文章标题 -->
                <div class="article_title">{{ item.title }}</div>
                <!-- 文章内容 -->
                <div
                  class="article_content"
                  style="margin: 10px 0px; font-size: 12px"
                >
                  {{ item.content }}
                </div>
                <!-- 文章数据 -->
                <div
                  style="display: flex; align-items: center; margin: 12px 0px"
                >
                  <el-tag type="success" size="mini">{{
                    item.category
                  }}</el-tag>
                  <i
                    class="el-icon-date"
                    style="font-size: 12px; margin-left: 10px"
                    >{{ item.createTime }}</i
                  >
                  <i
                    class="el-icon-user"
                    style="font-size: 12px; margin-left: 10px"
                    >作者：{{ item.user }}</i
                  >
                  <i
                    class="el-icon-view"
                    style="font-size: 12px; margin-left: 10px"
                    >{{ item.viewsCount }}</i
                  >

                  <span style="font-size: 12px; margin-left: 10px">
                    <svg-icon icon-class="like3" />{{ item.likes }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页部分 -->
        <el-pagination
          background
          @current-change="pageChange"
          layout="total,prev, pager, next"
          :total="total"
          :page-size.sync="pagesize"
          :current-page.sync="currentPage"
        >
        </el-pagination>
      </el-col>
      <!-- 右侧部分 -->
      <el-col :span="5">
        <!-- 右侧排行榜 -->
        <div class="article_rank_nav">
          <span style="font-size: 20px; margin-right: auto">博客排行榜</span>
          <i
            class="el-icon-refresh"
            style="
              color: #409eff;
              padding: 7px 30px;
              font-size: 12px;
              cursor: pointer;
            "
            >换一批</i
          >
        </div>
        <div class="article_rank_info">
          <div v-for="item in rankList" :key="item.id" class="text">
            <span style="color: coral; font-size: 15px">{{ item.id }}</span>
            <span class="item" style="margin-left: 10px">{{ item.title }}</span>
          </div>
        </div>
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
    <!-- 底部信息 -->
    <el-row
      ><el-col :span="24"
        ><div class="bottom" style="margin: 20px 0px">
          <span style="margin: auto">邮箱：2404772289@qq.com</span>
        </div></el-col
      ></el-row
    >
    <BackTop
      transitionName="fade"
      :visibilityHeight="600"
      :backPosition="0"
    ></BackTop>
  </div>
</template>

<script>
import Carousel from "@/components/Front/Carousel.vue";
import BackTop from "@/components/Front/BackTop";
export default {
  name: "ArticleIndex",
  components: {
    Carousel,
    BackTop,
  },
  data() {
    return {
      //定义文章排序规则：hot:热度；new:时间
      sort: "hot",
      //文章数据
      articleList: [
        {
          id: 1,
          title:
            "Python 语法及入门 （超全超详细） 专为Python零基础 一篇博客让你完全掌握Python语法",
          content:
            "Python由荷兰国家数学与计算机科学研究中心的吉多·范罗苏姆于1990年代初设计，作为一门叫做ABC语言的替代品。 Python提供了高效的高级数据结构，还能简单有效地面向对象编程,随着版本的不断更新和语言新功能的添加，逐渐被用于独立的、大型项目的开发,Python由荷兰国家数学与计算机科学研究中心的吉多·范罗苏姆于1990年代初设计，作为一门叫做ABC语言的替代品。 Python提供了高效的高级数据结构，还能简单有效地面向对象编程,随着版本的不断更新和语言新功能的添加，逐渐被用于独立的、大型项目的开发",
          category: "编程",
          user: "吉多·范罗苏姆",
          viewsCount: 200,
          likes: 50,
          createTime: "2024年12月02日",
          articleImage:
            "https://peng12.oss-cn-beijing.aliyuncs.com/Blog/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2/article07.png",
        },
        {
          id: 2,
          title:
            "Python 语法及入门 （超全超详细） 专为Python零基础 一篇博客让你完全掌握Python语法",
          content:
            "Python由荷兰国家数学与计算机科学研究中心的吉多·范罗苏姆于1990年代初设计，作为一门叫做ABC语言的替代品。 Python提供了高效的高级数据结构，还能简单有效地面向对象编程,随着版本的不断更新和语言新功能的添加，逐渐被用于独立的、大型项目的开发",
          category: "编程",
          user: "吉多·范罗苏姆",
          viewsCount: 200,
          createTime: "2024年12月02日",
          likes: 50,
          articleImage:
            "https://peng12.oss-cn-beijing.aliyuncs.com/Blog/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2/article06.png",
        },
        {
          id: 3,
          title:
            "Python 语法及入门 （超全超详细） 专为Python零基础 一篇博客让你完全掌握Python语法",
          content:
            "Python由荷兰国家数学与计算机科学研究中心的吉多·范罗苏姆于1990年代初设计，作为一门叫做ABC语言的替代品。 Python提供了高效的高级数据结构，还能简单有效地面向对象编程,随着版本的不断更新和语言新功能的添加，逐渐被用于独立的、大型项目的开发",
          category: "编程",
          user: "吉多·范罗苏姆",
          viewsCount: 200,
          likes: 50,
          createTime: "2024年12月02日",
          articleImage:
            "https://peng12.oss-cn-beijing.aliyuncs.com/Blog/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2/article16.jpeg",
        },
        {
          id: 4,
          title:
            "Python 语法及入门 （超全超详细） 专为Python零基础 一篇博客让你完全掌握Python语法",
          content:
            "Python由荷兰国家数学与计算机科学研究中心的吉多·范罗苏姆于1990年代初设计，作为一门叫做ABC语言的替代品。 Python提供了高效的高级数据结构，还能简单有效地面向对象编程,随着版本的不断更新和语言新功能的添加，逐渐被用于独立的、大型项目的开发",
          category: "编程",
          user: "吉多·范罗苏姆",
          viewsCount: 200,
          likes: 50,
          createTime: "2024年12月02日",
          articleImage:
            "https://peng12.oss-cn-beijing.aliyuncs.com/Blog/%E6%96%87%E7%AB%A0%E5%B0%81%E9%9D%A2/article17.jpg",
        },
      ],
      //排行榜数据
      rankList: [
        {
          id: 1,
          title: "你的代码不堪一击！太烂了！",
        },
        {
          id: 2,
          title: "你的代码不堪一击！太烂了！",
        },
        {
          id: 3,
          title: "你的代码不堪一击！太烂了！",
        },
        {
          id: 4,
          title: "你的代码不堪一击！太烂了！",
        },
        {
          id: 5,
          title: "你的代码不堪一击！太烂了！",
        },
      ],
      typeList: [],
      // 分页信息
      currentPage: 1,
      pagesize: 5,
      total: 20,
    };
  },
  methods: {
    //进入发布文章界面
    editArticle() {
      this.$router.push("/edit");
    },
    //根据sort规则获取文章
    loadBySort(sort) {
      this.sort = sort;
    },
    pageChange() {},
  },
};
</script>

<style scoped>
.article_type_nav {
  display: flex;
  padding: 12px;
  align-items: center;
  border-bottom: 1px solid #e7eaec;
}
.article_content_nav {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #e7eaec;
}
/* 高亮展示 */
.active {
  border-bottom: 1px solid #409eff;
  color: #409eff;
}
.nav_item {
  font-size: 20px;
  cursor: pointer;
}

.article_rank_nav {
  display: flex;
  padding: 12px;
  border-bottom: 1px solid #e7eaec;
}
.article_title {
  /* margin-left: 40px; */
  font-size: 18px;
  /* 设置标题超过2行显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.article_content {
  /* 设置内容超过3行显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /*表示三行后超出部分以省略号显示 */
  -webkit-box-orient: vertical;
}
.article_card {
  display: flex;
  margin: 20px 0px;
  cursor: pointer;
}
.article_card:hover {
  background: #d3e2e9;
}
.text {
  margin-left: 20px;
  display: flex;
  padding: 15px 0;
  font-size: 14px;
  color: #666;
}

.item {
  /* 设置标题超过2行显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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
.bottom {
  position: absolute;
  width: 100%;
  display: flex;
  background-color: #282828;
  height: 200px;
  color: #666;
  text-align: center;
}
.icon {
  width: 20px !important;
  height: 15px !important;
}
</style>
