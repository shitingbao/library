<template>
  <div>
    chat
    <el-button class="login-table-signin" type="primary" @click="send">
      ping
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";

function send() {
  // this.$socket.io.emit("ping", "ping");
  console.log("ping:", "ping");
}

onMounted(() => {
  console.log("onMounted 123");
});
</script>
