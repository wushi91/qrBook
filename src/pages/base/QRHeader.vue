<template>
  <div class="header">


      <span class="user-head-image"> </span>
      <span class="username">{{ username }}</span>

    <span style="flex: 1"></span>
    <span class="logout" @click="logout">退出登录</span>
  </div>
</template>

<script>

  import MyUtil from '../../common/js/MyUtil.js'

  export default {
    name: 'QRHeader',
    data() {
      return {
        username: ''
      }
    },
    created:function () {
      this.username = MyUtil.getPhoneNum()
    },
    methods: {
      logout: function () {
        MyUtil.userLogout(this)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../common/less/index.less";

  .header {


    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    background: rgba(69, 73, 77, 1);


    .user-head-image{

      margin-left: 32px;
      /*font-size: 14px;*/
      /*color: rgba(255, 255, 255, 1);*/
      height: 30px;
      width: 30px;

      background: url("../../common/image/user-head-image.png") no-repeat;
    }
    .username {

      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      width: 30px;
      line-height: 60px;
      /*background: url("../../common/image/user-head-image.png") no-repeat;*/
      /*margin-top: 15px;*/
      margin-left: 12px;
    }
    .logout {

      font-size: 14px;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;

      margin-right: 40px;
      cursor: pointer;
    }
  }


</style>
