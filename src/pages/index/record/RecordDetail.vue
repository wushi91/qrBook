<template>
  <div class="record-detail">

    <qr-back></qr-back>

    <div class="record-detail-content">

      <!--内容-->
      <div v-if="isTypeRent">
      <span class="house-name" v-text="houseName">房源名称</span>

      <div class="record-item record-money">
        <span>收租金额</span>
        <span v-text="rentMoney"></span>
      </div>
      <div class="record-item">
        <span>租金时间</span>
        <span v-text="rentMoneyTime"></span>
      </div>
      <div class="record-item">
        <span>当前状态</span>
        <span v-text="currentStatus"></span>
      </div>
      <div class="record-item">
        <span>交易时间</span>
        <span v-text="payTime"></span>
      </div>
      <div class="record-item">
        <span>交易方式</span>
        <span v-text="payWay"></span>
      </div>
      <div class="record-item">
        <span>交易单号</span>
        <span v-text="orderNum"></span>
      </div>
      </div>

      <div v-else>
        <span class="house-name" >提现</span>

        <div class="record-item">
          <span>提现金额</span>
          <span v-text="moneyToCash"></span>
        </div>
        <div class="record-item">
          <span>当前状态</span>
          <span v-text="currentStatus"></span>
        </div>
        <div class="record-item">
          <span>交易时间</span>
          <span v-text="payTime"></span>
        </div>
        <div class="record-item">
          <span>到账方式</span>
          <span v-text="payWay"></span>
        </div>
        <div class="record-item">
          <span>交易单号</span>
          <span v-text="orderNum"></span>
        </div>
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
    name: 'RecordDetail',
    data() {
      return {
        isTypeRent:true,

        houseName: '111',
        rentMoney:'222',
        rentMoneyTime:'333',
        currentStatus:"交易成功",
        payTime:'4444',
        payWay:'555',
        orderNum:'666',
        moneyToCash:'777'
      }
    },
    components: {
      'qr-back': QRBack,
    },
    created: function () {
      this.fetchData()
      this.getRecordDetail()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData: function () {
        this.recordId = this.$route.query.recordId
      },

      goPageBack: function () {
        MyUtil.goPageBack(this)
      },

      getRecordDetail:function () {
        let userId = MyUtil.getUserId()
        if (!this.recordId) {
          MyUtil.toastError(this,'找不到对应的记录')
        }else{
          Request.requestRecordDeatil(this,userId,this.recordId)
        }

      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  @import "../../../common/less/index.less";

  .record-detail {
    background: white;
    .record-detail-content {
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

      .record-item {
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

      .record-item.record-money {
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

      .record-item.record-status-pay{
        span:nth-child(2){
          color:rgba(41,204,57,1);
        }
      }

      .record-item.record-status-nopay{
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

