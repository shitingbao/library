<template>
  <div>
    <el-switch
      v-model="isOrdinary"
      active-color="#13ce66"
      inactive-color="#1E90FF"
      active-text="高级模式"
      inactive-text="普通模式"
      class="switch"
    >
    </el-switch>
    <el-switch
      v-model="isfileType"
      active-color="#13ce66"
      inactive-color="#1E90FF"
      active-text="生成excel"
      inactive-text="生成csv"
      class="switch"
    >
    </el-switch>
    <div v-show="!isOrdinary" class="file">
      <el-upload
        class="file-up"
        ref="upload"
        action="/"
        :on-remove="handleRemove"
        :on-change="changeFile"
        :file-list="fileList"
        :auto-upload="false"
        multiple
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload(isfileType ? 'excel' : 'csv')"
          >上传到服务器</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传xlsx,csv,txt文件，且不超过20M<br />可以多选文件，但是注意同名文件会覆盖<br />文本默认使用了英文“
          , ”作为分隔符，如果正文中出现该符号，则会判断为新的列
        </div>
      </el-upload>
      <div class="file-line">
        <h3>下载链接</h3>
        <div class="line" v-for="(item, index) in downFileList" :key="index">
          <!-- <span @click="download(item.url)">{{ item.name }}</span> -->
          <!-- <a :href="item.url" download>{{ item.name }}</a> -->
          <span
            :href="item.url"
            @click.prevent="downloadItem(item.url, item.name)"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>

    <ExcelToCsvCommon
      :fileType="isfileType ? 'excel' : 'csv'"
      v-show="isOrdinary"
    ></ExcelToCsvCommon>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import ExcelToCsvCommon from "./ExcelToCsvCommon";

const isOrdinary = ref(false); //是否是普通选项,false为普通选项
const activeName = ref("csv"); //默认显示哪个卡片
const isfileType = ref(false);
//upload中用于展示的列表
const fileList = ref([]);
//表单中要上传的文件
const formFileList = ref([]);
const downFileList = ref([]);

function downloadItem(url, label) {
  axios
    .get(url, { responseType: "blob" })
    .then((response) => {
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = label;
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch(console.error);
}
function download(base) {
  let config = {
    headers: { "stbweb-api": "down", token: localStorage.getItem("token") },
  };
  let param = {
    Base: base,
  };
  // 添加请求头
  this.$http.post("/down", param, config).then((response) => {
    if (response.data.success) {
      return;
    }
  });
}

function changeFile(file) {
  this.formFileList.push({ name: file.name, fData: file.raw });
  // console.log("change:", file);
}

//默认提交，不考虑分隔符和编码格式
function submitUpload(createFileType) {
  for (let i = 0; i < this.formFileList.length; i++) {
    let param = new FormData(); // 创建form对象
    param.append("file", this.formFileList[i].fData);
    // param.append("sep", "");
    // param.append("gbk", "");
    // param.append("createSep", "");
    // param.append("isCreateGBK", "");
    param.append("createFileType", createFileType);
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    this.$http.post("/export", param, config).then((response) => {
      if (response.data.success) {
        // console.log(response.data.url);
        this.downFileList.push({
          name: response.data.url.split("/")[1],
          url: axios.defaults.baseURL + "/" + response.data.url,
        });
      } else {
        this.$message({
          showClose: true,
          message: response.data.msg,
          type: "error",
          duration: 2000,
        });
      }
    });
  }
  this.fileList = [];
  this.formFileList = [];
}

function handleRemove(file) {
  // console.log("remove:", file, fileList);
  var index = this.formFileList.findIndex((item) => {
    if (item.name == file.name) {
      return true;
    }
  });
  this.formFileList.splice(index, 1);
}
</script>
<style lang="scss" scoped>
.switch {
  padding: 20px 20px;
}
.file {
  display: flex;
  padding: 0px 200px;
  .file-up {
    flex-grow: 5;
    width: 500px;
    padding-top: 15px;
  }
  .file-line {
    flex-grow: 2;

    width: 300px;
    .line {
      padding: 5px 0px;
    }
  }
}
</style>
