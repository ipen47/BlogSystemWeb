<template>
  <div>
    <div class="article_comment">
      <!-- 评论个数统计 -->
      <div class="article_comment_item">
        <span style="padding: 10px">评论</span>
        <span style="margin-left: 10px">5</span>
      </div>
      <!-- 评论输入框 -->
      <div class="article_comment_item">
        <el-input
          style="margin: 0 10px"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="content"
        ></el-input>
      </div>
      <!-- 发送评论按钮 -->
      <div class="article_comment_item" style="justify-content: end">
        <el-button
          @click="publishComment()"
          type="primary"
          style="margin-right: 10px"
          >发送</el-button
        >
      </div>
      <!-- 评论回复 -->
      <div class="comment_list">
        <!-- 一级回复 -->
        <div
          class="comment_list_item"
          v-for="item in comment"
          :key="item.commentId"
        >
          <!-- 头像 -->
          <el-avatar size="medium" :src="item.avatar"></el-avatar>
          <!-- 内容 -->
          <div style="flex: 1">
            <!-- 评论用户名称 -->
            <div style="margin-left: 10px; color: #666; font-size: 15px">
              {{ item.userName }}
            </div>
            <!-- 评论内容 -->
            <div style="margin: 10px 10px; font-size: 18px">
              {{ item.content }}
            </div>
            <!-- 操作按钮 -->
            <div style="margin-left: 10px; color: #666; font-size: 12px">
              <!-- 回复日期 -->
              <span>{{ item.createdTime }}</span>
              <!-- 删除按钮(只显示当前用户) -->
              <el-button
                type="text"
                size="mini"
                style="margin-left: 5px"
                @click="openReply(item.commentId)"
                >回复</el-button
              >
              <el-button
                v-if="item.userId === userId"
                type="text"
                size="mini"
                style="margin-left: 5px"
                @click="deleteComment(item.commentId)"
                >删除</el-button
              >
            </div>
            <!-- 点击回复显示回复框 -->
            <div
              class="replay"
              v-show="activeCommentId === item.commentId && open"
            >
              <div class="article_comment_item">
                <el-input
                  style="margin: 0 10px"
                  type="textarea"
                  :rows="1"
                  placeholder="请输入内容"
                  v-model="content"
                ></el-input>
              </div>
              <div class="article_comment_item" style="justify-content: end">
                <el-button
                  @click="publishComment(item.commentId, item.userName)"
                  type="primary"
                  size="medium "
                  style="margin-right: 10px"
                  >发送</el-button
                >
              </div>
            </div>
            <!-- 二级回复 -->
            <div
              class="comment_list_item"
              v-for="sub in item.children"
              :key="sub.commentId"
            >
              <!-- 头像 -->
              <el-avatar size="small" :src="sub.avatar"></el-avatar>
              <!-- 内容 -->
              <div style="flex: 1">
                <div style="margin-left: 10px; color: #666; font-size: 15px">
                  <!-- 评论用户名称 -->
                  <span>{{ sub.userName }}</span
                  ><span style="margin: 0px 5px">回复</span>
                  <!-- 回复对象 -->
                  <span>@{{ sub.target }}</span>
                </div>
                <!-- 回复内容 -->
                <div style="margin: 10px 10px; font-size: 18px">
                  {{ sub.content }}
                </div>
                <!-- 操作按钮 -->
                <div style="margin-left: 10px; color: #666; font-size: 12px">
                  <!-- 回复日期 -->
                  <span>{{ sub.createdTime }}</span>
                  <el-button
                    type="text"
                    size="mini"
                    style="margin-left: 5px"
                    @click="openReply(sub.commentId)"
                    >回复</el-button
                  >
                  <!-- 删除按钮(只显示当前用户) -->
                  <el-button
                    v-if="sub.userId === userId"
                    type="text"
                    size="mini"
                    style="margin-left: 5px"
                    @click="deleteComment(sub.commentId)"
                    >删除</el-button
                  >
                </div>
                <!-- 点击回复显示回复框 -->
                <div
                  class="replay"
                  v-show="activeCommentId === sub.commentId && open"
                >
                  <div class="article_comment_item">
                    <el-input
                      style="margin: 0 10px"
                      type="textarea"
                      :rows="1"
                      placeholder="请输入内容"
                      v-model="content"
                    ></el-input>
                  </div>
                  <div
                    class="article_comment_item"
                    style="justify-content: end"
                  >
                    <el-button
                      @click="publishComment(item.commentId, sub.userName)"
                      type="primary"
                      size="medium "
                      style="margin-right: 10px"
                      >发送</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addComment, getCommentList, deleteComment } from "@/api/comment";
export default {
  props: ["articleId"],
  name: "Comment",
  data() {
    return {
      //用于控制是否显示回复框---当 activeCommentId===commentId&&open===true时显示
      open: false,
      activeCommentId: null,
      // 评论内容
      content: "",
      //评论对象
      comment: {},
    };
  },
  created() {
    this.getCommentData();
  },
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
  },
  methods: {
    //获取评论数据

    getCommentData() {
      console.log("开始请求~");
      getCommentList(this.articleId)
        .then((res) => {
          this.comment = res.data;
        })
        .catch((err) => {});
    },
    //发表评论
    publishComment(parentId, target) {
      console.log(this.comment.content);
      this.comment = {
        content: this.content,
        userId: this.userId,
        articleId: this.articleId,
        parentId: parentId,
        target: target,
      };
      console.log(this.comment);
      addComment(this.comment)
        .then(() => {
          this.$message({
            type: "success",
            message: "评论成功",
          });
          this.getCommentData();
        })
        .catch((err) => {});
    },
    //打开回复框
    openReply(commentId) {
      this.open = !this.open;
      this.activeCommentId = commentId;
      this.content = "";
    },
    // 删除评论
    deleteComment(commentId) {
      deleteComment(commentId)
        .then((res) => {
          if (res.msg == "success") {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            //重新加载界面
            this.getCommentData();
          }
        })
        .catch((err) => {});
    },
  },
};
</script>

<style>
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
.comment_list {
  padding: 10px 20px;
}
.comment_list_item {
  padding: 10px 20px;
  display: flex;
}
</style>
