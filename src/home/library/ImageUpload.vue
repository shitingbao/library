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
            class="el-icon-tickets avatar-uploader-icon "
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

<script>
export default {
  name: "ImageUpload",
  components: {
    editor: require("vue2-ace-editor")
  },
  data() {
    return {
      content: "123",
      fileNameNum: 0, //防止相同名称文件多次输入，文件名与数据对应出问题
      formFileList: [], //保存要提交的文件内容
      isFileSelect: false, //是否显示选择的文件名，图标
      fileHistoryList: [
        {
          name: "1",
          data: ""
        }
      ], //保存历史查询数据，文件名称对应数据
      fileHistoryName: ["1"], //保存历史查询文件名称，用来对应数据
      filename: "" //选择的文件名称
    };
  },
  methods: {
    editorInit() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
      require("brace/mode/json");
      require("brace/snippets/json");
      let _this = this;
      _this.$refs.edit.editor.setShowFoldWidgets(true);
      _this.$refs.edit.editor.setReadOnly(true); //是否为只读
    },
    submitUpload() {
      this.isFileSelect = false;
      let param = new FormData(); // 创建form对象
      for (let i = 0; i < this.formFileList.length; i++) {
        param.append(i + "", this.formFileList[i].raw); // 通过append向form对象添加数据
      }
      param.append("chunk", "0"); // 添加form表单中其他数据
      // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let that = this;
      let resData = [];
      // 添加请求头
      this.$http.post("/image", param, config).then(response => {
        // console.log(response.data[0].words_result);
        for (let j = 0; j < response.data.length; j++) {
          for (let i = 0; i < response.data[j].words_result.length; i++) {
            resData.push(response.data[j].words_result[i].Words);
          }
        }
        that.content = JSON.stringify(resData, null, "\t");
        let num = this.selectSameFile(this.filename);
        let named = this.filename; //不直接使用文件名，如果遇到相同文件名称已经存在，就文件名后+1.如：新建文件夹（1）
        if (num > 0) {
          named = this.filename + "(" + num + ")";
        }
        console.log(num, ":", named);
        this.fileHistoryList.push({ name: named, data: that.content });
        this.fileHistoryName.push(named);
      });
      this.formFileList = [];
    },
    selectSameFile(filename) {
      let num = 0;
      this.fileHistoryName.forEach(element => {
        if (element == filename) {
          num++;
        }
      });
      return num;
    },
    change(file) {
      this.isFileSelect = true;
      this.filename = file.name;
      this.formFileList.push(file);
    },
    selectHistory(filename) {
      this.fileHistoryList.forEach(element => {
        if (element.name == filename) {
          this.content = element.data;
        }
      });
    },
    clear() {
      this.isFileSelect = false;
      this.filename = "";
      this.formFileList = [];
    }
  }
};
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
