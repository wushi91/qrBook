<template>
  <div class="money right-content-wrapper">

    <div class="balance-wrapper">

      <span>账户余额</span><br/>
      <span class="balance">0</span><button>提现</button>
    </div>

    <div class="bank-card-container">
      <span class="title">我的银行卡</span>

      <div class="bank-card-wrapper">
        <div class="bank-card bank-card-thebank">
          <span>招商银行</span>
          <span>**** **** **** 3479</span>
          <span>删除</span>
        </div>

        <div class="bank-card bank-card-add" @click="toAddBankCard">
          <span style="font-size: 30px;margin-bottom: 10px">+</span>
          <span>添加银行卡</span>
        </div>

      </div>
    </div>

    <money-dialog-component :showDialog="showDialog" :type="type"></money-dialog-component>

  </div>
</template>

<script>

  import MyUtil from '@/common/js/MyUtil.js'
  import Request from '@/common/js/Request'
  import MoneyDialog from '@/pages/base/MoneyDialog'

  export default {
    name: 'MyMoney',
    data() {
      return {
        showDialog: false,
        type: ''
      }
    },
    created: function () {

    },


    methods: {
      fetchData: function () {
      },

      toAddBankCard: function () {
        this.type = '登录'
        this.showDialog = true
      },

    },
    components: {
      'money-dialog-component':MoneyDialog,
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  @import "../../../common/less/index.less";

  .money{
    min-height: 100%;
    display: flex;
    flex-direction: column;
    .balance-wrapper{
      background-color: white;
      padding: 20px 30px;

      span:first-child{
        font-size:18px;
        color:rgba(51,51,51,1);
        line-height:25px;
      }

      .balance{
        display: inline-block;
        margin-top: 10px;
        font-size:40px;
        line-height: 40px;
        color:rgba(51,51,51,1);

        &:after{
          content:'元';
          font-size:18px;
        }
      }

      button {
        margin-left: 30px;
        padding: 6px 31px;
        background: rgba(46, 138, 230, 1);
        border-radius: 6px;
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
      }
    }

    .bank-card-container{
      flex:1;
      margin-top:20px;
      background-color: white;
      padding: 20px 30px;

      .title{
        font-size:18px;
        color:rgba(51,51,51,1);
        line-height:25px;
      }

      .bank-card-wrapper{
        margin-top: 20px;
        display: flex;

        .bank-card{
          padding: 10px 12px;
          display: flex;
          flex-direction:column;
          border-radius: 2px ;
          height: 100px;
          width: 150px;
          text-align: center;
          margin-left: 30px;
        }

        .bank-card-thebank{

          background: linear-gradient(135deg, #FA647D, #E6393F); /* 标准的语法 */
          color:rgba(255,255,255,1);
          span:first-child{
            text-align: left;
            font-size:16px;
            line-height:22px;
          }

          span:nth-child(2){
            text-align: left;
            margin-top: 14px;
            font-size:14px;
            align-self:  center ;
            flex:1;
          }

          span:nth-child(3){
            text-align: right;
            font-size:14px;
          }
        }

        .bank-card-add{
          justify-content:center;
          background:rgba(240,241,242,1);
          span{
            font-size:14px;
            color:rgba(177,178,179,1);
            line-height:20px;
          }
        }
      }

    }
  }


</style>

