<template>
  <el-dialog
    custom-class="qr-dialog"
    width="400px"
    top="120px"
    :center=true
    :show-close=false
    :visible.sync="innerShowDialog"
    @open="openDialog"
    @close="closeDialog">


    <!--添加银行卡对话框-->
    <div v-if='innerType ==="添加银行卡"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
        <div class="to-close-dialog" @click="toCloseDialog"></div>
      </div>
      <div class="content-wrapper">
        <el-input class='input-bank-username' v-model="addcard_bank_username" placeholder="请输入持卡人姓名"></el-input>
        <el-input class='input-bank-name' v-model="addcard_bank_name" placeholder="请输入开户行"></el-input>
        <el-input class='input-bank-cardnum' v-model="addcard_bank_cardnum" placeholder="请输入银行卡号"></el-input>
      </div>
      <div class="btn-wrapper">
        <el-button type="primary" @click="toAddBankCard">保存</el-button>
      </div>
    </div>


    <!--提现对话框-->
    <div v-if='innerType ==="提现"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
        <div class="to-close-dialog" @click="toCloseDialog"></div>
      </div>
      <div class="content-wrapper get-cash-content-wrapper">
        <div class="choose-bank-card-wrapper">
          <span>到账银行卡(免手续费)</span>
          <span>招商银行(尾号1108)</span>
          <div class="to-choose-bank-card" @click="toChooseBankCard"></div>
        </div>

        <el-input class="input-money-tocash" placeholder="请输入提现金额" v-model='input_money_tocash'>
          <template class="input-append-behind" slot="append">
            <div>元</div>
          </template>
        </el-input>
        <span class='tip-money-total'>可提现金额50,000元</span>
      </div>
      <div class="btn-wrapper">
        <el-button type="primary" @click="toGetMoneyToCash">申请提现</el-button>
      </div>
    </div>


    <!--提现对话框-->
    <div v-if='innerType ==="选择到账银行卡"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
        <div class="to-close-dialog" @click="toCloseDialog"></div>
      </div>

      <div style="background-color:rgba(227,228,230,1); height: 2px;"></div>

      <div class="content-wrapper choose-card-content-wrapper">

        <div v-for="item,index in outData.bankCardList">
        <div class="choose-card-item" >
          <span>{{ item.account}}(尾号{{ item.card_number}})</span>
          <el-checkbox border size="medium" style='width:30px;height: 30px;float: right' v-model="checked"></el-checkbox>

        </div>

        <div style="background-color:rgba(227,228,230,1); height: 1px;" v-show="index<outData.bankCardList.length-1">
        </div>
        </div>

      </div>

    </div>


    <!--删除银行卡-->
    <div v-if='innerType ==="删除银行卡"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
      </div>
      <div style="background-color:rgba(227,228,230,1); height: 1px;"></div>

      <div class="btn-wrapper">

        <el-button-group>
          <el-button @click="confirmToDeleteBankCard">确认</el-button>
          <el-button @click="cancelToDeleteBankCard">取消</el-button>
        </el-button-group>

      </div>


    </div>

  </el-dialog>
</template>

<script>

  import MyUtil from '@/common/js/MyUtil'
  import Request from '@/common/js/Request'


  export default {
    name: 'QRDialog',
    props: ['showDialog', 'type','outData'],
    data() {
      return {
        innerShowDialog: this.showDialog,
        innerType: this.showDialog,

        //添加银行卡
        addcard_bank_username: '',
        addcard_bank_name: '',
        addcard_bank_cardnum: '',


        //提现
        input_money_tocash:'',
        checked:true,
      }
    },

    watch: {
      //数据同步
      showDialog(val) {
        this.innerShowDialog = val
      },
      type(val){
        this.innerType = val
      }
    },
    methods: {
      openDialog: function () {

      },
      closeDialog: function () {
        //子组件对openStatus修改后向父组件发送事件通知
        this.$emit('dialogData', false)
      },

      toCloseDialog: function () {
        console.log('toCloseDialog')
        this.innerShowDialog= false
      },
      toChooseBankCard:function(){
        this.innerType='选择到账银行卡'
      },
      toAddBankCard:function () {
        let userId = MyUtil.getUserId()
        Request.requestAddBankCard(this,userId,this.addcard_bank_username,this.addcard_bank_name,this.addcard_bank_cardnum)
      },
      toGetMoneyToCash:function () {
        let userId = MyUtil.getUserId()
        Request.requestGetCashOut(this,userId,this.outData.bankCardList[0].cardid,this.input_money_tocash)
      },

      confirmToDeleteBankCard:function () {
        let userId = MyUtil.getUserId()
        Request.requestToDelteteBankCard(this,userId,this.outData.cardId)
      },
      cancelToDeleteBankCard:function () {
        this.toCloseDialog()
      },

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<!--基础设置base-->
<style lang="less">
  @import "../../common/less/index.less";

  @greyBg: rgba(240, 241, 242, 1);

  .qr-dialog {

    border-radius: 4px;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: 0;
    }

    .el-input {
      background: @greyBg;
      border-radius: 5px;
      margin-bottom: 20px;
      .el-input__inner {
        /*padding-left: 0;*/
        /*padding-right: 0;*/
        height: 50px;
        outline: none;
        font-size: 20px;
        line-height: 25px;
        border: none;
        background: @greyBg;
      }

      .el-input-group__append {
        padding: 0;
        text-align: center;
        border: none;
        background: @greyBg;
        font-size: 20px;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;

        div {
          margin-right: 20px;
        }
      }

    }

    .el-button {
      width: 250px;
      font-size: 20px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 20px;
    }

    .el-button-group{
      width: 100%;
      .el-button {
        width: 50%;
        font-size: 20px;
        color:rgba(51,51,51,1);
        margin-bottom: 0;
      }
    }


  }
</style>

<!---->
<style lang="less" scoped>

  .dialog-container {
    .title-wrapper {
      padding: 20px 22px;
      text-align: center;
      font-size: 24px;
      color: rgba(50, 51, 51, 1);
      line-height: 33px;
      position: relative;
      .to-close-dialog {
        width: 29px;
        height: 29px;
        position: absolute;
        bottom: 20px;
        right: 22px;
        cursor: pointer;
        background: url("../../common/image/close-dialog-normal.png") no-repeat;
        &:hover{
          background: url("../../common/image/close-dialog-hover.png") no-repeat;
        }
      }
    }

    .content-wrapper {
      padding: 0 20px;
    }

    .btn-wrapper {
      text-align: center;
    }

  }

</style>

<!--提现-->
<style lang="less" scoped>
  .get-cash-content-wrapper {

    .choose-bank-card-wrapper {
      background: rgba(240, 241, 242, 1);
      padding: 12px 10px 12px 15px;
      position: relative;
      margin-bottom: 20px;
      span:first-child {
        font-size: 14px;
        color: rgba(177, 178, 179, 1);
        line-height: 20px;
        display: block;
      }

      span:nth-child(2) {
        display: inline-block;
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

        background: url("../../common/image/in-right-normal.png") no-repeat;
        &:hover{
          background: url("../../common/image/in-right-hover.png") no-repeat;
        }
      }

    }

    .input-money-tocash {
      margin-bottom: 0;
    }
    .tip-money-total {
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 20px;
      display: inline-block;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
</style>


<!--选择银行卡-->
<style lang="less" scoped>

  .dialog-container{
  .choose-card-content-wrapper{
    padding-left:0;
    padding-right: 0;
    padding-bottom: 10px;
  }

  .choose-card-item {


    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    span {
      font-size: 20px;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
  }}

</style>
