<template>
  <div class="qr-menu">
    <ul>
      <li><i></i><span>我的账本</span></li>
      <li><i></i><span>我的账单</span></li>
      <li><i></i><span>交易记录</span></li>
      <li><i></i><span>我的账户</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'QRMenu',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>

  @import "../../common/less/index.less";

  .qr-menu{
    width: 180px;
    height: 100%;
    background:rgba(69,73,77,1);
    ul{
      padding: 0;
      margin: 0;

      text-align: center;

      li{
        background:rgba(69,73,77,1);
        height:90px;
        list-style: none;
        color:rgba(150,151,153,1);
        line-height:90px;
      }

      li:active{
        color:rgba(255,255,255,1);
        background:rgba(23,24,26,1);
      }

    }
  }

</style>
