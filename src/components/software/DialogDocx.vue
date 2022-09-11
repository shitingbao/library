<template>
  <div>
    <el-dialog
      v-model="visible"
      :title="name"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="160px">
        <el-form-item label="语言类型">
          <el-input v-model="form.language" />
        </el-form-item>
        <el-form-item label="每个段落前的注释内容">
          <el-input v-model="form.content_title" />
        </el-form-item>
        <el-form-item label="关键字(英文逗号隔开)">
          <el-input v-model="content_keys" />
        </el-form-item>
        <el-form-item label="num">
          <el-input-number
            v-model="form.contents_num"
            :min="1"
            :max="10"
            @change="numHandleChange"
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
const content_keys = ref("");
const form = reactive({
  language: "",
  header_content: "",
  header_filters: [],
  content_filters: [],
  content_keys: [],
  contents_num: 0,
  content_title: "", // 每个段落前的注释
});

function numHandleChange() {}

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
  const da: codeFileParam = {
    header_content: form.header_content,
    language: form.language,
    header_filters: form.header_filters,
    content_filters: form.content_filters,
    content_keys: content_keys.value.split(",") as any,
    contents_num: form.contents_num,
    content_title: form.content_title,
  };

  const formData = { codes: JSON.stringify(da) };
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
