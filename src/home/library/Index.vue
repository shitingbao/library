<template>
  <div class="business">
    <el-carousel trigger="click" height="150px" class="carousel">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>

    <div class="base-title">
      <span>功能</span>
      <span>选择区</span>
    </div>
    <div class="base-list">
      <div @click="toChathome" class="base-info">
        <span>在线交友</span><br />
        <span>给你一个展示自我的平台</span><br />
        <span>认识更多志同道合的伙伴</span>
      </div>
      <div @click="toChathome" class="base-info">
        <span>商品优选</span><br />
        <span>展示一些个人喜好的物品</span><br />
        <span>大多是依附主题的物品</span>
      </div>
      <el-popover
        placement="right"
        width="400"
        trigger="click"
        class="base-info"
      >
        <span>git地址，自己看吧</span><br />
        <span>https://github.com/shitingbao/stbweb</span>
        <el-button slot="reference"
          ><span>学习教材</span><br />
          <span>主要是该平台的发展史</span><br />
          <span>相同爱好的马上加入我们吧</span></el-button
        >
      </el-popover>
      <el-popover
        placement="right"
        width="400"
        trigger="click"
        class="base-info"
      >
        <span>git地址，自己看吧</span><br />
        <span>https://github.com/shitingbao/stbweb</span>
        <el-button slot="reference">
          <span>关于我们</span><br />
          <span>猥琐发育小团体</span></el-button
        >
      </el-popover>
    </div>

    <div class="base-title">
      <span>办公</span>
      <span>辅助区</span>
    </div>
    <div class="base-list">
      <el-popover
        placement="right"
        width="400"
        trigger="click"
        class="base-info"
      >
        <span>在左上角的辅助功能里边，第一项</span>
        <el-button slot="reference">
          <span>提取图片中的文字</span><br />
          <span>1.准备要获取文字的图片</span><br />
          <span>2.上传指定区域</span><br />
          <span>3.获取你想要的内容</span></el-button
        >
      </el-popover>

      <el-popover
        placement="right"
        width="400"
        trigger="click"
        class="base-info"
      >
        <span>在左上角的辅助功能里边，第二项</span>
        <el-button slot="reference">
          <span>文件内容比较</span><br />
          <span>比较两个文件的不同</span><br />
          <span>只支持txt，以及csv文件</span></el-button
        >
      </el-popover>

      <el-popover
        placement="right"
        width="400"
        trigger="click"
        class="base-info"
      >
        <span>在左上角的辅助功能里边，第三项</span>
        <el-button slot="reference">
          <span>excel转csv或者txt</span><br />
          <span>将excel文件转为其他文件</span><br />
          <span>可指定一部分转化条件</span></el-button
        >
      </el-popover>

      <el-popover
        placement="right"
        width="400"
        trigger="click"
        class="base-info"
      >
        <span>后期功能</span><br />
        <span>待定</span>
        <el-button slot="reference">
          <span>后期功能</span><br />
          <span>待定</span></el-button
        >
      </el-popover>
    </div>
    <div class="select-expand">
      <div class="expand-title">
        <span>Give me a cup of coffee</span>
      </div>
    </div>
  </div>
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
