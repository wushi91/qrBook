<template>
  <div class="header">
    <span class="img-header"><img></span>
    <span class="username">{{ username }}</span>
    <span class="logout">退出登录</span>
  </div>
</template>

<script>
export default {
  name: 'QRHeader',
  data () {
    return {
      username:'13822542317(test)'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
  @import "../../common/less/index.less";
  .header{

    width: 100%;
    height:60px;
    background:rgba(69,73,77,1);

    .img-header{
      display: inline-block;
      width:26px;
      height:25px;
      background-color: white;
      margin-top: 20px;
      margin-left: 32px;
    }
    .username{
      font-size:14px;
      color:rgba(255,255,255,1);
      line-height:20px;
      margin-top: 20px;
      margin-left: 12px;
    }
    .logout{
      float: right;
      font-size:14px;
      color:rgba(255,255,255,1);
      line-height:20px;
      margin-top: 20px;
      margin-right:40px;
    }
  }


</style>
