<template>
  <div class="render-detail">

    <qr-back></qr-back>

    <div class="render-detail-content" :class="{ 'just-view': isTypeDetail}" >
      <!--标题-->
      <span class="title" v-show="isTypeDetail">租客详情</span>
      <span class="title" v-show="isTypeAdd">添加租客</span>
      <span class="title" v-show="isTypeEdit">编辑租客信息</span>

      <!--内容-->
      <span class="house-name">都市名园D栋26G</span>
      <span>租客姓名</span>
      <el-input placeholder="请输入租客姓名" :disabled="isTypeDetail"></el-input>
      <span>租客手机号</span>
      <el-input placeholder="请输入租客手机号" :disabled="isTypeDetail"></el-input>
      <span>起租日期</span>
      <el-date-picker class='date-no-before-icon' :disabled="isTypeDetail" type="date" placeholder="请选择起租日期">

      </el-date-picker>
      <span>截止日期</span>
      <el-date-picker class='date-no-before-icon' :disabled="isTypeDetail"  placeholder="请选择截止日期" type="date"></el-date-picker>
      <span>租期</span>
      <el-input placeholder="" :disabled="isTypeDetail" ></el-input>
      <span>交租方式</span>
      <el-input placeholder="请选择交租方式" :disabled="isTypeDetail" >
        <template slot="append">
          <div>月/付</div>
        </template>
      </el-input>
      <span>交租日期</span>
      <el-input placeholder="请选择交租日期" :disabled="isTypeDetail" >
        <template slot="append">
          <div>号</div>
        </template>
      </el-input>
      <span>押金</span>
      <el-input placeholder="请输入押金金额" :disabled="isTypeDetail" >
        <template slot="append">
          <div>元</div>
        </template>

      </el-input>
      <span>每月租金</span>
      <el-input placeholder="请输入租金金额" :disabled="isTypeDetail" >
        <template slot="append">
          <div>元</div>
        </template>
      </el-input>


      <div class="btn-wrapper">
        <div v-show="isTypeDetail">
          <button @click="editRenter">编辑租客信息</button>
          <button>租客退房</button>
        </div>

        <div v-show="isTypeAdd">
          <button>保存</button>
        </div>

        <div v-show="isTypeEdit">
          <button>保存修改</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

  import QRBack from '../../base/QRBack'
  import MyUtil from '@/common/js/MyUtil.js'

  export default {
    name: 'RenterDetail',
    data() {
      return {
        type:'',//detail add edit
        isTypeDetail:true,
        isTypeAdd:false,
        isTypeEdit:false,
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
    methods:{
      fetchData:function () {
        let path = this.$route.path
        let detailPath= '/renter/detail'
        let addPath= '/renter/add'
        let editPath= '/renter/edit'
        switch (path){
          case detailPath:
            this.isTypeDetail=true
            this.isTypeAdd=false
            this.isTypeEdit=false
            break;
          case addPath:
            this.isTypeDetail=false
            this.isTypeAdd=true
            this.isTypeEdit=false
            break;
          case editPath:
            this.isTypeDetail=false
            this.isTypeAdd=false
            this.isTypeEdit=true
            break;
        }
        
      },

      editRenter:function () {
        MyUtil.linkToPath(this,'/renter/edit')
      }

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
        margin-top: 20px;
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
      }

      span.house-name + span {
        margin-top: 10px;
      }

      .btn-wrapper {
        width: 500px;
        min-width: 200px;
        margin-top: 30px;
        padding-bottom: 60px;
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

<style lang="less">

  @import "../../../common/less/index.less";

  .just-view{
    .el-input.is-disabled{
      .el-input__inner{
        cursor: default;
        color:#333333;
        background-color: white;
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
      margin-top: 10px;
      border:1px solid #999999 ;

      .el-input__inner {
        padding: 9px 12px;
        font-size: 16px;
        line-height: 16px;
        border-radius: 0;
        border:none;

      }

      .el-input-group__append {
        padding: 0;
        border:none;
        text-align: center;
        background: white;
        margin-left: -10px;

        div {
          cursor: pointer;
          font-size: 16px;
          color:#333333;
          margin-right: 10px;

        }
      }
    }
  }

</style>
