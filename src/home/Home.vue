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
      <el-menu-item index="4">
        <span>控制台</span>
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
  flex-direction: column;
  width: 100%;
  height: 100%;
  .menu {
    display: flex;
    width: 100%;
  }

  .library {
    flex: 1;
    width: 100%;
  }
}

.content {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
