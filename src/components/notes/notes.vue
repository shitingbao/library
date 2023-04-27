<template>
  <div class="notes">
    <div class="anthology">
      anthology
      <!-- <el-button class="login-table-signin" type="primary" @click="send">
        ping
      </el-button> -->
    </div>
    <div class="title">title</div>
    <div class="content">content</div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

function send() {
  // this.$socket.io.emit("ping", "ping");
  console.log("ping:", "ping");
}

onMounted(() => {
  console.log("onMounted notes");
});
</script>

<style scoped lang="scss">
.notes {
  display: flex;
  flex-direction: row;
  width: 100%;

  background-color: #3d3d3d;
  .anthology {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    background-color: #404040;
    color: #b3b3b3;
  }
  .title {
    display: flex;
    flex-grow: 2;
    flex-direction: column;
    background-color: #404040;
    border-right: 1px solid #d9d9d9;
    border-left: 1px solid #d9d9d9;
    color: #b3b3b3;
  }
  .content {
    display: flex;
    flex-grow: 4;
    flex-direction: column;
    background-color: #3d3d3d;
    color: #b3b3b3;
  }
}
</style>
