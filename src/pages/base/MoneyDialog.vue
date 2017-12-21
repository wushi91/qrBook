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
    <div v-show="dialog_add_card_content" class="dialog_add_card_content dialog-content">
    <span class="dialog-title">添加银行卡</span>
    <el-input class='input-bank-username' v-model="addcard_bank_username" placeholder="请输入持卡人姓名"></el-input>
    <el-input class='input-bank-name' v-model="addcard_bank_name" placeholder="请输入开户行"></el-input>
    <el-input class='input-bank-cardnum' v-model="addcard_bank_cardnum" placeholder="请输入银行卡号"></el-input>
    <button @click="userLogin" class="btn-bank-card">保存</button>
    </div>


    <!--提现的对话框-->
    <div v-show="dialog_get_cash_content" class="dialog_get_cash_content dialog-content">
      <span class="dialog-title">提现</span>
      <div class="get-cash-choose-card-wrapper">
        <span>到账银行卡(免手续费)</span>
        <span>招商银行(尾号1108)</span>
        <div class="to-choose-bank-card" @click="toChooseBankCard"></div>
      </div>

      <el-input class='input-get-cash-count'
                placeholder="请输入提现金额"
                v-model='rentMoney'
                :disabled="isTypeDetail">
        <template class="input-append-behind" slot="append">
          <div>元</div>
        </template>
      </el-input>
      <span class='tip-money-total'>可提现金额50,000元</span>
      <button @click="userLogin" class="btn-bank-card">申请提现</button>
    </div>





    <!--选择到账银行卡的对话框-->
    <div v-show="dialog_choose_card_content" class="dialog_choose_card_content dialog-content">

      <span style="position: absolute;width: 20px;display: inline-block;background-color: darkgrey;height: 20px;"></span>
      <span class="dialog-title">选择到账银行卡</span>

      <div style="background-color:rgba(227,228,230,1); height: 2px;margin-top: 20px"></div>
      <div class="choose-card-item">
        <span >招商银行(尾号3479)</span>
        <el-checkbox  style='width:30px;height: 30px;float: right' v-model="checked"></el-checkbox>
      </div>

      <div class="choose-card-item">
        <span >中国农业银行(尾号7492)</span>
        <el-checkbox  style='width:30px;height: 30px;float: right' v-model="checked"></el-checkbox>
      </div>

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


        dialog_add_card_content: false,
        dialog_get_cash_content: true,
        dialog_choose_card_content: false,

        checked:true,
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
        this.dialog_choose_card_content = false
        this.dialog_add_card_content = false
        this.dialog_get_cash_content = false
        if (this.type === '提现') {
          this.dialog_get_cash_content = true
        }
        if (this.type === '添加银行卡') {
          this.dialog_add_card_content = true
        }
      },

      closeDialog: function () {
        //子组件对openStatus修改后向父组件发送事件通知
        this.$emit('dialogData', false)
      },



      toChooseBankCard: function () {
        this.dialog_choose_card_content = true
        this.dialog_add_card_content = false
        this.dialog_get_cash_content = false
      },
      toRegister: function () {
        this.dialog_choose_card_content = false
        this.dialog_add_card_content = false
        this.dialog_get_cash_content = true
      },
      toGetRegisteCode: function () {
        Request.requestGetRegisterCode(this, this.register_phonenum)
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
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

      .get-cash-choose-card-wrapper {
        margin-top: 20px;
        background: rgba(240, 241, 242, 1);
        padding: 12px 10px 12px 20px;
        position: relative;
        span:first-child {
          font-size: 14px;
          color: rgba(177, 178, 179, 1);
          line-height: 20px;
          display: block;
        }

        span:nth-child(2) {
          font-size: 20px;
          color: rgba(51, 51, 51, 1);
          line-height: 28px;
          margin-top: 6px;
        }

        .to-choose-bank-card {
          position: absolute;
          right: 10px;
          bottom: 12px;
          width: 30px;
          height: 30px;
          background-color: gainsboro;
        }

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

          &:hover {
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

      .input-bank-cardnum, .input-get-cash-count {
        margin-top: 20px;
      }

      .tip-money-total{
        margin-left: 20px;
        margin-top: 10px;
        display: inline-block;
        font-size:14px;
        color:rgba(153,153,153,1);
        line-height:20px;
      }


      .choose-card-item{
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 30px;
        padding-right: 30px;
        span{
          font-size:20px;
          color:rgba(51,51,51,1);
          line-height:28px;
        }
      }

      .input-code {
        margin-top: 30px;
        .el-input-group__append {
          padding: 0;
          text-align: center;
          width: 170px;
          border: none;
          background: rgba(240, 241, 242, 1);

          div {
            cursor: pointer;
            font-size: 18px;
            color: rgba(250, 75, 87, 1);
            line-height: 25px;

            border-left: 1px solid #CACBCC;
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


    .dialog_choose_card_content{
      padding-top: 24px;
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 30px;
    }
  }
</style>


<style lang="less">


  .el-input {

    .el-input__inner {
     padding-left: 20px;

    }

    .el-input-group__append {
      padding: 0;
      border: none;
      text-align: center;
      background: white;

      background: rgba(240, 241, 242, 1);

      div {

        font-size:20px;
        color:rgba(51,51,51,1);
        line-height:28px;
        margin-right: 20px;
        cursor: pointer;

      }
    }

  }

</style>
