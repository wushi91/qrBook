<template>
  <div class="bill-detail">

    <qr-back></qr-back>

    <div class="bill-detail-content">

      <!--内容-->
      <span class="house-name" v-text="houseName">房源名称</span>

      <div class="bill-item bill-money">
        <span>账单金额</span>
        <span v-text="billMoney"></span>
      </div>

      <div class="bill-item">
        <span>租客姓名</span>
        <span v-text="renterName"></span>
      </div>

      <div class="bill-item">
        <span>租客手机号</span>
        <span v-text="renterPhone"></span>
      </div>

      <div class="bill-item">
        <span>租金时间</span>
        <span v-text="renterMoneyTime"></span>
      </div>

      <div class="bill-item">
        <span>交租日期</span>
        <span v-text="payDate"></span>
      </div>


      <div class="bill-item bill-status-pay" v-show="isPay">
        <span>交易状态</span>
        <span>已结清</span>
      </div>


      <div class="bill-item bill-status-nopay" v-show="!isPay">
        <span>交易状态</span>
        <span>未结清</span>
      </div>

      <div class="btn-wrapper">
        <button @click="goPageBack">返回</button>
      </div>

    </div>

  </div>
</template>

<script>

  import QRBack from '../../base/QRBack'
  import MyUtil from '@/common/js/MyUtil.js'
  import Request from '@/common/js/Request'

  export default {
    name: 'RenterDetail',
    data() {
      return {
        houseName: '',
        billId: '',
        billMoney: '',
        renterName: '',
        renterPhone: '',
        renterMoneyTime: '',
        payDate: '',
        isPay:false

      }
    },
    components: {
      'qr-back': QRBack,
    },
    created: function () {
      this.fetchData()
      this.getBillDetail()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData: function () {
        this.billId = this.$route.query.billId
      },

      goPageBack: function () {
        MyUtil.goPageBack(this)
      },

      getBillDetail:function () {
        let userId = MyUtil.getUserId()
        if (!this.billId) {
          MyUtil.toastError(this,'找不到对应的账单')
        }else{
          Request.requestBillDeatil(this,userId,this.billId)
        }

      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  @import "../../../common/less/index.less";

  .bill-detail {
    background: white;
    .bill-detail-content {
      margin-left: 300px;
      span {
        display: block;
        font-size: 14px;
      }

      .title {
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        line-height: 33px;
        margin-top: 0px;
      }

      span.house-name {
        font-size: 30px;
        color: rgba(51, 51, 51, 1);
        line-height: 42px;
        margin-bottom: 20px;
      }

      .bill-item {
        display: flex;
        margin-bottom: 20px;
        span {
          font-size: 18px;
          color: rgba(153, 153, 153, 1);
          line-height: 25px;
        }
        span:first-child {
          display: inline-block;
          width: 120px;
        }
        span:nth-child(2) {
          display: inline-block;
          text-align: right;
          width: 220px;
        }


      }

      .bill-item.bill-money {
        span:first-child{
        }
        span:nth-child(2){
          font-size: 30px;
          color: rgba(51, 51, 51, 1);

          &::after {
            font-size: 18px;
            content: '元'
          }
        }

      }

      .bill-item.bill-status-pay{
        span:nth-child(2){
          color:rgba(41,204,57,1);
        }
      }

      .bill-item.bill-status-nopay{
        span:nth-child(2){
          color: rgba(250, 75, 87, 1);
        }
      }



      .btn-wrapper {
        width: 340px;
        min-width: 200px;
        margin-top: 30px;
        padding-bottom: 60px;
        text-align: center;
      }
      button {
        display: inline-block;
        margin: auto;
        padding: 8px 38px 8px 38px;
        background: rgba(46, 138, 230, 1);
        border-radius: 6px;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
      }

    }
  }

</style>

