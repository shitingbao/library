<template>
  <div class="app">
    <el-menu
      class="menu"
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/">主页</el-menu-item>
      <el-menu-item index="socket">socket</el-menu-item>
      <el-menu-item index="imageupload">图片文字提取</el-menu-item>
      <el-menu-item index="comparison">文件内容比较</el-menu-item>
      <el-menu-item index="excelToCsv">excelToCsv</el-menu-item>
      <el-menu-item index="chat">chat</el-menu-item>
      <el-menu-item index="console">
        <span>控制台</span>
      </el-menu-item>
      <el-menu-item index="notes">
        <span>笔记</span>
      </el-menu-item>
    </el-menu>
    <router-view class="content"></router-view>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import router from "@/router/router";

const activeIndex = ref("1");
const selectPage = ref("index");

function contentMes() {
  // this.$conMsg("123");
}

function handleSelect(key: any, keyPath: any) {
  selectPage.value = key;
  console.log("keyPath:", key, "--keyPath:", keyPath);
  router.push(key);
}
</script>
<style lang="less">
.app {
  display: flex;
  position: absolute;
  flex-direction: column;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  .menu {
    border-bottom: 0px; // 加上这个，不然 el-menu 会有下边框
  }
  .content {
    // flex: 1;
  }
}
</style>
