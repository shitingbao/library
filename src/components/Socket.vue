<template>
  <div class="business">
    socket
    <el-button @click="heartbeat">heartbeat</el-button>
    <el-button @click="joinroom">joinroom</el-button>
    <el-button @click="leaveroom">leaveroom</el-button>
    <el-button @click="userlist">userlist</el-button>
    <div class="socket">
      <el-button @click="roombroadcast">roombroadcast</el-button>
      <el-input v-model="input"></el-input>
    </div>

    <el-button @click="privateEmit">privateEmit</el-button>
    <!-- <el-button @click="disconnect">disconnect</el-button> -->
  </div>
</template>
<script lang="ts" setup>
// import router from "@/router/router";
import { NewSocket } from "@/libs/socketio";
import { onMounted, ref } from "vue";
const input = ref("");
const brand = ref({});
const username = ref("user1");
const socket = NewSocket();

function heartbeat() {
  socket.emit("heartbeat");
}

function joinroom() {
  socket.emit("join-room", "stb");
  console.log("join room");
}

function leaveroom() {
  socket.emit("leave-room", "stb");
}

function userlist() {
  socket.emit("userlist", "stb");
}

function roombroadcast() {
  socket.emit("room-broadcast", {
    room: "stb",
    event: "test",
    message: { val: input.value },
  });
}

function privateEmit() {
  socket.emit("private-message", {
    event: "test",
    to: "stb",
    message: { data: "this is private test" },
  });
}

// function disconnect() {
//   socket.emit("disconnect", "stb");
// }

onMounted(() => {
  console.log("onMounted 123");

  setInterval(() => {
    // 这里是定时执行的代码
    heartbeat();
    console.log("heartint!!!", Date());
  }, 4500);
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
