<template>
  <div class="qr-table">


    <div class="table-header">
      <span class="header-item" v-for="item in headerData"
            :style="{'width':item.width}">{{ item.label }}</span>
    </div>

    <div class="table-content">
      <div class="table-row" v-for="item in tableData">

        <div class='table-house-use'>

          <div class="simple-item">
            <span v-for="header in headerData" v-show="!(header.prob ==='payStatus')" :style="{ 'width': header.width }">{{ item[header.prob] }}</span>

          </div>

          <el-popover
            placement="bottom"
            width="150"
            trigger="hover">
            <div slot="reference" class="more-action-wrapper">
              <el-button class="more-action-pay" v-show="item.isPay">已结清</el-button>
              <el-button class="more-action-nopay"  v-show="!item.isPay">未结清</el-button>
            </div>

            <el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;" @click="toBillDetail(item.billId)">
              查看详情
            </el-button>

          </el-popover>


        </div>
      </div>

    </div>


  </div>
</template>

<script>

  import MyUtil from '@/common/js/MyUtil.js'
  import Request from '@/common/js/Request'

  export default {
    name: "QRBillTable",
    props:['headerData','tableData',],
    data() {
      return {
      }
    },
    methods: {

      toBillDetail:function (billId) {
        MyUtil.linkToPath(this, '/bill/detail?billId='+billId)
      }
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../common/less/index.less";

  .qr-table {


    .table-header {
      background-color: #FFFFFF;
      margin-bottom: 2px;
      display: flex;
      flex-wrap: nowrap;

      span {
        padding-left: 30px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: keep-all;
      }

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

        .table-house-use{
          display: flex;

          .simple-item{
            display: flex;

            span {
              padding-left: 30px;
              box-sizing: border-box;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-break: keep-all;
            }
          }
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

        .more-action-wrapper{
          /*margin-top: 50px;*/
        }
        .more-action-pay,.more-action-nopay{

          font-size: 18px;
          cursor: pointer;
          margin-left: 0;
          padding-left: 30px;
          &:hover, &:active, &:focus {
            background-color: white;
          }

        }

        .more-action-pay{
          color:rgba(41,204,57,1);
        }

        .more-action-nopay{
          color:rgba(250,75,87,1);
        }



      }
    }

  }


</style>


<!--:title="item.houseName"-->
<!--v-model="more_action_popover_visible"-->
<!--width="200"-->
<!--content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"-->
<!--<el-popover-->
<!--placement="top"-->
<!--width="150"-->
<!--v-model="item.id === deleteId"-->
<!--trigger="click">-->
<!--<div style="text-align: center; margin: auto">-->
<!--<el-button size="mini" type="text" @click="deleteId = deleteIdDefault">取消</el-button>-->
<!--<el-button type="primary" size="mini" @click="deleteId = deleteIdDefault">确定</el-button>-->
<!--</div>-->
<!--<el-button slot="reference" @click="deleteAccountConfim(item.id)">删除{{item.id}}</el-button>-->
<!--</el-popover>-->

<!--<el-popover-->
<!--placement="bottom"-->
<!--width="150"-->
<!--v-model='item.id === menu_more_id'>-->
<!--<div slot="reference" @mouseenter="toShowMenuMore(item.id)">-->

<!--<el-button class="more-action"  @click="clickMore(item.id)" >更多</el-button>-->
<!--</div>-->
<!--<el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;"  @click="editAccount">编辑账本</el-button>-->
<!--<el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;" @click="toRenterDetail">租客详情</el-button>-->


<!--<el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;" @click="deleteAccountConfim(item.id)">删除账本</el-button>-->
<!--<div style="text-align: center; margin: auto" v-show="item.id === deleteId">-->
<!--<el-button size="mini" type="primary" @click="deleteId = deleteIdDefault">取消</el-button>-->
<!--<el-button type="primary" size="mini" @click="deleteId = deleteIdDefault">确定</el-button>-->
<!--</div>-->
<!--</el-popover>-->
