<template>
  <div>
    <el-upload
      ref="upload"
      action="/"
      :show-file-list="false"
      :on-change="importCsv"
      :auto-upload="false"
    >
      <el-button
        slot="trigger"
        icon="el-icon-upload"
        size="small"
        type="primary"
        >选择解析文件</el-button
      >
    </el-upload>
    <br />
    <el-button type="primary" @click="exportExcel" plain
      >生成并下载excel文件</el-button
    >
    <div>
      <span>选择的文件名称：</span>
      <span>{{ filename }}</span>
    </div>
    <div>
      <span>文件内容：</span>
      <br />
      <span v-for="(i, val) in filecontent" :key="val">{{ i }}--{{ val }}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
// import * as d3 from "d3";
//一般采用第二种方法来处理excel文件
import XLSX from "xlsx";
const filename = ref("");
const isFileSelect = ref(false);
const filecontent = ref<any[]>([]);
//解析后文件内容保存

const noFindFile = ref<any[]>([]); //批量导入未找到的内容保存

const xlsxJson = ref<any>({});
//第一种excel解析方法
function importExcel(file: any) {
  // let file = file.files[0] // 使用传统的input方法需要加上这一步
  const types = file.name.split(".")[1];
  const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
    (item) => item === types
  );
  if (!fileType) {
    alert("格式错误！请重新选择");
    return;
  }
  file2Xce(file).then((tabJson) => {
    if (tabJson && (tabJson as any).length > 0) {
      xlsxJson.value = tabJson;
    }
  });
}
function file2Xce(file: any) {
  return new Promise(function (resolve) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = e?.target?.result;
      const wb = XLSX.read(data, {
        type: "binary",
      });
      const result: any[] = [];
      (wb.SheetNames as any[]).forEach((sheetName) => {
        result.push({
          sheetName: sheetName,
          sheet: XLSX.utils.sheet_to_json(wb.Sheets[sheetName]),
        });
      });
      resolve(result);
      console.log("res:", result);
    };
    reader.readAsBinaryString(file.raw);
  });
}
//生成并下载文件
function exportCvs() {
  var storageObj = {
    title: ["时间", "label名称", "点击次数"],
    titleForKey: ["labelTime", "lableName", "labelCount"],
    data: [
      {
        labelTime: "value1",
        lableName: "value2",
        labelCount: "value3",
      },
      {
        labelTime: "value4",
        lableName: "value5",
        labelCount: "value6",
      },
      {
        labelTime: "value7",
        lableName: "value8",
        labelCount: "value9",
      },
    ],
  };
  // var title = storageObj.title;
  var titleForKey = storageObj.titleForKey;
  const data = storageObj.data;
  var str = [];
  str.push(storageObj.title.join(",") + "\n");
  for (var i = 0; i < data.length; i++) {
    var temp = [];
    for (var j = 0; j < titleForKey.length; j++) {
      const idx = titleForKey[j];
      const da: any = data[i];
      const dt = da[idx];
      temp.push(dt);
    }
    str.push(temp.join(",") + "\n");
  }
  var uri =
    "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str.join(""));
  var downloadLink = document.createElement("a");
  downloadLink.href = uri;
  downloadLink.download =
    new Date().toISOString().substring(0, 10) + "-labelDetail.csv";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
//第二种解析方法
function importCsv(file: any) {
  var fileType = file.name.slice(file.name.indexOf("."));
  if ([".xlsx", ".csv", ".xls"].indexOf(fileType) == -1) {
    console.log(file.name + "的文件格式错误,请重新选择.");
    // this.$message.error(file.name + "的文件格式错误,请重新选择.")
  } else {
    getFileJson(file);
  }
  isFileSelect.value = true;
  filename.value = file.name;
}
function getFileJson(file: any) {
  const reader = new FileReader();
  reader.onload = (e) => {
    var z = XLSX.read(e?.target?.result, { type: "buffer" });
    filecontent.value = XLSX.utils.sheet_to_json(z.Sheets[z.SheetNames[0]], {
      defval: "",
    });
  };
  reader.readAsArrayBuffer(file.raw);
}
//第二种方法，生成对应excel文件
function exportExcel() {
  const tHeader = {
    crd编号: "",
    电池序列号: "",
    电池规格: "",
    厂内编号: "",
    所属公司: "",
    所属部门: "",
    出厂日期: "",
    "(该列忽略不填)左侧格式为:2020/01/01": "",
  };
  noFindFile.value.push(tHeader);
  var wb = XLSX.utils.book_new({ raw: true });
  var ws = XLSX.utils.json_to_sheet(noFindFile.value);
  XLSX.utils.book_append_sheet(wb, ws);
  XLSX.writeFile(wb, "example.xlsx");
}
</script>
