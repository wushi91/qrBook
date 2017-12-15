<template>
  <div class="index">
    <header-component></header-component>
    <div class="wrapper">
      <div class="menu">
        <menu-component></menu-component>
      </div>

      <div class="content">

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

  import QRHeader from '../base/QRHeader'
  import QRMenu from '../base/QRMenu'
  import MyUtil from '../../common/js/MyUtil.js'

  export default {
    name: 'index',
    data() {
      return {

      }
    },
    components: {
      'header-component': QRHeader,
      'menu-component': QRMenu,
    },

    created: function () {
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData: function () {

        if(!MyUtil.isUserLogin()){
          //to登录

          MyUtil.userLogout()
        }



      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">

  @import "../../common/less/index.less";

  .index{
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color:rgba(240,241,242,1);
    .wrapper{
      display: flex;
      flex:1;
      align-items: stretch;
      .menu{

      }
      .content{
        flex:1;
      }
    }
  }

</style>
