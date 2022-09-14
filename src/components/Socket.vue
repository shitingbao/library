<template>
  <div class="business">
    socket
    <el-button @click="ping">ping</el-button>
    <el-button @click="joinroom">joinroom</el-button>
    <el-button @click="leaveroom">leaveroom</el-button>
    <el-button @click="userlist">userlist</el-button>
    <div class="socket">
      <el-button @click="roombroadcast">roombroadcast</el-button>
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

function ping() {
  socket.emit("ping");
}

function joinroom() {
  socket.emit("join-room", "stb");
  console.log("join room");
}

function leaveroom() {
  socket.emit("leave-room", "stb", { room: "stb" });
}

function userlist() {
  socket.emit("userlist");
}

function roombroadcast() {
  socket.emit("room-broadcast", {
    room: "test",
    event: "test",
    message: input.value,
  });
}

function privateEmit() {
  socket.emit("one", { data: "this is test" });
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
