<template>
  <el-dialog
    custom-class="my-login-dialog"
    width="400px"
    top="120px"
    :center=true
    :show-close=false
    :visible.sync="innerShowDialog"
    @open="openDialog"
    @close="closeDialog">

    <!--登录的对话框-->
    <div v-show="dialog_login_content" class="dialog_login_content dialog-content">
      <span class="dialog-title">登录</span>
      <el-input class='input-phonenum' v-model="login_phonenum" placeholder="请输入手机号码"></el-input>
      <el-input class='input-password' v-model="login_password" type="password" placeholder="请输入密码">
        <i slot="suffix" class="el-input__icon el-icon-view"></i>
      </el-input>
      <button @click="userLogin" class="btn-login">登录</button>
      <div class="dialog_footer">
        <span @click="toForget">忘记密码</span>
        <span @click='toRegister' style="float:right;">免费注册</span>
      </div>
    </div>

    <!--注册的对话框-->
    <div v-show="dialog_register_content" class="dialog_register_content dialog-content">
      <span class="dialog-title">注册</span>

      <el-input class='input-phonenum' v-model="register_phonenum" placeholder="请输入手机号码"></el-input>
      <el-input class='input-password' v-model="register_password" type="password" placeholder="请设置6-16位密码">
        <i slot="suffix" class="el-input__icon el-icon-view"></i>
      </el-input>
      <el-input class='input-code' v-model="register_code" placeholder="请输入6位验证码">
        <template slot="append" >
          <div @click="toGetRegisteCode">获取验证码</div>
          </template>
      </el-input>
      <br/>
      <button class="btn-login" @click="userRegister">注册并登录</button>
    </div>

  </el-dialog>
</template>

<script>

  import MyUtil from '@/common/js/MyUtil'
  import Request from '@/common/js/Request'

  export default {
    name: 'LoginDialog',
    props: ['showDialog', 'type'],
    data() {
      return {

        innerShowDialog: this.showDialog,
//默认值
        login_phonenum: '13822542317',
        login_password: '123456',
        register_phonenum: '13410052773',
        register_password: '123456',
        register_code: "201126",


        dialog_login_content: false,
        dialog_register_content: true,
        dialog_forget_content: false,
      }
    },

    watch: {
      //数据同步
      showDialog(val) {
        this.innerShowDialog = val
      }
    },
    methods: {
      openDialog: function () {
        this.dialog_forget_content = false
        this.dialog_login_content = false
        this.dialog_register_content = false
        if (this.type === '注册') {
          this.dialog_register_content = true
        }
        if (this.type === '登录') {
          this.dialog_login_content = true
        }
      },
      closeDialog: function () {
        //子组件对openStatus修改后向父组件发送事件通知
        this.$emit('dialogData', false)
      },

      userLogin: function () {
//        MyUtil.linkToPath(this,'/home')
        Request.requestToLogin(this, this.login_phonenum, this.login_password)
      },
      userRegister: function () {
        //首先校验短信马
        Request.requestCheckRegisterCode(this, this.register_phonenum, this.register_password, this.register_code)
      },

      toForget: function () {
        this.dialog_forget_content = true
        this.dialog_login_content = false
        this.dialog_register_content = false
      },
      toRegister: function () {
        this.dialog_forget_content = false
        this.dialog_login_content = false
        this.dialog_register_content = true
      },
      toGetRegisteCode: function () {
        Request.requestGetRegisterCode(this, this.register_phonenum)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
  @import "../../common/less/index.less";

  .my-login-dialog {

    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
    }

    .dialog-content {
      padding-top: 24px;
      padding-left: 30px;
      padding-right: 30px;
      padding-bottom: 30px;

      .dialog-title {
        text-align: center;
        display: block;
        font-size: 24px;
        color: rgba(50, 51, 51, 1);
        line-height: 33px;
      }

      /*.el-sdsdinput{*/
      /*box-sizing: border-box;*/
      /*width: 340px;*/
      /*padding-top:12px;*/
      /*padding-bottom:13px;*/
      /*padding-left:20px;*/
      /*outline: none;*/
      /*font-size:18px;*/
      /*line-height:25px;*/
      /*border: none;*/
      /*background:rgba(240,241,242,1);*/
      /*border-radius: 5px;*/
      /*}*/

      .el-input {
        background: rgba(240, 241, 242, 1);
        input {
          height: 50px;
          border-radius: 5px;
          outline: none;
          font-size: 18px;
          line-height: 25px;
          border: none;
          background: rgba(240, 241, 242, 1);
        }

        .el-input__icon.el-icon-view {
          cursor: pointer;
          font-size: 30px;
          margin-top: 0;
          margin-right: 17px;
          transform: scaleY(0.5);

          &:hover{
            color: #323333;
          }
        }
      }

      button {
        margin-top: 30px;
        width: 340px;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
        padding-top: 13px;
        padding-bottom: 13px;
        outline: none;
        background-color: rgba(46, 138, 230, 1);
        border: none;
      }

      .input-phonenum {
        margin-top: 20px;
      }

      .input-password {
        margin-top: 30px;
      }

      .input-code {
        margin-top: 30px;
        .el-input-group__append{
          padding: 0;
          text-align: center;
          width: 170px;
          border: none;
          background: rgba(240, 241, 242, 1);

          div{
            cursor: pointer;
            font-size:18px;
            color:rgba(250,75,87,1);
            line-height:25px;

            border-left: 1px solid #CACBCC ;
          }
        }
      }

      .dialog_footer {
        margin-top: 20px;
        span {
          cursor: pointer;
          font-size: 14px;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
        }
      }

    }

  }
</style>
