<template>
  <div class="render-detail">

    <qr-back></qr-back>

    <div class="render-detail-content">
      <span class="title">租客详情</span>
      <span class="house-name">都市名园D栋26G</span>
      <span>租客姓名</span>
      <input class="form-text" placeholder=""/>
      <span>租客手机号</span>
      <input class="form-text" placeholder=""/>
      <span>起租日期</span>
      <input class="form-text" placeholder=""/>
      <span>截止日期</span>
      <input class="form-text" placeholder=""/>
      <span>租期</span>
      <input class="form-text" placeholder=""/>
      <span>交租方式</span>
      <input class="form-text" placeholder=""/>
      <span>交租日期</span>
      <input class="form-text" placeholder=""/>
      <span>押金</span>
      <input class="form-text" placeholder=""/>
      <span>每月租金</span>
      <input class="form-text" placeholder=""/>

      <div class="btn-wrapper"><button>编辑租客信息</button>
        <button>租客退房</button></div>

    </div>

  </div>
</template>

<script>

  import QRBack from '../../base/QRBack'

  export default {
    name: 'RenterDetail',
    data() {
      return {
        blank: false,
      }
    },
    components: {
      'qr-back': QRBack,
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  @import "../../../common/less/index.less";

  .render-detail{
    background: white;
    .render-detail-content {
      margin-left: 150px;
      span {
        display: block;
        margin-top: 20px;
        font-size:14px;
      }

      .title {
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        line-height: 33px;
        margin-top: 0px;
      }

      span.house-name{
        font-size:30px;
        color:rgba(51,51,51,1);
        line-height:42px;
      }

      span.house-name+span{
        margin-top: 10px;
      }

      .btn-wrapper{
        width: 600px;
        margin-top: 30px;
      }
      button{
        margin: auto;
        padding:8px 38px 8px 38px;
        background:rgba(46,138,230,1);
        border-radius: 6px ;
        font-size:18px;
        color:rgba(255,255,255,1);
        line-height:25px;
      }

    }
  }

</style>
