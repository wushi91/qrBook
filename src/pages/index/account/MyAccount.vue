<template>
  <div class="account">
    <div class="account-blank" v-show="blank">
      <div class="account-blank-image"></div><span>你还没有新建账本</span><button>新建账本</button>
    </div>

    <div class="account-book" v-show="!blank">


      <div class="mytabs">

        <div class="tab-header">
        <div class="tab">
          <span>全部</span>
          <div class="underline"></div>
        </div>
        <div class="tab">
          <span>闲置</span>
          <div class="underline"></div>
        </div>

        <div class="tab">
          <span>逾期</span>
          <div class="underline"></div>
        </div>

        <div class="div-tab-button">
          <button>新建账本</button>
        </div>
        </div>
        <div class="tab-content">

          <ul>
            <li>1</li>
            <li>1</li>
          </ul>
        </div>

        <div class="tab-page">

          <span>1,2,3,4,5,6页</span>
        </div>
      </div>




    </div>
  </div>
</template>

<script>
export default {
  name: 'MyAccount',
  data () {
    return {
      blank:false,

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" scoped>

  @import "../../../common/less/index.less";


  .account{
    .account-blank{
      width: 200px;
      margin: auto;
      margin-top: 124px;

      .account-blank-image{
        margin: auto;
        width: 90px;
        height:90px;
        background-color: darkgrey;
      }

      span{
        display: block;
        text-align: center;
        margin-top: 8px;
        font-size:14px;
        color:rgba(151,152,153,1);
        line-height:20px;
      }

      button {
        margin: auto;
        display: block;
        margin-top: 30px;
        background:rgba(46,138,230,1);
        border-radius: 4px;
        font-size:18px;
        color:rgba(255,255,255,1);
        line-height:25px;

        border: none;
        padding: 9px 38px;
        outline: none;
        cursor: pointer;
      }
    }

    .account-book{

      .mytabs{
        height: 500px;
        padding-top:20px;
        padding-left: 20px;
        padding-right:30px;
        display: flex;
        flex-direction: column;

        .tab-header{
          margin-bottom: 20px;
          display: flex;
          align-items:center;
          background:rgba(255,255,255,1);

          .tab{
            margin-right: 100px;
            span{
              text-align: center;
              display: block;
              height:25px;
              font-size:18px;
              color:rgba(51,51,51,1);
              line-height:25px;
              margin-top: 18px;
              margin-bottom: 17px;
            }
            .underline{
              height: 2px;
              width: 80px;

            }
          }

          .tab:hover{

            span{
              color:rgba(46,138,230,1);
            }
            .underline{
              background:rgba(46,138,230,1);
            }
          }

          .tab:first-child{
            margin-left: 128px;
          }

          .div-tab-button{
            flex: 1;
          }

          button {
            margin-right: 114px;
            float: right;
            align-self:flex-end;
            padding: 7px 16px;
            font-size:12px;
            background:rgba(46,138,230,1);
            border-radius: 4px ;
            color:rgba(255,255,255,1);
          }
        }

        .tab-content{
          background-color: #FFFFFF;
          flex: 1;

        }

        .tab-page{

          height: 50px;
          span{
            line-height:50px;
          }
        }

      }



    }
  }

</style>
