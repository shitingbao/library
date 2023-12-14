<template>
  <div>
    chat
    <el-button class="login-table-signin" type="primary" @click="send">
      ping
    </el-button>
    <div>
      <div class="base-info">
        <a id="downloadLink" href="#" :onclick="downloadFile">Download File</a>
      </div>
      <a-upload
        v-model:file-list="fileList"
        name="file"
        :customRequest="onLicencePhotoUpload"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          Click to Upload
        </a-button>
      </a-upload>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import { UploadOutlined } from "@ant-design/icons-vue";
import type { UploadChangeParam } from "ant-design-vue";
import TOS from "@volcengine/tos-sdk";
import axios from "axios";

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success(`${info.file.name} file uploaded successfully`);
  } else if (info.file.status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};

const fileList = ref([]);
const headers = {
  authorization: "authorization-text",
};

const onLicencePhotoUpload = async (options: any) => {
  const { onSuccess, onError, file, onProgress } = options;
  const data = {
    type: "tos",
    result: {
      endpoint: "http://ixdom-dev.tos-cn-shanghai.volces.com",
      region: "cn-shanghai",
      bucket: "ixdom-dev",
      cert: {
        ExpiredTime: "2023-12-14T12:09:37+08:00",
        CurrentTime: "2023-12-14T11:09:37+08:00",
        AccessKeyId: "AKTP0V9ZZ81fOCDzswmjiMkqwTuqs15SxM4uoHaizn6GWN",
        SecretAccessKey: "jqv6im4BxZfykl0zbbmpH3wnP1X3DGWdZwiyQNA4DMa",
        SessionToken:
          "nCgdqdEROend3.ChsKBzNzX056d3cSEN5WyySh2009kupDtZeZZ1cQ8ePpqwYYgYDqqwYgv-XK6QcoBDCpj5gBQgRVc2VySn17IlN0YXRlbWVudCI6W3siRWZmZWN0IjoiQWxsb3ciLCJBY3Rpb24iOlsidG9zOlB1dE9iamVjdCJdLCJSZXNvdXJjZSI6WyJ0cm46dG9zOjo6aXhkb20tZGV2L2Zpcm0vMi9zdG9yYWdlL3B1YmxpYy9hYS5wZGYiXX1dfVIQc3RvcmFnZV9kZW50cnlfN1gC.qix3VAoDYwxAhD8aChuJk5vpyopW2MeXSAb2Olszw6hws2IdiCXV0Y3M3SS4U6pk52B-Flod9hSPJOfqPXSFKg",
      },
      key: "firm/2/storage/public/aa.pdf",
    },
    fileExist: false,
  };
  const tosClient = new TOS({
    accessKeyId: data.result.cert.AccessKeyId,
    accessKeySecret: data.result.cert.SecretAccessKey,
    stsToken: data.result.cert.SessionToken,
    secure: true,
    region: data.result.region,
    bucket: data.result.bucket,
  });
  try {
    console.log("file==:", file);
    const ss = await tosClient.putObject({
      key: "firm/2/storage/public/aa.pdf",
      body: file,
      progress: onProgress,
    });
    console.log(ss);
    onSuccess();
    message.success("上传成功");
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      onError(e.message);
    } else {
      onError("上传失败");
    }
  }
};

function send() {
  // this.$socket.io.emit("ping", "ping");
  console.log("ping:", "ping");
}

async function downloadFile() {
  const urlPath =
    "https://ixdom-dev.tos-cn-shanghai.volces.com/firm/2/storage/public/dd.txt?X-Tos-Algorithm=TOS4-HMAC-SHA256&X-Tos-Content-Sha256=UNSIGNED-PAYLOAD&X-Tos-Credential=AKLTNTNlNjhiZDU0OTNmNDQzZWEzNWQ0YzliMWJlZGZhYWM%2F20231214%2Ftos-cn-shanghai.volces.com%2Ftos%2Frequest&X-Tos-Date=20231214T072116Z&X-Tos-Expires=10&X-Tos-SignedHeaders=host&X-Tos-Signature=4d654d19d6bde55f8ff12730146a8d16591f2ce36ec70f76cb4efc67b2b44dd1";
  const urlpaths = new URL(urlPath).pathname.split("/");
  const fliename = urlpaths.pop();
  console.log("fliename====:", fliename);

  const res = await axios.get(urlPath, { responseType: "blob" });

  const blob = new Blob([res.data], { type: res.headers["content-type"] });
  let dom = document.createElement("a");
  let url = window.URL.createObjectURL(blob);
  dom.href = url;
  dom.download = decodeURI(fliename as string);
  dom.style.display = "none";
  document.body.appendChild(dom);
  dom.click();
  dom.parentNode?.removeChild(dom);
  window.URL.revokeObjectURL(url);
}

onMounted(() => {
  console.log("onMounted 123");
});
</script>
