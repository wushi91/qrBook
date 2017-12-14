<template>
  <el-dialog
    custom-class="my-login-dialog"
    width="400px"
    top="120px"
    :center =true
    :show-close=false
    :visible.sync="showDialog"
    @open="openDialog"
    @close="closeDialog"
    size="small">

    <!--登录的对话框-->
    <div v-show="dialog_login_content" class="dialog-content" >
      <span class="dialog-title">登录</span>
      <input class='input-phonenum' v-model="login_phonenum" placeholder="请输入手机号码"/><br/>
      <input class='input-password' v-model="login_password" type="password" placeholder="请输入密码"/><br/>
      <button class="btn-login">登录</button>
      <div class="dialog_footer">
        <span @click="toForget">忘记密码</span>
        <span @click='toRegister' style="float:right;">免费注册</span>
      </div>
    </div>

    <!--注册的对话框-->
    <div v-show="dialog_register_content" class="dialog-content">
      <span class="dialog-title">注册</span>
      <input class='input-phonenum' v-model="register_phonenum" placeholder="请输入手机号码"/><br/>
      <input class='input-password' v-model="register_password" type="password" placeholder="请设置6-16位密码"/><br/>
      <input class='input-code' v-model="register_code" placeholder="请输入6位验证码"/>
      <button @click="toGetRegisteCode">获取验证码</button>
      <br/>
      <button class="btn-login">注册并登录</button>
    </div>

  </el-dialog>
</template>

<script>



  export default {
    name: 'LoginDialog',
    props: ['showDialog','type'],
    data () {
      return {
//默认值
        login_phonenum: '111',
        login_password: '111',
        register_phonenum: '13822542317',
        register_password: '111',
        register_code:"",


        dialog_login_content: false,
        dialog_register_content: true,
        dialog_forget_content: false,
      }
    },
    methods:{
      openDialog:function () {
        this.dialog_forget_content = false
        this.dialog_login_content = false
        this.dialog_register_content = false
        if(this.type==='注册'){
          console.log('tttttrue')
          this.dialog_register_content = true
        }
        if(this.type==='登录'){
          this.dialog_login_content = true
        }
      },
      closeDialog:function () {

      },
      toForget: function () {
        this.dialog_forget_content = true
        this.dialog_login_content = false
        this.dialog_register_content = false
      },
      toRegister:function () {
        this.dialog_forget_content = false
        this.dialog_login_content = false
        this.dialog_register_content = true
      },
      toGetRegisteCode: function () {
        console.log('请求验证码')
        Request.requestRegisterCode(this)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" >
  @import "../../common/less/index.less";

  .my-login-dialog{
    .el-dialog__header{
      padding:0 ;
    }

    .el-dialog__body{
      padding:0 ;
    }

    .dialog-content{
      padding-top: 24px;
      padding-left: 30px;
      padding-right: 30px;
      padding-bottom: 30px;

      .dialog-title{
        text-align: center;
        display: block;
        font-size:24px;
        color:rgba(50,51,51,1);
        line-height:33px;
      }

      input{
        box-sizing: border-box;
        width: 340px;
        padding-top:12px;
        padding-bottom:13px;
        padding-left:20px;
        outline: none;
        font-size:18px;
        line-height:25px;
        border: none;
        background:rgba(240,241,242,1);
        border-radius: 5px;
      }


      button{
        margin-top: 30px;
        width: 340px;
        font-size:18px;
        color:rgba(255,255,255,1);
        line-height:25px;
        padding-top:13px;
        padding-bottom:13px;
        outline:none;
        background-color: rgba(46,138,230,1);
        border:none;
      }

      .input-phonenum{
        margin-top: 20px;
      }

      .input-password{
        margin-top: 30px;
      }

      .input-code{
        margin-top: 30px;
      }

      .dialog_footer{
        margin-top: 20px;
        span{
          font-size:14px;
          color:rgba(153,153,153,1);
          line-height:20px;
        }
      }

    }

  }
</style>
