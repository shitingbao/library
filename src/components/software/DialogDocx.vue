<template>
  <div>
    <el-dialog
      v-model="visible"
      :title="name"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="header_content">
          <el-input v-model="form.header_content" />
        </el-form-item>
        <el-form-item label="language">
          <el-input v-model="form.language" />
        </el-form-item>
        <!-- <el-form-item label="content">
          <el-input
            v-model="form.content"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item> -->
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
import { codeFileParam } from "@/model/params";
import { createDocxFile } from "@/api/docx";

const props = defineProps({
  docxDialogVisible: {
    type: Boolean,
    required: true,
  },
});

const visible = ref(false);
const name = ref("生成代码文件");

const form = reactive({
  header_content: "",
  language: "",
  header_filters: [],
  content_filters: [],
  content_keys: [],
  contents_num: 0,
  content_title: "",
});

function handleClose(done: any) {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      bus.emit("software_docx_dialog", false);
      done();
    })
    .catch(() => {
      // catch error
    })
    .finally(() => {});
}

function closeDialog() {
  visible.value = false;
  bus.emit("software_docx_dialog", false);
}

async function submit() {
  // if (form.language === "" || form.content === "") {
  //   closeDialog();
  //   return;
  // }

  const da: codeFileParam = {
    // key: form.key,
    // language: form.language,
    // content: form.content,

    header_content: form.header_content,
    language: form.language,
    header_filters: form.header_filters,
    content_filters: form.content_filters,
    content_keys: form.content_keys,
    contents_num: form.contents_num,
    content_title: form.content_title,
  };

  const formData = { codes: JSON.stringify([da]) };
  createDocxFile(formData);
  closeDialog();
  // form.content = "";
  // form.key = "";
  // form.language = "";
}

watch(
  () => props.docxDialogVisible,
  () => {
    visible.value = props.docxDialogVisible;
  }
);

onMounted(() => {});
</script>
