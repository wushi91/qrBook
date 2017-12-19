<template>
  <div class="qr-table">


    <div class="table-header">
      <span class="header-item" v-for="item in headerData"
            :style="{'width':item.width}">{{ item.label }}</span>
    </div>

    <div class="table-content">

      <div class="table-row" v-for="item in tableData">
        <div class='table-house-use' :class="{'table-house-overdate': isOutdate}" v-if="!item.isUnused||isOutdate">
          <!--有租客的房源-->
          <span v-for="header in headerData" :style="{ 'width': header.width}">{{ item[header.prob] }}</span>

          <el-popover
            placement="bottom"
            width="150"
            trigger="hover">
            <el-button slot="reference" class="more-action">更多</el-button>

            <el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;" @click="editAccount(item.houseId,item.province,item.city,item.houseName)">编辑账本
            </el-button>
            <el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;" @click="toRenterDetail(item.accountId)">
              租客详情
            </el-button>
            <el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;" @click="deleteAccount(item.accountId)">
              删除账本
            </el-button>

          </el-popover>

        </div>
        <div class='table-house-unuse' v-else>
          <!--没有租客的房源-->
          <span :style="{ 'width': headerData[0].width}">{{ item[headerData[0].prob]}}</span>
          <span style="color:rgba(242,73,73,1);cursor: pointer;" @click="addRenter(item.houseId,item.houseName)">添加租客信息</span>
          <span :style="{ 'width': headerData[2].width}"></span>
          <span :style="{ 'width': headerData[3].width}"></span>

          <el-popover
            placement="bottom"
            width="150"
            trigger="hover">
            <el-button slot="reference" class="more-action">更多</el-button>

            <el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;" @click="editAccount(item.houseId,item.province,item.city,item.houseName)">编辑账本
            </el-button>
            <el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;" @click="deleteAccount(item.accountId)">
              删除账本
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
    name: "QRTable",
    props:['headerData','tableData','isTypeAll','isTypeUnused','isOutdate'],
    data() {
      return {
      }
    },
    methods: {
      addRenter: function (houseId,houseName) {
        MyUtil.linkToPath(this, '/renter/add?houseId=' + houseId+'&houseName='+houseName)
      },
      toRenterDetail: function (accountId) {

        MyUtil.linkToPath(this, '/renter/detail?accountId=' + accountId)
      },
      editAccount: function (houseId,province,city,houseName) {

        MyUtil.linkToPath(this, '/account/edit?houseId='+ houseId+'&province='+province+'&city='+city+'&address='+houseName )
      },
      deleteAccount: function (accountId) {
        Request.requestDeleteAccount(this,accountId)
      },

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
