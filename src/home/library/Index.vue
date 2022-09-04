<template>
  <div class="business">
    <div class="base-list">
      <div @click="toSofeWare" class="base-info">
        <span>软件著作</span>
      </div>
      <div @click="toChathome" class="base-info">
        <span>认识更多志同道合的伙伴</span>
      </div>
      <div @click="toChathome" class="base-info">
        <span>大多是依附主题的物品</span>
      </div>
    </div>

    <div class="select-expand">
      <div class="expand-title">
        <span>Give me a cup of coffee</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router/router";
import { ref } from "vue";
const brand = ref({});
const username = ref("user1");
function toChathome() {
  // router.push("chat");
  // let routeData = this.$router.resolve({ name: "chathome" });
  // window.open(routeData.href, "_blank");
}

function toSofeWare() {
  router.push("software");
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
  .carousel {
    width: 1200px;
    justify-content: center;
    padding: 20px 0;
  }
  .base-list {
    display: flex;
    flex-direction: row;
    .base-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 20px 20px 20px 20px;
      width: 250px;
      height: 100px;
      cursor: pointer;
      border: 1px solid rgb(0, 162, 255);
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
