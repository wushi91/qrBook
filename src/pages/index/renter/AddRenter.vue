<template>
  <div class="render-detail">

    <qr-back></qr-back>

    <div class="render-detail-content" :class="{ 'just-view': isTypeDetail}">
      <!--标题-->
      <span class="title" v-show="isTypeDetail">租客详情</span>
      <span class="title" v-show="isTypeAdd">添加租客</span>
      <span class="title" v-show="isTypeEdit">编辑租客信息</span>

      <!--内容-->
      <span class="house-name" v-text="houseName">房源名称</span>

      <div class="add-renter-content-item">
      <span>租客姓名</span>
      <el-input
        placeholder="请输入租客姓名"
        :maxlength="7"
        v-model='renterName'
        :disabled="isTypeDetail"></el-input>
      </div>


      <div class="add-renter-content-item">
        <span>租客手机号</span>
        <el-input
          :maxlength="11"
          placeholder="请输入租客手机号"
          v-model='renterPhone'
          :disabled="isTypeDetail"></el-input>
      </div>


      <div class="add-renter-content-item">
        <span>起租日期</span>
        <el-date-picker
          class='date-no-before-icon'
          v-model='rentStartDate'
          :disabled="isTypeDetail"
          type="date"
          placeholder="请选择起租日期"></el-date-picker>

      </div>


      <div class="add-renter-content-item" v-show ="isTypeDetail">
        <span>截止日期</span>
        <el-date-picker
          class='date-no-before-icon'

          :disabled="isTypeDetail"
          placeholder="请选择截止日期"
          type="date"
          v-model='rentOverDate'></el-date-picker>

      </div>


      <div class="add-renter-content-item">
        <span>租期</span>
        <el-input
          :maxlength="2"
          placeholder=""
          :disabled="isTypeDetail"
          v-model='rentLength'>
          <template slot="append">
            <div>月</div>
          </template>
        </el-input>
      </div>


      <div class="add-renter-content-item">
        <span>交租方式</span>
        <el-input
          :maxlength="2"
          placeholder="请选择交租方式"
          :disabled="isTypeDetail"
          v-model='rentPayWay'>
          <template slot="append">
            <div>月/付</div>
          </template>
        </el-input>

      </div>

      <div class="add-renter-content-item">
        <span>交租日期</span>
        <el-input
          :maxlength="2"
          placeholder="请选择交租日期"
                  :disabled="isTypeDetail"
                  v-model='rentPayDate'>
          <template slot="append">
            <div>号</div>
          </template>
        </el-input>
      </div>


      <div class="add-renter-content-item">
        <span>押金</span>
        <el-input
          :maxlength="7"
          placeholder="请输入押金金额"
                  :disabled="isTypeDetail"
                  v-model='yaJinMoney'>
          <template slot="append">
            <div>元</div>
          </template>
        </el-input>
      </div>


      <div class="add-renter-content-item">
        <span>每月租金</span>
        <el-input
          :maxlength="7"
          placeholder="请输入租金金额"
                  v-model='rentMoney'
                  :disabled="isTypeDetail">
          <template slot="append">
            <div>元</div>
          </template>
        </el-input>

      </div>

      <div class="btn-wrapper">
        <div v-show="isTypeDetail">

          <el-button  type="primary" @click="toPageEditRenter">编辑</el-button>
          <el-button  type="primary" @click="toDeleteRenter">租客退房</el-button>

        </div>

        <div @click="addRenter" v-show="isTypeAdd">
          <el-button type="primary" :disabled="!(rentMoney&&yaJinMoney&&rentPayDate&&rentPayWay&&rentLength&&rentOverDate&&rentStartDate&&renterPhone&&renterName)">保存</el-button>
        </div>

        <div @click="editRenter" v-show="isTypeEdit">
          <el-button type="primary" :disabled="!(rentMoney&&yaJinMoney&&rentPayDate&&rentPayWay&&rentLength&&rentOverDate&&rentStartDate&&renterPhone&&renterName)">保存修改</el-button>

        </div>
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
        houseName:'',
        houseId: '',
        accountId:'',
        type: '',//detail add edit
        isTypeDetail: true,
        isTypeAdd: false,
        isTypeEdit: false,


        //表格信息
        //new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate() + " 23:59:59"
        renterName: '',
        renterPhone: '',

        rentStartDate: new Date(),
        rentLength: 6,
        rentOverDate: '',

        rentPayWay: 1,//默认1月一付
        rentPayDate: '',
        yaJinMoney: '',
        rentMoney: ''

      }
    },
    components: {
      'qr-back': QRBack,
    },
    created: function () {
//      MyUtil.getNextMonth(new Date(),12)
      let startTime = this.rentStartDate.getTime()
      let length = Number(this.rentLength)
      this.rentPayDate =this.rentStartDate.getDate()
      this.rentOverDate = MyUtil.getNextMonth(new Date(startTime),length)
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData',
      'rentLength':'rentLengthWatch',
      'rentStartDate':'rentStartDateWatch'
    },
    methods: {
      rentLengthWatch:function (new_rentLength) {

//        if(new_rentLength===''||new_rentLength===0){
//          this.rentLength = 1
//          console.log('ssssssssssssssss1')
//        }

        let startTime = this.rentStartDate.getTime()
        let length = Number(new_rentLength)
        this.rentOverDate = MyUtil.getNextMonth(new Date(startTime),length)

      },
      rentStartDateWatch:function (new_rentStartDate) {

        let startTime = new_rentStartDate.getTime()
        let length = Number(this.rentLength)
        this.rentOverDate = MyUtil.getNextMonth(new Date(startTime),length)
        this.rentPayDate =new Date(startTime).getDate()
      },

      fetchData: function () {
        this.houseId = this.$route.query.houseId
        this.accountId = this.$route.query.accountId
        let path = this.$route.path
        let detailPath = '/renter/detail'
        let addPath = '/renter/add'
        let editPath = '/renter/edit'
        switch (path) {
          case detailPath:
            this.isTypeDetail = true
            this.isTypeAdd = false
            this.isTypeEdit = false
            this.getRenterDetail()
            break;
          case addPath:
            this.isTypeDetail = false
            this.isTypeAdd = true
            this.isTypeEdit = false
            this.houseName = this.$route.query.houseName
            break;
          case editPath:
            this.isTypeDetail = false
            this.isTypeAdd = false
            this.isTypeEdit = true
            break;
        }

      },

      getRenterDetail:function () {

        if (!this.accountId) {
          MyUtil.toastError(this,'找不到对应的账本')
        }else{
          Request.requestRenterDeatil(this,this.accountId)
        }

      },

      addRenter: function () {
        let userId = MyUtil.getUserId()
        if (!this.houseId) {
          MyUtil.toastError(context,'找不到对应的房子')
        }else{
          let rentStartDate = this.rentStartDate.getFullYear() + "-" + (this.rentStartDate.getMonth() + 1) + "-" + this.rentStartDate.getDate()
          let rentOverDate = new Date(this.rentOverDate)
          rentOverDate = rentOverDate.getFullYear() + "-" + (rentOverDate.getMonth() + 1) + "-" + rentOverDate.getDate()
          Request.requestAddRenter(this, userId, this.houseId, this.renterName, this.renterPhone, rentStartDate, rentOverDate, this.rentLength, this.rentPayWay, this.rentPayDate, this.yaJinMoney, this.rentMoney)
        }
      },

      editRenter:function () {
        let userId = MyUtil.getUserId()
        if (!this.houseId) {
          MyUtil.toastError(this,'找不到对应的房子')
        }else{
          let rentStartDate = this.rentStartDate.getFullYear() + "-" + (this.rentStartDate.getMonth() + 1) + "-" + this.rentStartDate.getDate()
          let rentOverDate = new Date(this.rentOverDate)
          rentOverDate = rentOverDate.getFullYear() + "-" + (rentOverDate.getMonth() + 1) + "-" + rentOverDate.getDate()
          Request.requestEditRenter(this, userId,this.accountId,this.houseId, this.renterName, this.renterPhone, rentStartDate, rentOverDate, this.rentLength, this.rentPayWay, this.rentPayDate, this.yaJinMoney, this.rentMoney)
        }
      },


      toPageEditRenter: function () {
        MyUtil.linkToPath(this, '/renter/edit?houseId='+this.houseId+"&accountId="+this.accountId)
      },

      toDeleteRenter:function () {
        console.log('toDeleteRenter')
        Request.requestDeleteRender(this,this.accountId)
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  @import "../../../common/less/index.less";

  .render-detail {
    background: white;
    .render-detail-content {
      margin-left: 150px;

      span {
        display: block;
        font-size: 14px;
      }


      .add-renter-content-item{
        margin-top: 20px;
        display: flex;
        align-items: center;
        span {
          font-size:14px;
          color:rgba(51,51,51,1);

          width: 90px;
          display: inline-block;
        }
      }

      .title {
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        line-height: 33px;
        margin-top: 0px;
      }

      span.house-name {
        margin-top: 20px;
        font-size: 30px;
        color: rgba(51, 51, 51, 1);
        line-height: 42px;
      }



      .btn-wrapper {
        width: 500px;
        margin-top: 30px;
        text-align: left;

        margin-left: 90px;
        min-width: 200px;

        padding-bottom: 60px;
      }


      .el-button {
        margin: auto;
        padding: 8px 38px 8px 38px;
        border-radius: 6px;
        font-size: 18px;
        line-height: 25px;
      }



    }
  }

</style>

<style lang="less">

  @import "../../../common/less/index.less";

  .render-detail {
    .render-detail-content.just-view {

      .add-renter-content-item {

        span {
          font-size: 14px;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
        }
      }

      .el-input.is-disabled {
        border: none;
        font-size: 18px;

        color: rgba(51, 51, 51, 1);
        line-height: 25px;
        .el-input__inner {
          display: inline;
          cursor: default;
          font-size: 18px;

          color: rgba(51, 51, 51, 1);
          line-height: 25px;
          background-color: white;

        }

      }

    }

  }
  .render-detail-content {

    .date-no-before-icon {
      .el-input__prefix {
        display: none;
      }
    }

    .el-input {
      width: 200px;
      border: 1px solid #999999;

      .el-input__inner {
        padding: 9px 12px;
        font-size: 16px;
        line-height: 16px;
        border-radius: 0;
        border: none;

      }

      .el-input-group__append {
        padding: 0;
        border: none;
        text-align: center;
        background: white;
        margin-left: -10px;

        div {
          cursor: pointer;
          font-size: 16px;
          color: #333333;
          margin-right: 10px;

        }
      }
    }
  }

</style>
