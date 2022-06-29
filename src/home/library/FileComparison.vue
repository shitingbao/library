<template>
  <div class="comparison">
    <div class="comparison-left">
      <div>
        <h2>使用说明</h2>
        <ul>
          <li>选择的文件类型只支持xlsx，csv以及txt</li>
          <li>csv文件分割符采用的是英文逗号 “ , ”</li>
          <li>文本文件在上传时，注意编码格式的选择</li>
          <li>结果以json形式反馈，数字是对应文件行号</li>
        </ul>
      </div>
      <h4>选择第一个文件</h4>
      <div class="select-common">
        <el-switch
          class="switch"
          v-model="lIsGBK"
          active-text="utf8"
          inactive-text="gbk"
        >
        </el-switch>

        <el-switch
          class="switch"
          style="display: block"
          v-model="lIsTitle"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="有标题"
          inactive-text="无标题"
        >
        </el-switch>
      </div>
      <el-upload
        :on-change="leftChange"
        class="upload"
        drag
        action="/"
        :show-file-list="false"
        :auto-upload="false"
      >
        <i
          v-if="isFileSelectLeft"
          class="el-icon-tickets avatar-uploader-icon "
        ></i>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div v-if="isFileSelectLeft" class="avatar-filename">
          {{ filenameLeft }}
        </div>
      </el-upload>
      <h4>选择第二个文件</h4>
      <div class="select-common">
        <el-switch
          class="switch"
          v-model="rIsGBK"
          active-text="utf8"
          inactive-text="gbk"
        >
        </el-switch>
        <el-switch
          class="switch"
          style="display: block"
          v-model="rIsTitle"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="有标题"
          inactive-text="无标题"
        >
        </el-switch>
      </div>
      <el-upload
        :on-change="rightChange"
        class="upload"
        :show-file-list="false"
        drag
        action="/"
        :auto-upload="false"
      >
        <i
          v-if="isFileSelectRight"
          class="el-icon-tickets avatar-uploader-icon "
        ></i>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div v-if="isFileSelectRight" class="avatar-filename">
          {{ filenameRight }}
        </div>
      </el-upload>
      <el-button class="compare-button" type="primary" @click="submit" plain
        >比较</el-button
      >
      <el-button class="compare-button" type="primary" @click="clear" plain
        >清空</el-button
      >
    </div>
    <div class="comparison-right">
      <el-tabs v-model="activeName">
        <el-tab-pane label="相同内容" name="first"
          ><editor
            v-model="sameContent"
            @init="editorInit"
            :options="options"
            lang="json"
            theme="chrome"
            width="500"
            height="700"
          ></editor
        ></el-tab-pane>
        <el-tab-pane class="word-different" label="不同内容" name="second"
          ><editor
            v-model="leftContent"
            @init="editorInit"
            lang="json"
            theme="chrome"
            width="500"
            height="700"
          ></editor>
          <editor
            v-model="rightContent"
            @init="editorInit"
            :options="options"
            lang="json"
            theme="chrome"
            width="500"
            height="700"
          ></editor>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileComparison",
  components: {
    editor: require("vue2-ace-editor")
  },
  data() {
    return {
      isFileSelectLeft: false,
      filenameLeft: "",
      isFileSelectRight: false,
      filenameRight: "",
      rIsGBK: true,
      rIsTitle: true,
      lIsGBK: true,
      lIsTitle: true,
      activeName: "second",
      msg: "FileComparison",
      leftContent: "",
      rightContent: "",
      sameContent: "",
      leftFile: {},
      rightFile: {},
      options: {
        //编辑框的一些配置
        /*vue2-ace-editor编辑器配置自动补全等*/
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true /*自动补全*/,
        readOnly: true
      }
    };
  },
  mounted() {},
  methods: {
    show() {},
    editorInit: function() {
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/javascript"); //language
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet

      require("brace");
      require("brace/mode/json");
      require("brace/snippets/json");
      require("brace/snippets/html");
    },
    submit() {
      let param = new FormData(); // 创建form对象
      param.append("lsep", ",");
      param.append("listitle", this.lIsTitle);
      param.append("lisgbk", this.lIsGBK);
      param.append("rsep", ",");
      param.append("ristitle", this.rIsTitle);
      param.append("risgbk", this.rIsGBK);
      param.append("left", this.leftFile.raw);
      param.append("right", this.rightFile.raw);
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      // 添加请求头
      var that = this;
      this.$http.post("/filecomparison", param, config).then(response => {
        that.leftContent = JSON.stringify(response.data.LeftAims, null, "\t");
        that.rightContent = JSON.stringify(response.data.RightAims, null, "\t");
        that.sameContent = JSON.stringify(
          response.data.SameDataLists,
          null,
          "\t"
        );
      });
      this.isFileSelectLeft = false;
      this.filenameLeft = "";
      this.isFileSelectRight = false;
      this.filenameRight = "";
    },
    leftChange(file) {
      this.leftFile = file;
      this.isFileSelectLeft = true;
      this.filenameLeft = file.name;
    },
    rightChange(file) {
      this.rightFile = file;
      this.isFileSelectRight = true;
      this.filenameRight = file.name;
    },
    clear() {
      this.leftFile = {};
      this.rightFile = {};
      this.isFileSelectLeft = false;
      this.filenameLeft = "";
      this.isFileSelectRight = false;
      this.filenameRight = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.comparison {
  display: flex;
  flex-direction: row;
  .comparison-left {
    display: flex;
    width: 400px;
    flex-direction: column;
    .select-common {
      display: flex;
      justify-content: center;
      padding: 0px 0px 10px 0px;
    }
    .compare-button {
      margin: 10px 20px 0px 20px;
    }
  }
  .comparison-right {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    .word-different {
      display: flex;
      flex-direction: row;
    }
  }
}
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
.switch {
  padding: 0px 10px 0px 10px;
}
</style>
