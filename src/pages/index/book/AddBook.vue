<template>
  <div class="add-book">

    <qr-back></qr-back>

    <div class="add-book-content">
      <span class="title" v-show="isTypeAdd">新建账本</span>
      <span class="title" v-show="isTypeEdit">编辑账本</span>
      <div class="add-book-content-item">
      <span class="city">房源所在城市</span>
        <el-cascader
          :options="CityInfo"
          v-model="selectedOptions"
          :change-on-select="false"
          :clearable="false"
          :filterable="true"
          placeholder="请选择房源所在的城市"
          @change="handleCityChange">
        </el-cascader>
      <!--<input v-show="false" value="广东省 深圳市" disabled placeholder="请选择房源所在的城市"/>-->
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
        CityInfo:MyUtil.getCityData(),
        selectedOptions:[],
        houseId:'',
        province: "广东省",
        city: '深圳市',
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
        console.log(this.selectedOptions)
        let userId = MyUtil.getUserId()
        // Request.requestAddBook(this, userId, this.province, this.city, this.address)
      },
      toEditBook:function () {
        console.log('toEditBook')
        let userId = MyUtil.getUserId()
        Request.requestEditBook(this, userId,this.houseId, this.province, this.city, this.address)

      },
      handleCityChange:function (val) {
        // this.CityInfo.
        let provinceValue = val[0]
        let cityValue = val[1]
        let _province = ''
        let _city =''
        this.CityInfo.forEach(function (provinceitem,index) {
          if(provinceitem.value === provinceValue){
            _province = provinceitem.label
            provinceitem.children.forEach(function (cityitem,index) {
              if(cityitem.value === cityValue){
                _city = cityitem.label
              }
            })

          }
          // console.log(item)
        })

        this.province = _province
        this.city = _city

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

        span:first-child {
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
        color:rgba(51,51,51,1);
        width: 320px;
        line-height: 25px;
        padding:9px 12px;
        font-size: 16px;
        border: 1px solid #B1B2B3;
        border-radius: 2px;
        resize : none;
        outline: none;
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


<style lang="less">

  span.el-cascader{
    margin-top: 0;
    .el-input.el-input--suffix{
      input{
        width: 346px;
        border: 1px solid #B1B2B3;
        font-size: 16px;
        line-height: 16px;
        border-radius: 2px;
      }

    }

    .el-cascader__label{
      font-size: 16px;
      color:rgba(51,51,51,1);
    }
    /*background-color: rebeccapurple;*/
  }
</style>
