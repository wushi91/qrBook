<template>
  <div class="qr-table">

    <div class="table-header">


            <span class="header-item" v-for="item in headerData"
                  :style="{ 'width': item.width}">{{ item.label }}</span>


      <!--<span>房源名称</span>-->
      <!--<span>租客</span>-->

    </div>

    <div class="table-content">


      <div class="table-row" v-for="item in tableData">

        <div class='table-house-use' v-if="!item.isUnused">

          <!--有租客的房源-->
          <span v-for="header in headerData" :style="{ 'width': header.width}">{{ item[header.prob] }}</span>
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



          <el-popover
            placement="bottom"
            width="150"
            trigger="hover">
            <el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;"  @click="editAccount">编辑账本</el-button>
            <el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;" @click="toRenterDetail">租客详情</el-button>


            <el-button style="display: block;width: 150px;margin: 5px auto;font-size: 16px;" @click="deleteAccountConfim(item.id)">删除账本</el-button>
            <div style="text-align: center; margin: auto" v-show="item.id === deleteId">
              <el-button size="mini" type="primary" @click="deleteId = deleteIdDefault">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteId = deleteIdDefault">确定</el-button>
            </div>


            <!--<el-popover-->
              <!--placement="right" width="150" trigger="click">-->
              <!--<div style="text-align: center; margin: auto">-->
                <!--<el-button size="mini" type="text" @click="visible2 = false">取消</el-button>-->
                <!--<el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>-->
              <!--</div>-->
              <!--<el-button slot="reference">删除</el-button>-->
            <!--</el-popover>-->

            <el-button class="more-action" slot="reference">更多</el-button>
          </el-popover>
          <!--<span  >更多</span>-->

        </div>
        <div class='table-house-unuse' v-else>

          <!--没有租客的房源-->
          <span :style="{ 'width': headerData[0].width}">{{ item[headerData[0].prob]}}</span>
          <span style="color:rgba(242,73,73,1);cursor: pointer;" @click="addRenter">添加租客信息</span>
        </div>

      </div>

    </div>


  </div>
</template>

<script>

  import MyUtil from '@/common/js/MyUtil.js'

  export default {
    name: "QRTable",
    data() {
      return {
        deleteIdDefault:'00s神udfijsdoifhify342',
        deleteId:this.deleteIdDefault,
        more_action_popover_visible:false,


        headerData: [
          {label: '房源名称', prob: 'houseName', width: '340px'},
          {label: '租客', prob: 'renter', width: '125px'},
          {label: '租期', prob: 'rentdate', width: '250px'},
          {label: '每月租金', prob: 'rentmoney', width: '125px'},],
        tableData: [
          {houseName: '都市名园D栋26G', renter: '李一飞', rentdate: '2017/12/01-2018/11/30', rentmoney: '5000元',id:'1'},
          {houseName: '都市名园F栋27K', renter: null, isUnused: true,id:'2'},
          {houseName: '都市名园D栋26A', renter: '赵磊', rentdate: '2017/12/01-2018/11/30', rentmoney: '215000元',id:'3'},
          {houseName: '都市名园D栋16G', renter: '刘大磊鹏', rentdate: '2017/12/01-2018/11/30', rentmoney: '5000元',id:'4'},
          {houseName: '阳光棕榈园10单元2008', renter: '李一飞', rentdate: '2017/12/01-2018/11/30', rentmoney: '5000元',id:'5'},],
      }
    },
    methods: {
      addRenter:function () {
        let houseId = 'sss'
        MyUtil.linkToPath(this,'/renter/add?houseId='+houseId)
      },
      toRenterDetail:function () {
        let houseId = 'sss'
        MyUtil.linkToPath(this,'/renter/detail?houseId='+houseId)
      },
      editAccount:function () {
        let houseId = 'sss'
        MyUtil.linkToPath(this,'/account/edit?houseId='+houseId)
      },
      deleteAccount:function () {
        console.log('deleteAccount')
      },

      deleteAccountConfim:function (deleteAccountId) {
        console.log('deleteAccountId = '+deleteAccountId)
        this.deleteId = deleteAccountId
      }
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
        span {
          font-size: 18px;
          color: #999999;
        }

        .more-action{
          color:#2E8AE6;
          font-size: 18px;
          cursor: pointer;
          margin-right: 30px;
          &:hover,&:active,&:focus{
            background-color: white;
          }


        }

      }
    }

  }


</style>
