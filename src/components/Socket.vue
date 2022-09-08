<template>
  <div class="business">
    socket
    <el-button @click="joinroom">joinroom</el-button>
    <el-button @click="leaveroom">leaveroom</el-button>
    <el-button @click="socketEmit">emit</el-button>
    <el-button @click="privateEmit">emit</el-button>
  </div>
</template>
<script lang="ts" setup>
// import router from "@/router/router";
import { socket } from "@/libs/socketio";
import { onMounted, ref } from "vue";

const brand = ref({});
const username = ref("user1");

function joinroom() {
  socket.emit("join-room", "room-test");
  console.log("join room");
}

function leaveroom() {
  socket.emit("leave-room", { mag: "room-test" });
}

function socketEmit() {
  socket.emit("room-broadcast", { event: "test", to: "id" });
}

function privateEmit() {
  socket.emit("private-message", "room-test", { data: "this is test" });
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
