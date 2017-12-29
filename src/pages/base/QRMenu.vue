<template>
  <div class="qr-menu">
    <ul>
      <li :class="{ 'actived': type === typeAccount}" @click="clickMenu(typeAccount)"><span
        class="menu-li-image menu-image-book"></span><span>我的账本</span></li>
      <li :class="{ 'actived': type === typeBill}" @click="clickMenu(typeBill)"><span
        class="menu-li-image menu-image-bill"></span><span>我的账单</span></li>
      <li :class="{ 'actived': type === typeRecord}" @click="clickMenu(typeRecord)"><span
        class="menu-li-image menu-image-record"></span><span>交易记录</span></li>
      <li :class="{ 'actived': type === typeMoney}" @click="clickMenu(typeMoney)"><span
        class="menu-li-image menu-image-money"></span><span>我的账户</span></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'QRMenu',
    data() {
      return {
        type: 'book',
        typeAccount: 'book',
        typeBill: 'bill',
        typeRecord: 'record',
        typeMoney: 'money',
      }
    },
    created: function () {
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {

      clickMenu: function (type) {
        this.$router.push({path: '/' + type})
        //this.$router.go('/login');//会刷新界面
      },

      fetchData: function () {
        var fullPath = this.$route.fullPath
        if (fullPath === '/book') {
          this.type = this.typeAccount
        }

        if (fullPath === '/bill') {
          this.type = this.typeBill
        }


        if (fullPath === '/record') {
          this.type = this.typeRecord
        }

        if (fullPath === '/money') {
          this.type = this.typeMoney
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  @import "../../common/less/index.less";

  .qr-menu {
    width: 180px;
    height: 100%;
    background: rgba(69, 73, 77, 1);
    ul {
      padding: 0;
      margin: 0;

      text-align: center;

      li {
        cursor: pointer;
        background: rgba(69, 73, 77, 1);
        height: 90px;
        list-style: none;
        color: rgba(150, 151, 153, 1);
        line-height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:18px;
        .menu-li-image {
          display: inline-block;
          width: 30px;
          height: 30px;
          background-color: darkgrey;

          margin-right: 5px;
        }

        .menu-image-book{
          background: url("../../common/image/menu-book-icon.png") no-repeat;
        }
        .menu-image-bill{
          background: url("../../common/image/menu-bill-icon.png") no-repeat;
        }
        .menu-image-record{
          background: url("../../common/image/menu-record-icon.png") no-repeat;
        }
        .menu-image-money{
          background: url("../../common/image/menu-money-icon.png") no-repeat;
        }


      }

      .actived {
        color: rgba(255, 255, 255, 1);
        background: rgba(23, 24, 26, 1);

        .menu-image-book{
          background: url("../../common/image/menu-book-icon-active.png") no-repeat;
        }
        .menu-image-bill{
          background: url("../../common/image/menu-bill-icon-active.png") no-repeat;
        }
        .menu-image-record{
          background: url("../../common/image/menu-record-icon-active.png") no-repeat;
        }
        .menu-image-money{
          background: url("../../common/image/menu-money-icon-active.png") no-repeat;
        }
      }

      li:active {
        color: rgba(255, 255, 255, 1);
        background: rgba(23, 24, 26, 1);


      }

      li:hover{
        color: rgba(255, 255, 255, 1);
        .menu-image-book{
          background: url("../../common/image/menu-book-icon-active.png") no-repeat;
        }
        .menu-image-bill{
          background: url("../../common/image/menu-bill-icon-active.png") no-repeat;
        }
        .menu-image-record{
          background: url("../../common/image/menu-record-icon-active.png") no-repeat;
        }
        .menu-image-money{
          background: url("../../common/image/menu-money-icon-active.png") no-repeat;
        }

      }

    }
  }

</style>
