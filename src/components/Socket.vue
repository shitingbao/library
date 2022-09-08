<template>
  <div class="business">
    socket
    <el-button @click="joinroom">joinroom</el-button>
    <el-button @click="leaveroom">leaveroom</el-button>
    <div class="socket">
      <el-button @click="socketEmit">socketEmit</el-button>
      <el-input v-model="input"></el-input>
    </div>

    <el-button @click="privateEmit">privateEmit</el-button>
  </div>
</template>
<script lang="ts" setup>
// import router from "@/router/router";
import { socket } from "@/libs/socketio";
import { onMounted, ref } from "vue";
const input = ref("");
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
  socket.emit("room-broadcast", "room-test", {
    event: "test",
    msg: input.value,
  });
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
.socket {
  display: flex;
}
</style>
