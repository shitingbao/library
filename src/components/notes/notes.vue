<template>
  <div class="notes">
    <div class="anthology">
      <el-menu
        default-active="1"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <el-submenu index="1-1">
            <el-menu-item index="1-1-1" @click="createNote(1)">
              <el-icon><CirclePlus /></el-icon>
              <span>新建文集</span>
            </el-menu-item>
          </el-submenu>
        </el-submenu>

        <el-submenu index="2">
          <el-submenu :index="idx" v-for="(item, idx) in itemList">
            <el-menu-item :index="idx">
              <span class="menu-submenu"> {{ item }} </span>
              <el-icon @click="deleteNote(1, idx)"><DeleteFilled /></el-icon>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <div class="title">
      <el-menu
        default-active="2"
        class="menu"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="3">
          <el-submenu index="3-1">
            <el-menu-item index="3-1-1" @click="createNote(2)">
              <el-icon><CirclePlus /></el-icon>
              <span> 新建文集</span>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="4">
          <el-submenu :index="idx" v-for="(item, idx) in titleList">
            <el-menu-item :index="idx">
              <span class="menu-submenu"> {{ item }}</span>
              <el-icon @click="deleteNote(2, idx)"><DeleteFilled /></el-icon>
            </el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </div>
    <div class="content">content</div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

const itemList = ref(["aaa", "bbb", "ccc", "ddd", "eee"]);

const titleList = ref(["aaa", "bbb", "cc", "ddddd", "eeee", "ffff", "gggg"]);

function handleOpen() {
  // this.$socket.io.emit("ping", "ping");
  console.log("handleOpen:", "handleOpen");
}

function handleClose() {
  // this.$socket.io.emit("ping", "ping");
  console.log("handleClose:", "handleClose");
}

function createNote(e: number) {
  switch (e) {
    case 1:
      itemList.value.unshift("2023-05-15");
      break;
    case 2:
      titleList.value.unshift("2023-05-15");
      break;
    default:
  }

  console.log("creatte:", e);
}

function deleteNote(tp: number, idx: number) {
  switch (tp) {
    case 1:
      itemList.value.splice(idx, 1);
      break;
    case 2:
      titleList.value.splice(idx, 1);
      break;
    default:
  }
  console.log("delete notes:", idx);
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
  .menu {
    background-color: #404040;
    border-right: 0px;
    flex: 1;
    white-space: nowrap;
    .menu-submenu {
      display: inline-block;
      width: 100%; /* 占用100%的父元素宽度 */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; /*用空字符串代替超出部分*/
    }
  }
}
</style>
