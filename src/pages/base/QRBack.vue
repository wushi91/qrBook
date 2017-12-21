<template>
  <div class="qr-back" @click="routerBack">
    <span class="back-img"></span>
    <span>返回</span>
  </div>
</template>

<script>

  import MyUtil from '@/common/js/MyUtil.js'

  export default {
    name: 'QRBack',
    data() {
      return {}
    },
    methods: {
      routerBack: function () {
        MyUtil.goPageBack(this)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../common/less/index.less";

  .qr-back {
    width: 100px;
    cursor: pointer;
    display: flex;
    align-items: center;
    span:first-child {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url("../../common/image/btn-back-normal.png") no-repeat;
    }

    span:nth-child(2) {

      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
    }


    &:hover {
      span:first-child {
        background: url("../../common/image/btn-back-hover.png") no-repeat;
      }
    }
  }


</style>
