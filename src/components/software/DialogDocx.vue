<template>
  <div>
    <el-dialog
      v-model="visible"
      :title="name"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="Activity name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="Activity form">
          <!-- <el-input v-model="form.desc" type="textarea" /> -->
          <el-input
            v-model="form.desc"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">Cancel</el-button>
          <el-button type="primary" @click="closeDialog"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, watch, PropType } from "vue";
import { ElMessageBox } from "element-plus";
import bus from "@/libs/bus";
import { params } from "@/model/params";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  DialogTitle: {
    type: String,
    required: true,
  },
});

const visible = ref(false);
const name = ref("");

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

function handleClose(done: any) {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      bus.emit("software_dialog", { Dialog: name.value, IsShow: false });
      done();
    })
    .catch(() => {
      // catch error
    })
    .finally(() => {});
}

function closeDialog() {
  visible.value = false;
  bus.emit("software_dialog", { Dialog: name.value, IsShow: false });
}

watch(
  () => props.dialogVisible,
  () => {
    name.value = props.DialogTitle;
    visible.value = props.dialogVisible;
  }
);

onMounted(() => {});
</script>
