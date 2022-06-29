<template>
  <div class="registered">
    <div class="registered-title">Join StbWeb</div>
    <h1 class="registered-word">
      Create your account!
      <div class="registered-word-title">
        or
        <a @click="returnLogin">sign in</a>
      </div>
    </h1>
    <div class="box-width registered-label">
      Username
      <div class="star">*</div>
    </div>
    <el-input class="box-width input" placeholder="your username" v-model="username" clearable></el-input>
    <div class="box-width registered-label">
      Password
      <div class="star">*</div>
    </div>
    <el-input class="box-width input" placeholder="your password" v-model="pwd" show-password></el-input>
    <el-button type="primary" @click="register">注册</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    returnLogin() {
      this.$router.push({ name: "login" });
    },
    register() {
      let config = {
        headers: { "stbweb-api": "register" }
      };
      let param = {
        Name: this.username,
        Password: this.strToHexCharCode(this.pwd)
      };
      // 添加请求头
      this.$http.post("/register", param, config).then(response => {
        if (!response.data.success) {
          console.log("err:", response.data);
          return;
        }
        // this.$router.push({ path: "/login" });
        this.$router.push({ name: "login" });
      });
    },
    strToHexCharCode(str) {
      if (str === "") return "";
      var hexCharCode = [];
      for (var i = 0; i < str.length; i++) {
        hexCharCode.push(str.charCodeAt(i).toString(16));
      }
      return hexCharCode.join("");
    }
  },
  mounted() {},
  data() {
    return {
      username: "",
      pwd: "",
      isLogin: true
    };
  },
  name: "Register",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box-width {
  width: 540px;
}
.star {
  padding-left: 5px;
  color: #cb2431;
  content: "*";
}
.registered {
  display: flex;
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  // background: yellow;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .registered-word {
    display: flex;
    flex-direction: row;
    .registered-word-title {
      margin-top: 5px;
      font-size: 24px;
      a {
        color: #0366d6;
        text-decoration: none;
        font-size: 15px;
        cursor: pointer;
      }
    }
  }
  .registered-title {
    padding-top: 50px;
  }
  .registered-label {
    display: flex;
    flex-direction: row;
    margin-bottom: 7px;
  }
  .input {
    padding-bottom: 30px;
    height: 25px;
  }
}
</style>
