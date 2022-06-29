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
        <a @click="register">Create an account.</a>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    register() {
      this.isLogin = false;
      this.$router.push({ path: "/register" });
    },
    login() {
      let config = {
        headers: { "stbweb-api": "login" }
      };
      let param = {
        Name: this.username,
        Pwd: this.strToHexCharCode(this.pwd)
      };
      // 添加请求头
      this.$http.post("/login", param, config).then(response => {
        if (!response.data.success) {
          console.log("err:", response.data);
          return;
        }

        localStorage.setItem("username", this.username);
        localStorage.setItem("token", response.data.token);
        this.$router.push({ name: "home" });
      });
    },
    // login() {
    //   this.$router.push({ name: "home" });
    // },
    strToHexCharCode(str) {
      if (str === "") return "";
      var hexCharCode = [];
      for (var i = 0; i < str.length; i++) {
        hexCharCode.push(str.charCodeAt(i).toString(16));
      }
      return hexCharCode.join("");
    }
  },
  mounted() {
    let config = {
      headers: { "stbweb-api": "check" }
    };
    let param = {
      token: localStorage.getItem("token")
    };
    // 添加请求头
    this.$http.post("/login", param, config).then(response => {
      if (response.data.success) {
        this.$router.push({ name: "home" });
        return;
      }
    });
  },
  data() {
    return {
      username: "",
      pwd: ""
    };
  },
  name: "Login",
  props: {}
};
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
