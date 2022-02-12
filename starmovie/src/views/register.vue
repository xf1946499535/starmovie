<template>
  <div class="register">
    <div class="w">
      <div class="r_main">
        <div class="left">
          <div class="msg">
            <span>用户名:</span>
            <input
              class="m_item"
              @blur="checkusername"
              v-model="reguser.userName"
              placeholder="请输入用户名，只能由字母或数字组成"
            />
            <svg
              v-if="c_userName"
              t="1618636237360"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1063"
              width="16"
              height="16"
            >
              <path
                d="M736.064 434.5813 490.816 672.7893c0 0.0213-0.0213 0.0213-0.0427 0.0213L488.32 675.2l-0.2773-0.2347c-10.0267 8.512-22.4427 12.928-34.9653 12.8853-13.6747 0.0427-27.3493-4.9707-37.7387-15.0827l-132.0107-128.2347c-20.7573-20.1173-20.7573-52.7787 0-72.9173 20.7147-20.1173 54.336-20.1173 75.072 0l94.6773 91.968 207.9147-201.984c20.736-20.1173 54.3787-20.0747 75.072 0C756.8213 381.7813 756.8213 414.4427 736.064 434.5813zM506.6667 917.3547c235.648 0 426.6667-191.0187 426.6667-426.6667s-191.0187-426.6667-426.6667-426.6667-426.6667 191.0187-426.6667 426.6667S271.0187 917.3547 506.6667 917.3547z"
                fill="#1296db"
                p-id="1064"
              ></path>
            </svg>
            <svg
              v-if="!c_userName"
              t="1618636529575"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1545"
              width="16"
              height="16"
            >
              <path
                d="M512 64a448 448 0 1 0 0 896A448 448 0 0 0 512 64z m217.344 609.92a39.04 39.04 0 0 1 0 55.488 39.04 39.04 0 0 1-55.488 0l-159.36-159.36-159.36 159.36a39.04 39.04 0 0 1-55.552 0 39.04 39.04 0 0 1 0-55.488l159.36-159.36-159.36-159.36a39.04 39.04 0 0 1 0-55.552 39.04 39.04 0 0 1 55.552 0l159.36 159.36 159.36-159.36a39.04 39.04 0 0 1 55.488 0 39.04 39.04 0 0 1 0 55.552l-159.36 159.36 159.36 159.36z"
                fill="#515151"
                p-id="1546"
              ></path>
            </svg>
          </div>
          <div class="msg">
            <span>密码:</span>
            <input
              @blur="checkpwd"
              v-model="reguser.passwd"
              type="password"
              placeholder="请输入密码"
              class="m_item"
            />
            <svg
              v-if="c_pwd"
              t="1618636237360"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1063"
              width="16"
              height="16"
            >
              <path
                d="M736.064 434.5813 490.816 672.7893c0 0.0213-0.0213 0.0213-0.0427 0.0213L488.32 675.2l-0.2773-0.2347c-10.0267 8.512-22.4427 12.928-34.9653 12.8853-13.6747 0.0427-27.3493-4.9707-37.7387-15.0827l-132.0107-128.2347c-20.7573-20.1173-20.7573-52.7787 0-72.9173 20.7147-20.1173 54.336-20.1173 75.072 0l94.6773 91.968 207.9147-201.984c20.736-20.1173 54.3787-20.0747 75.072 0C756.8213 381.7813 756.8213 414.4427 736.064 434.5813zM506.6667 917.3547c235.648 0 426.6667-191.0187 426.6667-426.6667s-191.0187-426.6667-426.6667-426.6667-426.6667 191.0187-426.6667 426.6667S271.0187 917.3547 506.6667 917.3547z"
                fill="#1296db"
                p-id="1064"
              ></path>
            </svg>
            <svg
              v-if="!c_pwd"
              t="1618636529575"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1545"
              width="16"
              height="16"
            >
              <path
                d="M512 64a448 448 0 1 0 0 896A448 448 0 0 0 512 64z m217.344 609.92a39.04 39.04 0 0 1 0 55.488 39.04 39.04 0 0 1-55.488 0l-159.36-159.36-159.36 159.36a39.04 39.04 0 0 1-55.552 0 39.04 39.04 0 0 1 0-55.488l159.36-159.36-159.36-159.36a39.04 39.04 0 0 1 0-55.552 39.04 39.04 0 0 1 55.552 0l159.36 159.36 159.36-159.36a39.04 39.04 0 0 1 55.488 0 39.04 39.04 0 0 1 0 55.552l-159.36 159.36 159.36 159.36z"
                fill="#515151"
                p-id="1546"
              ></path>
            </svg>
          </div>
          <div class="msg">
            <span>真实姓名:</span>
            <input
              @blur="checkname"
              class="m_item"
              v-model="reguser.name"
              placeholder="请输入姓名"
            />
            <svg
              v-if="c_name"
              t="1618636237360"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1063"
              width="16"
              height="16"
            >
              <path
                d="M736.064 434.5813 490.816 672.7893c0 0.0213-0.0213 0.0213-0.0427 0.0213L488.32 675.2l-0.2773-0.2347c-10.0267 8.512-22.4427 12.928-34.9653 12.8853-13.6747 0.0427-27.3493-4.9707-37.7387-15.0827l-132.0107-128.2347c-20.7573-20.1173-20.7573-52.7787 0-72.9173 20.7147-20.1173 54.336-20.1173 75.072 0l94.6773 91.968 207.9147-201.984c20.736-20.1173 54.3787-20.0747 75.072 0C756.8213 381.7813 756.8213 414.4427 736.064 434.5813zM506.6667 917.3547c235.648 0 426.6667-191.0187 426.6667-426.6667s-191.0187-426.6667-426.6667-426.6667-426.6667 191.0187-426.6667 426.6667S271.0187 917.3547 506.6667 917.3547z"
                fill="#1296db"
                p-id="1064"
              ></path>
            </svg>
            <svg
              v-if="!c_name"
              t="1618636529575"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1545"
              width="16"
              height="16"
            >
              <path
                d="M512 64a448 448 0 1 0 0 896A448 448 0 0 0 512 64z m217.344 609.92a39.04 39.04 0 0 1 0 55.488 39.04 39.04 0 0 1-55.488 0l-159.36-159.36-159.36 159.36a39.04 39.04 0 0 1-55.552 0 39.04 39.04 0 0 1 0-55.488l159.36-159.36-159.36-159.36a39.04 39.04 0 0 1 0-55.552 39.04 39.04 0 0 1 55.552 0l159.36 159.36 159.36-159.36a39.04 39.04 0 0 1 55.488 0 39.04 39.04 0 0 1 0 55.552l-159.36 159.36 159.36 159.36z"
                fill="#515151"
                p-id="1546"
              ></path>
            </svg>
          </div>
          <div class="msg">
            <span>头像URL:</span>
            <input
              @blur="checkheadimg"
              class="m_item"
              v-model="reguser.headImg"
              placeholder="请放入头像url"
            />
            <svg
              v-if="c_headimg"
              t="1618636237360"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1063"
              width="16"
              height="16"
            >
              <path
                d="M736.064 434.5813 490.816 672.7893c0 0.0213-0.0213 0.0213-0.0427 0.0213L488.32 675.2l-0.2773-0.2347c-10.0267 8.512-22.4427 12.928-34.9653 12.8853-13.6747 0.0427-27.3493-4.9707-37.7387-15.0827l-132.0107-128.2347c-20.7573-20.1173-20.7573-52.7787 0-72.9173 20.7147-20.1173 54.336-20.1173 75.072 0l94.6773 91.968 207.9147-201.984c20.736-20.1173 54.3787-20.0747 75.072 0C756.8213 381.7813 756.8213 414.4427 736.064 434.5813zM506.6667 917.3547c235.648 0 426.6667-191.0187 426.6667-426.6667s-191.0187-426.6667-426.6667-426.6667-426.6667 191.0187-426.6667 426.6667S271.0187 917.3547 506.6667 917.3547z"
                fill="#1296db"
                p-id="1064"
              ></path>
            </svg>
            <svg
              v-if="!c_headimg"
              t="1618636529575"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1545"
              width="16"
              height="16"
            >
              <path
                d="M512 64a448 448 0 1 0 0 896A448 448 0 0 0 512 64z m217.344 609.92a39.04 39.04 0 0 1 0 55.488 39.04 39.04 0 0 1-55.488 0l-159.36-159.36-159.36 159.36a39.04 39.04 0 0 1-55.552 0 39.04 39.04 0 0 1 0-55.488l159.36-159.36-159.36-159.36a39.04 39.04 0 0 1 0-55.552 39.04 39.04 0 0 1 55.552 0l159.36 159.36 159.36-159.36a39.04 39.04 0 0 1 55.488 0 39.04 39.04 0 0 1 0 55.552l-159.36 159.36 159.36 159.36z"
                fill="#515151"
                p-id="1546"
              ></path>
            </svg>
          </div>
          <!-- 头像 -->

          <div class="submit_btn" @click="register">确认注册</div>
        </div>
        <div class="right">
          <img :src="o_headImg" alt="" />
          <span>用户名:{{ reguser.userName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getallUser();
  },
  data() {
    return {
      reguser: {
        //注册用户临时存放变量
        userName: null,
        passwd: null,
        name: null,
        headImg:
          "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3730772664,138405132&fm=26&gp=0.jpg",
        lv: "normal", //默认为普通用户
      },
      o_headImg:
        "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2829271447,1822842579&fm=26&gp=0.jpg", //默认图像
      userlist: [], //所有用户
      imageUrl: "",
      //输入检查
      c_userName: false,
      c_pwd: false,
      c_name: false,
      c_headimg: false,
    };
  },

  methods: {
    //为了检查用户名是否被使用过，获取所有用户
    async getallUser() {
      let apiurl = this.$store.getters.GETapihttp + "user/list";
      let res = await axios.get(apiurl, {
        method: "GET",
      });
      this.userlist = res.data;
    },
    //检查用户名是否可用
    checkusername() {
      var check = true;
      //检查用户名是否被使用过
      for (const item of this.userlist) {
        if (
          this.reguser.userName == item.userName ||
          this.reguser.userName == null
        ) {
          check = false;
        }
      }
      if (check == false) {
        check == false;
        this.c_userName = false;
        return false;
      }
      //使用户名只包含英文或者数字
      let reg = "^[A-Za-z0-9]+$";
      var re = new RegExp(reg);
      if (
        re.test(this.reguser.userName) &&
        this.reguser.userName != null &&
        this.reguser.userName != ""
      ) {
        this.c_userName = true;
        return true;
      } else {
        this.c_userName = false;
        return false;
      }
    },

    //检查密码
    checkpwd() {
      if (this.reguser.passwd == null) {
        this.c_pwd = false;
        return false;
      } else {
        this.c_pwd = true;
        return true;
      }
    },
    //检查个人姓名
    checkname() {
      if (this.reguser.name == null) {
        this.c_name = false;
        return false;
      } else {
        this.c_name = true;
        return true;
      }
    },
    //检查头像
    checkheadimg() {
      if (this.reguser.headImg == null || this.reguser.headImg == "") {
        this.o_headImg =
          "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2829271447,1822842579&fm=26&gp=0.jpg";
        this.c_headimg = false;
        return false;
      } else {
        this.o_headImg = JSON.parse(JSON.stringify(this.reguser.headImg));
        this.c_headimg = true;
        return true;
      }
    },

    //确认注册
    register() {
      var r = confirm("确认注册吗?");
      if (!r) {
        return false;
      }
      if (
        this.checkheadimg() &&
        this.checkusername() &&
        this.checkpwd() &&
        this.checkname() &&
        r
      ) {
        let apiurl = this.$store.getters.GETapihttp + "user/add";
        let res = axios.get(apiurl, {
          method: "GET",
          params: {
            //注册用户临时存放变量
            userName: this.reguser.userName,
            passwd: this.reguser.passwd,
            name: this.reguser.name,
            headImg: this.reguser.headImg,
            lv: "normal", //默认为普通用户
          },
        });
        this.$router.push("/loginpage");
      } else {
        confirm("请完成信息填写并满足要求");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.w {
  margin-top: 2rem;
}
.r_main {
  width: 100%;
  height: 50rem;
  display: flex;
  justify-content: space-between;
}
.left {
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
}
.left .msg {
  position: relative;
  margin-top: 2rem;
  height: 4rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  span {
    display: block;
    height: 4rem;
    line-height: 4rem;
    width: 20%;
    color: rgba(100, 100, 100);
  }
  .m_item {
    width: 80%;
    font-size: 1.5rem;
    border: 1px solid rgb(15, 189, 229);
  }
  .m_item:focus {
    outline-color: rgb(15, 189, 229);
  }
  svg {
    height: 100%;
    margin-left: 1rem;
  }
}
.submit_btn {
  margin-top: 3rem;
  height: 3rem;
  width: 8rem;
  text-align: center;
  background-color: rgb(15, 189, 229);
  line-height: 3rem;
  font-size: 1.2rem;
  border-radius: 1rem;
  color: #fff;
  cursor: pointer;
}
.submit_btn:hover {
  background-color: rgb(67, 201, 231);
}
.right {
  width: 40%;
  height: 100%;
  background-color: rgba(227, 227, 227, 0.1);
  border: 2px solid rgba(227, 227, 227);
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 50%;
  }
  span {
    display: block;
    font-size: 1.5rem;
    margin-top: 3rem;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>