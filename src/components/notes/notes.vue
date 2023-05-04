<template>
  <div class="notes">
    <div class="anthology">
      <el-menu
        default-active="1"
        class="anthology-menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <el-submenu index="1-1" v-for="(idx, item) in itemList">
            <el-menu-item :index="idx">
              <span class="anthology-menu-submenu"> {{ idx }}--{{ item }}</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <el-menu-item index="1-2-1">item one</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <div class="title">
      <el-menu
        default-active="2"
        class="anthology-menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="2">
          <el-submenu index="2-1" v-for="(idx, item) in titleList">
            <el-menu-item index="2-1-1"> {{ idx }}--{{ item }} </el-menu-item>
          </el-submenu>
          <el-submenu index="2-2">
            <el-menu-item index="2-2-1">item one</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content">content</div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

const itemList = [
  "onaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeaaaaaaaaaaaaaaaaaaaaaaaaaaaae",
  "two",
  "three",
  "one",
  "two",
  "three",
  "one",
  "two",
  "three",
  "one",
  "two",
  "three",
];

const titleList = [
  "twoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeaaaaaaaaaaaaaaaaaaaaaaaaaaaae",
  "two",
  "three",
  "one",
  "two",
  "three",
  "one",
  "two",
  "three",
  "one",
  "two",
  "three",
];

function handleOpen() {
  // this.$socket.io.emit("ping", "ping");
  console.log("handleOpen:", "handleOpen");
}

function handleClose() {
  // this.$socket.io.emit("ping", "ping");
  console.log("handleClose:", "handleClose");
}

onMounted(() => {
  console.log("onMounted notes");
});
</script>

<style scoped lang="scss">
.notes {
  flex: 1;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #3d3d3d;
  .anthology {
    flex: 1;
    flex-direction: column;
    background-color: #404040;
    color: #b3b3b3;
    width: 0px;
    overflow: scroll;
  }
  .title {
    display: flex;
    flex: 2;
    flex-direction: column;
    background-color: #404040;
    border-right: 1px solid #d9d9d9;
    border-left: 1px solid #d9d9d9;
    color: #b3b3b3;
    width: 0px;
    overflow: scroll;
  }
  .content {
    display: flex;
    flex: 4;
    flex-direction: column;
    background-color: #3d3d3d;
    color: #b3b3b3;
    width: 0px;
  }
  .anthology-menu {
    background-color: #404040;
    border-right: 0px;
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    .anthology-menu-submenu {
    }
  }
}
</style>
