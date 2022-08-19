<template>
  <div class="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo title"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="index">主页</el-menu-item>
      <el-submenu index="2">
        <el-menu-item index="imageupload">图片文字提取</el-menu-item>
        <el-menu-item index="comparison">文件内容比较</el-menu-item>
        <el-menu-item index="excelToCsv">excelToCsv</el-menu-item>
      </el-submenu>
      <el-menu-item index="4">
        <span>控制台</span>
      </el-menu-item>
    </el-menu>
    <div class="library">
      <!-- <Index v-if="selectPage == 'index'"></Index> -->
      <router-view class="body"></router-view>
    </div>
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
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  width: 100;
  height: 100%;
  padding: 0px;
  margin: 0px;
  .title {
    display: flex;
    width: 100%;
    font-size: 27px;
    // background: url(../assets/header-1111.png);
    border-bottom: solid 0px #e6e6e6;
  }
  .library {
    flex: 1;
    width: 100%;
  }
}
</style>
