<template>
  <div>
    <el-button
      class="login-table-signin"
      type="primary"
      @click="openDiolog({ DialogFlag: 1, IsShow: true } as params)"
    >
      录入头文件
    </el-button>
    <el-button
      class="login-table-signin"
      type="primary"
      @click="openDiolog({ DialogFlag: 2, IsShow: true } as params)"
    >
      录入代码片段
    </el-button>
    <el-button
      class="login-table-signin"
      type="primary"
      @click="openDiolog({ DialogFlag: 3, IsShow: true } as params)"
    >
      生成docx
    </el-button>
    <DialogInput :dialogVisible="dialogVisible" :DialogFlag="DialogFlag">
    </DialogInput>
  </div>
</template>
<script lang="ts" setup>
import bus from "@/libs/bus";
import { onMounted, ref } from "vue";
import DialogInput from "./DialogInput.vue";
import { params } from "@/model/params";

const dialogVisible = ref(false);
const DialogFlag = ref(1);

bus.on("software_dialog", openDiolog as any);

function openDiolog(arg: params) {
  DialogFlag.value = arg.DialogFlag;
  dialogVisible.value = arg.IsShow;
}

onMounted(() => {});
</script>
