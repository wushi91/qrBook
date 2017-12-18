<template>
  <div class="add-account">

    <qr-back></qr-back>

    <div class="add-account-content">
      <span class="title" v-show="isTypeAdd">新建账本</span>
      <span class="title" v-show="isTypeEdit">编辑账本</span>
      <span class="city">房源所在城市</span>
      <input class="form-text" value="广东 深圳" disabled placeholder="请选择房源所在的城市"/>
      <span class="detail-address">房源详细地址</span>
      <textarea rows='3' class="form-text" v-model="address" placeholder="请填写详细的房源地址、房号等信息"></textarea>

      <div class="btn-wrapper" @click="toSaveAccount">
        <button v-show="isTypeAdd">保存</button>
        <button v-show="isTypeEdit">保存修改</button>
      </div>
    </div>

  </div>
</template>

<script>

  import QRBack from '../../base/QRBack'
  import MyUtil from '@/common/js/MyUtil.js'
  import Request from '@/common/js/Request'

  export default {
    name: 'AddAccount',
    data() {
      return {
        province: '广东',
        city: '深圳',
        address: "罗湖区 大剧院 东海小区 E栋 15楼 k号",

        isTypeAdd: true,
        isTypeEdit: false,
      }
    },
    components: {
      'qr-back': QRBack,
    },

    created: function () {
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },

    methods: {

      fetchData: function () {
        let path = this.$route.path
        let addPath = '/account/add'
        let editPath = '/account/edit'
        switch (path) {
          case addPath:
            this.isTypeAdd = true
            this.isTypeEdit = false
            break;
          case editPath:
            this.isTypeAdd = false
            this.isTypeEdit = true
            break;
        }
      },
      toSaveAccount: function () {
        console.log('toSaveAccount')
        let userId = MyUtil.getUserId()
        Request.requestAddAccount(this, userId, this.province, this.city, this.address)
      }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  @import "../../../common/less/index.less";

  .add-account {
    min-height: 100%;
    background: white;

    .add-account-content {
      margin-left: 150px;

      span {
        display: block;
      }

      .title {
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        line-height: 33px;
      }

      span.city, span.detail-address {
        height: 20px;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        margin-top: 20px;
      }

      input {
        margin-top: 10px;
        width: 320px;

      }

      textarea {
        margin-top: 10px;
        width: 320px;
        line-height: 25px;

      }

      .btn-wrapper {
        width: 320px;
        margin-top: 30px;
      }

      button {
        margin: auto;
        padding: 8px 38px 8px 38px;
        background: rgba(46, 138, 230, 1);
        border-radius: 6px;
        display: block;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
        margin-bottom: 60px;
      }

    }
  }

</style>
