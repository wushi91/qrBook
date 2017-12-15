<template>
  <div class="login">

    <div class="content">
      <span class="name">租房账本</span>
      <span class="slogen">房东都在使用的租房管理系统</span>
      <span class="introduce">完善的租客信息管理、记账、查账、收租功能， 房租账目不再混乱，你只管收租，剩下的交给我们</span>

      <button class="btn-register" @click="toRegister">免费注册</button>
      <button class="btn-login" @click="toLogin">登录</button>
    </div>

    <div class="footer">
      <span class="contact-us">联系我们</span>
      <span class="phone">电话：0755-82331418</span>
      <span class="email">邮箱：qingren_xcx@qq.com</span>
      <span class="address">地址：深圳市罗湖区桂园街道都市名园F栋27K</span>
      <span class="company">© 2017庆仁科技(深圳)有限公司</span>
    </div>

    <login-dialog-component :showDialog="showDialog" :type="type"></login-dialog-component>
  </div>
</template>

<script>


  import LoginDialog from '../base/LoginDialog'

  export default {
    name: 'login',
    data() {
      return {
        showDialog:false,
        type:''
      }
    },
    methods: {

      toLogin: function () {
        this.type = '登录'
        this.showDialog = true
      },
      toRegister: function () {
        this.type = '注册'
        this.showDialog = true
      },

    },
    components: {
      'login-dialog-component': LoginDialog,
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../common/less/index.less";

  .login {
    background-color: @login-bg;
    background: url("../../common/image/house-bg.jpg") no-repeat top;

    .content {
      padding-top: 150px;
      box-sizing: border-box;
      height: 888px;
      margin: auto;
      width: 800px;
      text-align: left;
      color: @font-color-black;

      span {
        display: block;
        cursor: default;
      }

      .name {
        font-size: 30px;
        line-height: 42px;
      }
      .slogen {
        font-size: 54px;
        margin-top: 12px;
      }
      .introduce {
        width: 440px;
        margin-top: 24px;
        font-size: 20px;
        line-height: 30px;
        color: @font-color-grey;
      }

      button {
        width: 180px;
        height: 60px;
        margin-top: 60px;
        border-radius: 4px;
        border: none;
        outline: none;
        font-size: 24px;
        line-height: 33px;
        cursor: pointer;
      }

      .btn-register {
        background: rgba(46, 138, 230, 1);
        color: white;
        margin-right: 60px;
      }
      .btn-login {
        background: #FAFCFF;
        color: #45494D;
      }
    }

    .footer {
      text-align: center;
      padding-top: 20px;
      padding-bottom: 20px;
      background-color: @login-bg;
      color: @font-color-black;

      span {
        display: block;
        cursor: default;
      }

      :nth-child(1) {
        font-size: 14px;
        line-height: 20px;
        color: rgba(46, 48, 51, 1);
      }

      :nth-child(2) {
        font-size: 16px;
        line-height: 22px;
        margin-top: 10px;
      }

      :nth-child(3) {
        font-size: 16px;
        line-height: 22px;
        margin-top: 8px;
      }

      :nth-child(4) {
        font-size: 16px;
        line-height: 22px;
        margin-top: 8px;
      }

      :nth-child(5) {
        font-size: 14px;
        margin-top: 20px;
        color: rgba(138, 145, 153, 1);
        line-height: 20px;
      }
    }


  }


</style>
