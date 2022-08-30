<template>
  <div class="business"></div>
</template>
<script lang="ts" setup>
// import router from "@/router/router";
import { ref } from "vue";

const brand = ref({});
const username = ref("user1");

function toChathome() {
  // router.push("chat");
  // let routeData = this.$router.resolve({ name: "chathome" });
  // window.open(routeData.href, "_blank");
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
