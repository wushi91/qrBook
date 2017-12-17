<template>
  <div class="account right-content-wrapper">
    <div class="account-blank" v-show="blank">
      <div class="account-blank-image"></div>
      <span>你还没有新建账本</span>
      <button>新建账本</button>
    </div>

    <div class="account-book" v-show="!blank">
      <div class="mytabs">

        <div class="tab-header">
          <div class="tab" :class="{ 'tab-selected': isTypeAll}" @click="toTypeAll">
            <span>全部</span>
            <div class="underline"></div>
          </div>
          <div class="tab" :class="{ 'tab-selected': isTypeUnused}" @click="toTypeUnused">
            <span>闲置</span>
            <div class="underline"></div>
          </div>
          <div class="tab" :class="{ 'tab-selected': isOutdate}" @click="toOutdate">
            <span>逾期</span>
            <div class="underline"></div>
          </div>

          <div class="div-tab-button">
            <button @click="addAccount">新建账本</button>
          </div>
        </div>
        <div class="tab-content">

          <qr-table></qr-table>

        </div>

        <div class="tab-page">

          <el-pagination
            class="page-wrapper"
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="1000">
          </el-pagination>
        </div>
      </div>


    </div>

  </div>
</template>

<script>

  import MyUtil from '@/common/js/MyUtil.js'
  import QRTable from '@/pages/base/QRTable'

  export default {
    name: 'MyAccount',
    data() {
      return {
        blank: false,

        isTypeAll: true,
        isTypeUnused: false,
        isOutdate: false,
      }
    },
    methods: {
      addAccount: function () {
        MyUtil.linkToPath(this, '/account/add')
      },
      toTypeAll:function () {

        this.isTypeAll = true
        this.isTypeUnused = false
        this.isOutdate = false

      },
      toTypeUnused:function () {
        this.isTypeAll = false
        this.isTypeUnused = true
        this.isOutdate = false
      },
      toOutdate:function () {
        this.isTypeAll = false
        this.isTypeUnused = false
        this.isOutdate = true
      },
    },
    components: {
      'qr-table': QRTable,
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  @import "../../../common/less/index.less";

  .account {
    /*background-color: @content-bg;*/
    min-height: 100%;
    display: flex;
    .account-blank {
      width: 200px;
      margin: auto;
      margin-top: 124px;

      .account-blank-image {
        margin: auto;
        width: 90px;
        height: 90px;
        background-color: darkgrey;
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

    .account-book {
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

          .tab:hover{
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
