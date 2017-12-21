<template>
  <div class="record right-content-wrapper">
    <div class="record-blank" v-show="blank">
      <div class="record-blank-image"></div><span>你还没有交易记录</span>
    </div>

    <div class="record-content" v-show="!blank">
      <div class="mytabs">

        <div class="tab-content">
          <qr-record-table :headerData="headerData"
                    :tableData="tableData"
          ></qr-record-table>
        </div>

        <div class="tab-page" v-show="false">

          <el-pagination
            :currentPage="page.currentPage"
            :pageSize="page.pageSize"
            :total="page.total"
            @current-change="pageToChange"
            class="page-wrapper"
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页">
          </el-pagination>
        </div>
      </div>


    </div>

  </div>
</template>

<script>

  import MyUtil from '@/common/js/MyUtil.js'
  import QRRecordTable from '@/pages/base/QRRecordTable'
  import Request from '@/common/js/Request'

  export default {
    name: 'MyTradeRecord',
    data() {
      return {
        blank: true,
        type:'',
        headerData: [],
        tableData: [],


        page: {
          currentPage: 1,
          total: 100,
          pageSize: 20,
        },


      }
    },
    created: function () {
      let userId = MyUtil.getUserId()
      Request.requsetRecordAllList(this, userId)
    },


    methods: {
      fetchData: function () {
      },

      pageToChange: function (val) {
        this.page.currentPage = val
        this.fetchData()
      }
    },
    components: {
      'qr-record-table': QRRecordTable,
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  @import "../../../common/less/index.less";

  .record {
    /*background-color: @content-bg;*/
    min-height: 100%;
    display: flex;
    .record-blank {
      width: 200px;
      margin: auto;
      margin-top: 124px;

      .record-blank-image{
        margin: auto;
        width: 90px;
        height:90px;
        background: url("../../../common/image/record-content-blank-img.png") no-repeat;
      }

      span {
        display: block;
        text-align: center;
        margin-top: 8px;
        font-size: 14px;
        color: rgba(151, 152, 153, 1);
        line-height: 20px;
      }

      button {
        margin: auto;
        display: block;
        margin-top: 30px;
        background: rgba(46, 138, 230, 1);
        border-radius: 4px;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
        padding: 9px 38px;
      }
    }

    .record-content {
      display: flex;
      flex: 1;
      .mytabs {
        flex: 1;
        display: flex;
        flex-direction: column;

        .tab-header {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 1);

          .tab {
            cursor: pointer;
            margin-right: 100px;
            span {
              text-align: center;
              display: block;
              height: 25px;
              font-size: 18px;
              color: rgba(51, 51, 51, 1);
              line-height: 25px;
              margin-top: 18px;
              margin-bottom: 17px;
            }
            .underline {
              height: 2px;
              width: 80px;
            }
          }

          .tab-selected {

            span {
              color: rgba(46, 138, 230, 1);
            }
            .underline {
              background: rgba(46, 138, 230, 1);
            }
          }

          .tab:hover {
            span {
              color: rgba(46, 138, 230, 1);
            }
          }

          .tab:first-child {
            margin-left: 128px;
          }

          .div-tab-button {
            flex: 1;
          }

          button {
            margin-right: 114px;
            float: right;
            align-self: flex-end;
            padding: 7px 16px;
            font-size: 12px;
            background: rgba(46, 138, 230, 1);
            border-radius: 4px;
            color: rgba(255, 255, 255, 1);
          }
        }

        .tab-content {
          flex: 1;
        }

        .tab-page {
          height: 50px;
          display: flex;

        }

      }

    }
  }

</style>


<style lang="less">

  @touming: rgba(255, 255, 255, 0);

  .page-wrapper {
    margin: auto;
    background-color: @touming;
    button.disabled {
      background-color: @touming;
      span {
        background-color: @touming;
      }

    }
    .el-pager {
      li {
        background-color: @touming;

      }

    }
    .btn-prev, .btn-next {
      background-color: @touming;
    }
  }
</style>
