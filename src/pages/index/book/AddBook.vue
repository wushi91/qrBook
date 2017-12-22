<template>
  <div class="add-book">

    <qr-back></qr-back>

    <div class="add-book-content">
      <span class="title" v-show="isTypeAdd">新建账本</span>
      <span class="title" v-show="isTypeEdit">编辑账本</span>
      <div class="add-book-content-item">
      <span class="city">房源所在城市</span>
      <input value="广东 深圳" disabled placeholder="请选择房源所在的城市"/>
      </div>
      <div class="add-book-content-item">
      <span class="detail-address">房源详细地址</span>
      <textarea rows='3' v-model="address" placeholder="请填写详细的房源地址、房号等信息"></textarea>
      </div>
      <div class="btn-wrapper" >
        <el-button v-show="isTypeAdd" type="primary" @click="toSaveBook" :disabled='!(province&&city&&address)'>保存</el-button>
        <el-button v-show="isTypeEdit" type="primary" @click="toEditBook" :disabled="!(province&&city&&address)">保存修改</el-button>
      </div>
    </div>

  </div>
</template>

<script>

  import QRBack from '../../base/QRBack'
  import MyUtil from '@/common/js/MyUtil.js'
  import Request from '@/common/js/Request'

  export default {
    name: 'AddBook',
    data() {
      return {

        houseId:'',
        province: '广东',
        city: '深圳',
        address: "",

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
        let addPath = '/book/add'
        let editPath = '/book/edit'
        switch (path) {
          case addPath:
            this.isTypeAdd = true
            this.isTypeEdit = false
            break;
          case editPath:
            this.isTypeAdd = false
            this.isTypeEdit = true
            this.houseId = this.$route.query.houseId
            this.province = this.$route.query.province
            this.city = this.$route.query.city
            this.address = this.$route.query.address
            break;
        }
      },
      toSaveBook: function () {
        console.log('toSaveBook')
        let userId = MyUtil.getUserId()
        Request.requestAddBook(this, userId, this.province, this.city, this.address)
      },
      toEditBook:function () {
        console.log('toEditBook')
        let userId = MyUtil.getUserId()
        Request.requestEditBook(this, userId,this.houseId, this.province, this.city, this.address)

      }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  @import "../../../common/less/index.less";

  .add-book {
    min-height: 100%;
    background: white;

    .add-book-content {
      margin-left: 150px;

      span {
        display: block;
      }

      .add-book-content-item{
        margin-top: 20px;
        display: flex;
        span {
          font-size:14px;
          color:rgba(51,51,51,1);
          margin-top: 10px;
          margin-right: 20px;
          display: inline-block;
        }
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

      }

      input {

        width: 320px;
        padding:9px 12px;
        font-size: 16px;
        line-height: 16px;
      }

      textarea {

        width: 320px;
        line-height: 25px;
        padding:9px 12px;
        font-size: 16px;
      }

      .btn-wrapper {
        width: 320px;
        margin-top: 30px;
        margin-left: 104px;
        text-align: center;
      }

      .el-button {
        margin: auto;
        width: 148px;
        font-size: 20px;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 20px;
      }

    }
  }

</style>
