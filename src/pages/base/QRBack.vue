<template>
  <div class="qr-back" @click="routerBack">
    <span class="back-img"></span>
    <span>返回</span>
  </div>
</template>

<script>
export default {
  name: 'QRBack',
  data () {
    return {
    }
  },
  methods:{
    routerBack:function () {
      this.$router.back(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>
  @import "../../common/less/index.less";
  .qr-back{
    cursor: pointer;
    span:first-child{
      display: inline-block;
      width: 14px;
      height: 14px;
      background:rgba(51,51,51,1);
    }

    span:nth-child(2){
      height:22px;
      font-size:16px;
      color:rgba(51,51,51,1);
      line-height:22px;
    }


  }


</style>
