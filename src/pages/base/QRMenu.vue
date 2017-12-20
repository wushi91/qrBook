<template>
  <div class="qr-menu">
    <ul>
      <li :class="{ 'actived': type === typeAccount}" @click="clickMenu(typeAccount)"><i></i><span>我的账本</span></li>
      <li :class="{ 'actived': type === typeBill}" @click="clickMenu(typeBill)"><i></i><span>我的账单</span></li>
      <li :class="{ 'actived': type === typeRecord}" @click="clickMenu(typeRecord)"><i></i><span>交易记录</span></li>
      <li :class="{ 'actived': type === typeMoney}" @click="clickMenu(typeMoney)"><i></i><span>我的账户</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'QRMenu',
  data () {
    return {
      type:'book',
      typeAccount:'book',
      typeBill:'bill',
      typeRecord:'record',
      typeMoney:'money',
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

    clickMenu:function (type) {
      this.$router.push({path:'/'+type})
      //this.$router.go('/login');//会刷新界面
    },

    fetchData: function () {
      var fullPath = this.$route.fullPath
      if(fullPath==='/book'){
        this.type = this.typeAccount
      }

      if(fullPath==='/bill'){
        this.type = this.typeBill
      }


      if(fullPath==='/record'){
        this.type = this.typeRecord
      }

      if(fullPath==='/money'){
        this.type = this.typeMoney
      }
    },
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
        cursor: pointer;
        background:rgba(69,73,77,1);
        height:90px;
        list-style: none;
        color:rgba(150,151,153,1);
        line-height:90px;
      }

      .actived{
        color:rgba(255,255,255,1);
        background:rgba(23,24,26,1);
      }

      li:active{
        color:rgba(255,255,255,1);
        background:rgba(23,24,26,1);
      }

    }
  }

</style>
