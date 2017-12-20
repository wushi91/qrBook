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


    <!--添加银行卡的对话框-->
    <div v-show="dialog_login_content" class="dialog_login_content dialog-content">
      <span class="dialog-title">添加银行卡</span>
      <el-input class='input-bank-username' v-model="addcard_bank_username" placeholder="请输入持卡人姓名"></el-input>
      <el-input class='input-bank-name' v-model="addcard_bank_name" placeholder="请输入开户行"></el-input>
      <el-input class='input-bank-cardnum' v-model="addcard_bank_cardnum" placeholder="请输入银行卡号"></el-input>
      <button @click="userLogin" class="btn-bank-card">保存</button>
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
        margin-top: 20px;
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


      .input-bank-username {
        margin-top: 20px;
      }

      .input-bank-name {
         margin-top: 20px;
       }

      .input-bank-cardnum {
        margin-top: 20px;
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
