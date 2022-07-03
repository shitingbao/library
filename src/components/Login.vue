<template>
  <div class="login">
    <div class="login-title">标识图片</div>
    <h1>Sign in to StbWeb</h1>
    <div class="login-table">
      <label>Username or email address</label>
      <el-input placeholder v-model="username" clearable></el-input>
      <label class="login-table-password-title">
        Password
        <a>Forgot password?</a>
      </label>
      <el-input
        placeholder
        v-model="pwd"
        show-password
        @keyup.enter.native="login"
      ></el-input>
      <el-button class="login-table-signin" type="primary" @click="login"
        >Sign&nbsp;in</el-button
      >
    </div>
    <div class="create-table">
      <label class="create-table-password-title">
        New to GitHub?
        <a @click="toRegister">Create an account.</a>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import router from "@/router/router";
import { login } from "@/libs/api/loginAndRegister";

const username = ref("");
const pwd = ref("");

const name = ref("Login");
const isLogin = ref(true);

function toRegister() {
  isLogin.value = false;
  router.push("register");
}

function loginApi() {
  let config = {
    headers: { "stbweb-api": "login" },
  };
  let param = {
    Name: username,
    Pwd: strToHexCharCode(pwd.value),
  };
  // 添加请求头
  const response = login(param, config);
  if (!response) {
    console.log("err:");
    return;
  }

  localStorage.setItem("username", username.value);
  // localStorage.setItem("token", response.data.token);
  router.push("home");
}

function strToHexCharCode(str: string) {
  if (str === "") return "";
  var hexCharCode = [];
  for (var i = 0; i < str.length; i++) {
    hexCharCode.push(str.charCodeAt(i).toString(16));
  }
  return hexCharCode.join("");
}

onMounted(() => {
  let config = {
    headers: { "stbweb-api": "check" },
  };
  let param = {
    token: localStorage.getItem("token"),
  };
  const response = login(param, config);
  if (!response) {
    console.log("err:");
    return;
  }
  router.push({ name: "home" });
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-title {
    padding-top: 25px;
    padding-bottom: 25px;
    height: 49px;
  }
  h1 {
    color: #333;
    text-align: center;
    text-shadow: none;
    margin: 0px;
    font-size: 24px;
    font-weight: 100;
    letter-spacing: -0.5px;
    padding-bottom: 20px;
  }
  .login-table {
    display: flex;
    flex-direction: column;
    width: 308px;
    justify-content: center;
    padding: 20px;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid #d8dee2;
    border-top: 1px solid #d8dee2;
    border-radius: 5px;
    .login-table-password-title {
      padding-top: 15px;
      justify-content: space-between;
      a {
        color: #0366d6;
        text-decoration: none;
        font-size: 12px;
        cursor: pointer;
      }
    }
    label {
      display: flex;
      justify-content: flex-start;
      margin-bottom: 7px;
      font-weight: 500;
      font-size: 14px;
    }
    .login-table-signin {
      margin-top: 15px;
    }
  }
  .create-table {
    display: flex;
    flex-direction: column;
    width: 308px;
    justify-content: center;
    padding: 20px;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid #d8dee2;
    border-top: 1px solid #d8dee2;
    border-radius: 5px;
    margin-top: 20px;
    .create-table-password-title {
      a {
        color: #0366d6;
        text-decoration: none;
        cursor: pointer;
      }
    }
  }
}
</style>
