<template>
  <div>
    <el-dialog
      v-model="visible"
      :title="name"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item v-if="props.DialogFlag !== 1" label="key">
          <el-input v-model="form.key" />
        </el-form-item>
        <el-form-item label="language">
          <el-input v-model="form.language" />
        </el-form-item>
        <el-form-item label="content">
          <el-input
            v-model="form.content"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">Cancel</el-button>
          <el-button type="primary" @click="submit"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive, watch, PropType } from "vue";
import { ElMessageBox } from "element-plus";
import bus from "@/libs/bus";
import { codeHeader, code, params } from "@/model/params";
import { createDocxHeader, createDocxcontent } from "@/api/docx";

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  DialogFlag: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const visible = ref(false);
const name = ref("");

const form = reactive({
  key: "",
  language: "",
  content: "",
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

async function submit() {
  if (form.language === "" || form.content === "") {
    closeDialog();
    return;
  }

  const da: codeHeader = {
    key: form.key,
    language: form.language,
    content: form.content,
  };

  const formData = { codes: da };
  switch (props.DialogFlag) {
    case 1:
      await createDocxHeader(formData);
      break;
    case 2:
      await createDocxcontent(formData);
      break;
  }
  closeDialog();
}

watch(
  () => props.dialogVisible,
  () => {
    visible.value = props.dialogVisible;
  }
);

watch(
  () => props.title,
  () => {
    console.log("props.title,==>:", props.title);
    name.value = props.title;
  }
);
onMounted(() => {});
</script>
