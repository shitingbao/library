<template>
  <div class="business">
    socket
    <el-button @click="socketConnect">connect</el-button>
  </div>
</template>
<script lang="ts" setup>
// import router from "@/router/router";
import { socket } from "@/libs/socketio";
import { onMounted, ref } from "vue";

const brand = ref({});
const username = ref("user1");

function socketConnect() {
  // router.push("chat");
  // let routeData = this.$router.resolve({ name: "chathome" });
  // window.open(routeData.href, "_blank");

  onMounted(() => {
    socket.on("connection", () => {
      console.log(socket.id); // "G5p5..."
    });

    socket.on("openrtc", (msg: any) => {
      console.log("openrtc==>:", msg); // "G5p5..."
    });

    socket.on("disconnect", () => {
      console.log(socket.id); // "G5p5..."
    });
    console.log("onMounted 123");
  });
}
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
