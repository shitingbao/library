<template>
  <div class="business">
    socket
    <el-button @click="socketConnect">socketio test connect</el-button>
    <el-button @click="socketEmit">emit</el-button>
  </div>
</template>
<script lang="ts" setup>
// import router from "@/router/router";
// import { socket } from "@/libs/socketio";
import { onMounted, ref } from "vue";

const brand = ref({});
const username = ref("user1");

function socketConnect() {}

function socketEmit() {
  // socket.emit("test", { data: "this is test" });
}

onMounted(() => {
  console.log("onMounted 123");
});
</script>
<style lang="less">
.business {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
