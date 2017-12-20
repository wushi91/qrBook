<template>
  <div class="qr-table">


    <div class="table-header">
      <span class="header-item" v-for="item in headerData"
            :style="{'width':item.width}">{{ item.label }}</span>
    </div>

    <div class="table-content">

      <div class="table-row" v-for="item in tableData">
        <div class='table-house-use'>

          <span v-for="header in headerData" :style="{ 'width': header.width}">{{ item[header.prob] }}</span>
          <span >详情</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

  import MyUtil from '@/common/js/MyUtil.js'
  import Request from '@/common/js/Request'

  export default {
    name: "QRTable",
    props:['headerData','tableData'],
    data() {
      return {
      }
    },
    methods: {

    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../common/less/index.less";

  .qr-table {
    span {
      padding-left: 30px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: keep-all;
    }

    .table-header {
      background-color: #FFFFFF;
      margin-bottom: 2px;
      display: flex;
      flex-wrap: nowrap;

      .header-item {
        display: inline-block;
        width: 150px;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;

        margin-top: 16px;
        margin-bottom: 16px;
        white-space: nowrap; /*强制span不换行*/
      }
    }

    .table-content {

      .table-row {
        background-color: #FFFFFF;
        display: flex;
        flex-wrap: nowrap;
        line-height: 65px;
        margin-bottom: 1px;

        .table-house-use, .table-house-unuse {
          display: flex;
        }
        span:first-child {
          font-size: 24px;
          color: rgba(51, 51, 51, 1);
        }

        .table-house-overdate {
          span:nth-child(2) {
            color: rgba(242, 73, 73, 1)
          }
        }

        span {
          font-size: 18px;
          color: #999999;
        }

        .more-action {
          color: #2E8AE6;
          font-size: 18px;
          cursor: pointer;
          margin-right: 30px;
          &:hover, &:active, &:focus {
            background-color: white;
          }

        }

      }
    }

  }


</style>

