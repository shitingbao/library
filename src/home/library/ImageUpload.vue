<template>
  <div>
    <h2>图片文字提取</h2>
    <div class="tableTitle"><span class="midText">我是分割线</span></div>
    <div class="img-word">
      <div class="img-word-left">
        <el-upload
          class="upload"
          drag
          ref="upload"
          action="/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="change"
        >
          <i
            v-if="isFileSelect"
            class="el-icon-tickets avatar-uploader-icon"
          ></i>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div v-if="isFileSelect" class="avatar-filename">{{ filename }}</div>
        </el-upload>

        <el-button class="upload-button" @click="clear" round
          >清空选择</el-button
        >
        <el-button class="upload-button" @click="submitUpload" round
          >提交</el-button
        >
        <h4>上传历史</h4>
        <div class="img-history-list">
          <div
            class="img-history-select"
            v-for="(item, index) in fileHistoryName"
            :key="index"
            @click="selectHistory(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="img-word-right">
        <h4>提取内容</h4>
        <editor
          ref="edit"
          v-model="content"
          @init="editorInit"
          lang="html"
          theme="chrome"
          width="100%"
          height="80%"
        ></editor>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { submitUpload } from "@/libs/api/imageUpload";
// editor: require("vue2-ace-editor"),
const content = ref("123");
const fileNameNum = ref(0); //防止相同名称文件多次输入，文件名与数据对应出问题
const formFileList = ref<any[]>([]); //保存要提交的文件内容
const isFileSelect = ref(false); //是否显示选择的文件名，图标
const fileHistoryList = ref([
  {
    name: "1",
    data: "",
  },
]); //保存历史查询数据，文件名称对应数据
const fileHistoryName = ref(["1"]); //保存历史查询文件名称，用来对应数据
const filename = ref(""); //选择的文件名称

function editorInit() {
  require("brace/ext/language_tools"); //language extension prerequsite...
  require("brace/mode/html");
  require("brace/mode/javascript"); //language
  require("brace/mode/less");
  require("brace/theme/chrome");
  require("brace/snippets/javascript"); //snippet
  require("brace/mode/json");
  require("brace/snippets/json");
  // let _this = this;
  // _this.$refs.edit.editor.setShowFoldWidgets(true);
  // _this.$refs.edit.editor.setReadOnly(true); //是否为只读
}
function submit() {
  isFileSelect.value = false;
  let param = new FormData(); // 创建form对象
  for (let i = 0; i < formFileList.value.length; i++) {
    param.append(i + "", formFileList.value[i].raw); // 通过append向form对象添加数据
  }
  param.append("chunk", "0"); // 添加form表单中其他数据

  // let that = this;
  var resData = [];
  // 添加请求头
  // submitUpload

  const response = submitUpload(param);

  // for (let j = 0; j < response.data.length; j++) {
  //   for (let i = 0; i < response.data[j].words_result.length; i++) {
  //     resData.push(response.data[j].words_result[i].Words);
  //   }
  // }
  // that.content = JSON.stringify(resData, null, "\t");
  // let num = selectSameFile(filename.value);
  // var named = filename.value; //不直接使用文件名，如果遇到相同文件名称已经存在，就文件名后+1.如：新建文件夹（1）
  // if (num > 0) {
  //   named = filename.value + "(" + num + ")";
  // }
  // console.log(num, ":", named);
  // fileHistoryList.value.push({ name: named, data: that.content });
  // fileHistoryName.value.push(named);

  formFileList.value = [];
}

function selectSameFile(filename: string) {
  let num = 0;
  fileHistoryName.value.forEach((element) => {
    if (element == filename) {
      num++;
    }
  });
  return num;
}

function change(file: any) {
  isFileSelect.value = true;
  filename.value = file.name;
  formFileList.value.push(file);
}

function selectHistory(filename: string) {
  fileHistoryList.value.forEach((element) => {
    if (element.name == filename) {
      content.value = element.data;
    }
  });
}

function clear() {
  isFileSelect.value = false;
  filename.value = "";
  formFileList.value = [];
}
</script>
<style lang="scss" scoped>
.img-word {
  display: flex;
  flex-direction: row;
  .img-word-left {
    padding: 0px 10px;
    flex-grow: 1;
    // width: 35%;
    .upload {
      height: 200px;
      overflow-y: auto;
      .avatar-uploader-icon {
        display: flex;
        justify-content: center;
        font-size: 48px;
        line-height: 165px;
        color: #8c939d;
      }
      .avatar-filename {
        margin-top: -20px;
      }
      .upload-select {
        position: absolute;
      }
    }
    .img-history-list {
      display: flex;
      // justify-content: center;
      padding-top: 20px;
      height: 400px;
      overflow: auto;
      flex-direction: column;
      .img-history-select {
        cursor: pointer;
      }
    }
  }
  .img-word-right {
    // height: 600px;
    flex-grow: 5;
    overflow: auto;
    padding: 0px 50px;
    .word {
      display: flex;
      overflow: auto;
    }
  }
}
.tableTitle {
  position: relative;
  margin: 0 auto;
  width: 1000px;
  height: 1px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
  margin-bottom: 20px;
}
.midText {
  position: absolute;
  left: 50%;
  background-color: #ffffff;
  padding: 0 15px;
  transform: translateX(-50%) translateY(-50%);
}
</style>
