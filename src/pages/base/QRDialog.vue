<template>
  <el-dialog
    custom-class="qr-dialog"
    width="400px"
    top="120px"
    :center=true
    :show-close=false
    :visible.sync="innerShowDialog"
    @open="openDialog"
    @close="closeDialog">


    <!--添加银行卡对话框-->
    <div v-if='innerType ==="添加银行卡"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
        <div class="to-close-dialog" @click="toCloseDialog"></div>
      </div>
      <div class="content-wrapper">
        <el-input class='input-bank-username' v-model="addcard_bank_username" placeholder="请输入持卡人姓名"></el-input>
        <span class="error-input-tip"></span>
        <el-input class='input-bank-name' v-model="addcard_bank_name" placeholder="请输入开户行"></el-input>
        <span class="error-input-tip"></span>
        <el-input class='input-bank-cardnum' v-model="addcard_bank_cardnum" placeholder="请输入银行卡号"></el-input>
        <span class="error-input-tip"></span>
      </div>
      <div class="btn-wrapper">
        <el-button type="primary" @click="toAddBankCard">保存</el-button>
      </div>
    </div>


    <!--提现对话框-->
    <div v-if='innerType ==="提现"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
        <div class="to-close-dialog" @click="toCloseDialog"></div>
      </div>
      <div class="content-wrapper get-cash-content-wrapper">
        <div class="choose-bank-card-wrapper">
          <span>到账银行卡(免手续费)</span>
          <span>{{ checkCard.account}}(尾号{{ checkCard.card_number}})</span>
          <div class="to-choose-bank-card" @click="toChooseBankCard"></div>
        </div>

        <el-input class="input-money-tocash" placeholder="请输入提现金额" v-model='input_money_tocash'>
          <template class="input-append-behind" slot="append">
            <div>元</div>
          </template>
        </el-input>
        <span class='tip-money-total'>可提现金额50,000元</span>
      </div>
      <div class="btn-wrapper">
        <el-button type="primary" @click="toGetMoneyToCash">申请提现</el-button>
      </div>
    </div>


    <!--提现银行卡选择对话框-->
    <div v-if='innerType ==="选择到账银行卡"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
        <div class="to-close-dialog" @click="toCloseDialog"></div>
      </div>

      <div style="background-color:rgba(227,228,230,1); height: 2px;"></div>

      <div class="content-wrapper choose-card-content-wrapper">

        <div v-for="item,index in outData.bankCardList">
          <div class="choose-card-item">
            <span>{{ item.account}}(尾号{{ item.card_number}})</span>

            <span class="my-checkbox" :class="{ 'checked': checkCardId === item.cardid}"  @click="toCheckBankCard(item.cardid,index)">
            </span>
            <!--<el-checkbox border size="medium" style='width:30px;height: 30px;float: right'-->
                         <!--v-model="checkCardId === item.cardid" :key="item.cardid" @click="" @input=""></el-checkbox>-->

          </div>

          <div style="background-color:rgba(227,228,230,1); height: 1px;" v-show="index<outData.bankCardList.length-1">
          </div>
        </div>

      </div>

    </div>


    <!--删除银行卡-->
    <div v-if='innerType ==="删除银行卡"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
      </div>
      <div style="background-color:rgba(227,228,230,1); height: 1px;"></div>

      <div class="btn-wrapper">
        <el-button-group>
          <el-button @click="confirmToDeleteBankCard">确认</el-button>
          <el-button @click="cancelToDeleteBankCard">取消</el-button>
        </el-button-group>
      </div>
    </div>


    <!--提示添加银行卡-->
    <div v-if='innerType ==="请先添加银行卡"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
      </div>
      <div style="background-color:rgba(227,228,230,1); height: 1px;"></div>

      <div class="btn-wrapper">
        <el-button-group>
          <el-button @click="toCloseDialog">确认</el-button>
          <el-button @click="toCloseDialog">取消</el-button>
        </el-button-group>
      </div>
    </div>


    <!--登录的对话框-->
    <div v-if='innerType ==="登录"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
        <div class="to-close-dialog" @click="toCloseDialog"></div>
      </div>
      <div class="content-wrapper ">
        <el-input class='input-phonenum' v-model="login_phonenum" placeholder="请输入手机号码"></el-input>
        <span class="error-input-tip">{{ login_phonenum_tip }}</span>
        <el-input class='input-password' v-model="login_password" :type="showPassword?'text':'password'"
                  placeholder="请输入密码">

          <template class="input-append-behind" slot="append">
            <div v-if="!showPassword" @click='showPassword=!showPassword' class="to-see-password"></div>
            <div v-else @click='showPassword=!showPassword' class="to-hide-password"></div>
          </template>
        </el-input>
        <span class="error-input-tip">{{ login_password_tip }}</span>
      </div>
      <div class="btn-wrapper login-btn-wrapper">
        <el-button @click="toLogin" :disabled="!(login_phonenum&&login_password)" type="primary">登录</el-button>
      </div>

      <div class="footer-wrapper">
        <span @click="showForget">忘记密码</span>
        <span @click='showRegister' style="float:right;">免费注册</span>
      </div>
    </div>


    <!--注册的对话框-->
    <div v-if='innerType ==="注册"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
        <div class="to-close-dialog" @click="toCloseDialog"></div>
      </div>
      <div class="content-wrapper">
        <el-input class='input-phonenum' v-model="register_phonenum" placeholder="请输入手机号码"></el-input>
        <span class="error-input-tip">{{ register_phonenum_tip }}</span>

        <el-input class='input-password' v-model="register_password" :type="showPassword?'text':'password'"
                  placeholder="请设置6-16位密码">
          <template class="input-append-behind" slot="append">
            <div v-if="!showPassword" @click='showPassword=!showPassword' class="to-see-password"></div>
            <div v-else @click='showPassword=!showPassword' class="to-hide-password"></div>
          </template>
        </el-input>
        <span class="error-input-tip">{{ register_password_tip }}</span>

        <el-input class='input-code' v-model="register_code" placeholder="请输入6位验证码">
          <template slot="append">
            <div v-if="canClickCode" @click="toGetRegisteCode">获取验证码</div>
            <div v-else style="color:#FA4B57;">{{daojishi}}</div>
          </template>
        </el-input>
        <span class="error-input-tip">{{ register_code_tip }}</span>

      </div>
      <div class="btn-wrapper register-btn-wrapper">
        <el-button @click="toCheckRegisterCode" :disabled="!(register_phonenum&&register_password&&register_code)"
                   type="primary">注册并登录
        </el-button>
      </div>
    </div>


    <!--重置密码的对话框-->
    <div v-if='innerType ==="重置密码"' class="dialog-container">
      <div class="title-wrapper">
        <span>{{ innerType }}</span>
        <div class="to-close-dialog" @click="toCloseDialog"></div>
      </div>
      <div class="content-wrapper">
        <el-input v-show='!hasCheckedCode' class='input-phonenum' v-model="forget_phonenum"
                  placeholder="请输入手机号码"></el-input>
        <span v-show='!hasCheckedCode' class="error-input-tip">{{ forget_phonenum_tip }}</span>

        <el-input v-show='hasCheckedCode' class='input-password' v-model="forget_password"
                  :type="showPassword?'text':'password'"
                  placeholder="请设置6-16位密码">
          <template class="input-append-behind" slot="append">
            <div v-if="!showPassword" @click='showPassword=!showPassword' class="to-see-password"></div>
            <div v-else @click='showPassword=!showPassword' class="to-hide-password"></div>
          </template>
        </el-input>
        <span  v-show='hasCheckedCode' class="error-input-tip">{{ forget_password_tip }}</span>

        <el-input v-show='!hasCheckedCode' class='input-code' v-model="forget_code" placeholder="请输入6位验证码">
          <template slot="append">
            <div v-if="canClickCode" @click="toGetForgetCode">获取验证码</div>
            <div v-else style="color:#FA4B57;">{{daojishi}}</div>
          </template>
        </el-input>
        <span v-show='!hasCheckedCode' class="error-input-tip">{{ forget_code_tip }}</span>

      </div>
      <div class="btn-wrapper forget-btn-wrapper">
        <el-button v-if='!hasCheckedCode' @click="checkForgetPhone" type="primary" :disabled="!(forget_phonenum&&forget_code)">下一步</el-button>
        <el-button v-else @click="changePasswordAndLogin" type="primary">确认登录</el-button>
      </div>

      <div v-if='!hasCheckedCode' class="footer-wrapper">
        <span @click="showLogin">返回登录</span>
      </div>
    </div>

  </el-dialog>
</template>

<script>

  import MyUtil from '@/common/js/MyUtil'
  import Request from '@/common/js/Request'
  import Verification from '@/common/js/Verification'

  export default {
    name: 'QRDialog',
    props: ['showDialog', 'type', 'outData'],
    data() {
      return {
        innerShowDialog: this.showDialog,
        innerType: this.type,

        //添加银行卡
        addcard_bank_username: '',
        addcard_bank_name: '',
        addcard_bank_cardnum: '',


        //提现
        input_money_tocash: '',
        checkCardId: '',
        checkCard:{},

        //登陆
        login_phonenum: '13822542317',
        login_password: '123456',
        login_phonenum_tip: '',
        login_password_tip: '',
        showPassword: false,

        //注册
        register_phonenum: '13822542317',
        register_password: '13822542317',
        register_code: "13822542317",
        register_phonenum_tip: '',
        register_password_tip: '',
        register_code_tip: "",

        canClickCode: true,
        seconds: 10,
        daoji_timer: 10,
        daojishi: '',

        //重置密码
        hasCheckedCode: false,
        forget_phonenum: '',
        forget_password: '',
        forget_code: "",
        forget_phonenum_tip: '',
        forget_password_tip: '',
        forget_code_tip: "",

      }
    },

    watch: {
      //数据同步
      showDialog(val) {
        this.innerShowDialog = val
      },
      type(val) {
        this.innerType = val
      }
    },
    methods: {
      openDialog: function () {

        this.innerType = this.type

        if(this.type==='提现'){
          this.checkCardId =this.outData.bankCardList[0].cardid
          this.checkCard = this.outData.bankCardList[0]
        }

      },
      closeDialog: function () {
        //子组件对openStatus修改后向父组件发送事件通知
        this.$emit('dialogData', false)

      },

      toCloseDialog: function () {
        console.log('toCloseDialog')
        this.innerShowDialog = false
      },
      toChooseBankCard: function () {
        this.innerType = '选择到账银行卡'
      },
      toAddBankCard: function () {
        let userId = MyUtil.getUserId()
        Request.requestAddBankCard(this, userId, this.addcard_bank_username, this.addcard_bank_name, this.addcard_bank_cardnum)
      },
      toGetMoneyToCash: function () {
        let userId = MyUtil.getUserId()
        Request.requestGetCashOut(this, userId, this.checkCardId, this.input_money_tocash)
      },

      confirmToDeleteBankCard: function () {
        let userId = MyUtil.getUserId()
        Request.requestToDelteteBankCard(this, userId, this.outData.cardId)
      },
      cancelToDeleteBankCard: function () {
        this.toCloseDialog()
      },


      toLogin: function () {
        if (!Verification.isPhoneNum(this.login_phonenum)) {
          this.login_phonenum_tip = '请输入正确的手机号码'
          return
        }

        this.login_phonenum_tip = ''
        this.login_password_tip = ''
        Request.requestToLogin(this, this.login_phonenum, this.login_password)
      },

      showLogin: function () {
        this.innerType = '登录'
        this.hasCheckedCode = false
      },
      showForget: function () {
        this.innerType = '重置密码'
        this.hasCheckedCode = false
      },
      showRegister: function () {
        this.innerType = '注册'
      },

      toCheckRegisterCode: function () {

        if (!Verification.isPhoneNum(this.register_phonenum)) {
          this.register_phonenum_tip = '请输入正确的手机号码'
          return
        }else{
          this.register_phonenum_tip = ''
        }

        if (!Verification.isPassword(this.register_password)) {
          this.register_password_tip = '请输入正确格式的密码'
          return
        }else{
          this.register_password_tip = ''
        }

        if (!Verification.isMessageCode(this.register_code)) {
          this.register_code_tip = '请输入正确格式的验证码'
          return
        }else{
          this.register_code_tip = ''
        }

        //首先校验短信马
        Request.requestCheckRegisterCode(this, this.register_phonenum, this.register_password, this.register_code)
      },

      toRegister: function () {
        Request.requestToRigister(this, this.register_phonenum, this.register_password,)
      },

      toGetRegisteCode: function () {

        if (!Verification.isPhoneNum(this.register_phonenum)) {
          this.register_phonenum_tip = '请输入正确的手机号码'
          this.register_password_tip = ''
          this.register_code_tip = ''
          return
        }else{
          this.register_phonenum_tip = ''
          this.register_password_tip = ''
          this.register_code_tip = ''
        }

        this.canClickCode = false
        Request.requestGetRegisterCode(this, this.register_phonenum)
        this.waitToGetRegisteCode()
      },

      waitToGetRegisteCode: function () {

        this.daojishi = '重新发送(' + this.daoji_timer + ')'
        if (this.daoji_timer > 0) {
          this.daoji_timer--
          setTimeout(this.waitToGetRegisteCode, 1000)
        } else {
          this.canClickCode = true
          this.daoji_timer = this.seconds
        }
      },

      toGetForgetCode: function () {


        if (!Verification.isPhoneNum(this.forget_phonenum)) {
          this.forget_phonenum_tip = '请输入正确的手机号码'
          return
        }else{
          this.forget_phonenum_tip = ''
        }

        Request.requestGetForgetCode(this, this.forget_phonenum)
      },

      checkForgetPhone: function () {

        if (!Verification.isPhoneNum(this.forget_phonenum)) {
          this.forget_phonenum_tip = '请输入正确的手机号码'
          return
        }else{
          this.forget_phonenum_tip = ''
        }


        if (!Verification.isMessageCode(this.forget_code)) {
          this.forget_code_tip = '请输入正确格式的验证码'
          return
        }else{
          this.forget_code_tip = ''
        }

        Request.requestCheckForgetPhone(this, this.forget_phonenum, this.forget_code)
      },

      changePasswordAndLogin: function () {

        if (!Verification.isPassword(this.forget_password)) {
          this.forget_password_tip = '请输入正确格式的密码'
          return
        }else{
          this.forget_password_tip = ''
        }


        Request.requestChangePasswordAndLogin(this, this.forget_phonenum, this.forget_password)
      },

      toCheckBankCard:function (cardid,index) {
        this.checkCardId =cardid


        this.checkCard = this.outData.bankCardList[Number(index)]
        this.innerType='提现'
      }


    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<!--基础设置base-->
<style lang="less">
  @import "../../common/less/index.less";

  @greyBg: rgba(240, 241, 242, 1);




  .qr-dialog {

    border-radius: 4px;

    .el-dialog--center{

      .el-dialog__header,.el-dialog__body{
        padding-left: 0 !important;
        padding-bottom: 0 !important;
        padding-right: 0 !important;
        padding-top: 0 !important;
      }

    }

    .el-dialog__header {
      padding: 0 !important;
    }
    .el-dialog__body {
      padding: 0 !important;
    }

    .el-input {
      background: @greyBg;
      border-radius: 5px;
      /*margin-bottom: 20px;*/
      .el-input__inner {
        /*padding-left: 0;*/
        /*padding-right: 0;*/
        height: 50px;
        outline: none;
        font-size: 20px;
        line-height: 25px;
        border: none;
        background: @greyBg;
      }

      .el-input-group__append {
        padding: 0;
        text-align: center;
        border: none;
        background: @greyBg;
        font-size: 20px;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;

        div {
          margin-right: 20px;
        }
      }

    }

    .el-button {
      width: 250px;
      font-size: 20px;
      color: rgba(255, 255, 255, 1);
      margin-bottom: 20px;
    }

    .el-button-group {
      width: 100%;
      .el-button {
        width: 50%;
        font-size: 20px;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 0;
      }
    }

    .error-input-tip {
      padding-left: 20px;
      font-size: 12px;
      color: rgba(250, 75, 87, 1);
      line-height: 17px;
    }

  }
</style>

<!--表格统一样式-->
<style lang="less" scoped>

  .dialog-container {
    .title-wrapper {
      padding: 20px 22px;
      text-align: center;
      font-size: 24px;
      color: rgba(50, 51, 51, 1);
      line-height: 33px;
      position: relative;
      .to-close-dialog {
        width: 29px;
        height: 29px;
        position: absolute;
        bottom: 20px;
        right: 22px;
        cursor: pointer;
        background: url("../../common/image/close-dialog-normal.png") no-repeat;
        &:hover {
          background: url("../../common/image/close-dialog-hover.png") no-repeat;
        }
      }
    }

    .content-wrapper {
      padding: 0 20px;
    }

    .btn-wrapper {
      text-align: center;
    }

    .footer-wrapper {
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 20px;
      span {
        cursor: pointer;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
        line-height: 20px;
      }
    }


    .my-checkbox{
      display: inline-block;
      width: 30px;
      height: 30px;
      border: 1px solid #66b1ff;
      border-radius: 5px;
      color:white;
    }

    .my-checkbox.checked{
      background-color: #66b1ff;
    }
  }

</style>

<!--提现-->
<style lang="less" scoped>
  .get-cash-content-wrapper {

    .choose-bank-card-wrapper {
      background: rgba(240, 241, 242, 1);
      padding: 12px 10px 12px 15px;
      position: relative;
      margin-bottom: 20px;
      span:first-child {
        font-size: 14px;
        color: rgba(177, 178, 179, 1);
        line-height: 20px;
        display: block;
      }

      span:nth-child(2) {
        display: inline-block;
        font-size: 20px;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
        margin-top: 6px;
      }

      .to-choose-bank-card {
        position: absolute;
        right: 10px;
        bottom: 12px;
        width: 30px;
        height: 30px;

        background: url("../../common/image/in-right-normal.png") no-repeat;
        &:hover {
          background: url("../../common/image/in-right-hover.png") no-repeat;
        }
      }

    }

    .input-money-tocash {
      margin-bottom: 0;
    }
    .tip-money-total {
      margin-left: 20px;
      margin-top: 10px;
      margin-bottom: 20px;
      display: inline-block;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
  }
</style>


<!--选择银行卡-->
<style lang="less" scoped>

  .dialog-container {
    .choose-card-content-wrapper {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 10px;
    }

    .choose-card-item {

      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 30px;
      padding-right: 30px;
      display: flex;
      align-items:center;


      span:first-child{
        font-size: 20px;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
        flex:1;
      }
    }
  }

</style>


<!--登陆-->

<style lang="less">
  .qr-dialog {

    .el-input {
      .to-see-password, .to-hide-password {
        cursor: pointer;
        width: 30px;
        height: 30px;
      }
      .to-see-password {
        background: url("../../common/image/see-password-normal.png") no-repeat;
        &:hover {
          background: url("../../common/image/see-passward-hover.png") no-repeat;
        }
      }
      .to-hide-password {
        background: url("../../common/image/hide-password-normal.png") no-repeat;
        &:hover {
          background: url("../../common/image/hide-password-hover.png") no-repeat;
        }
      }
    }
    .login-btn-wrapper {
      padding-left: 20px;
      padding-right: 20px;
      .el-button {
        display: block;
        width: 100%;
      }
    }
  }
</style>


<!--注册-->
<style lang="less">
  .qr-dialog {
    .input-code {
      .el-input-group__append {
        padding: 0;
        text-align: center;
        width: 170px;

        border: none;
        background: rgba(240, 241, 242, 1);

        div {
          margin-right: 0;
          cursor: pointer;
          font-size: 18px;
          color: rgba(250, 75, 87, 1);
          line-height: 25px;
          border-left: 1px solid #CACBCC;
        }
      }
    }

    .register-btn-wrapper {
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 30px;
      .el-button {
        display: block;
        width: 100%;
        margin-bottom: 0;
      }
    }
  }
</style>


<!--重置密码-->
<style lang="less">
  .qr-dialog {
    .input-code {
      .el-input-group__append {
        padding: 0;
        text-align: center;
        width: 170px;

        border: none;
        background: rgba(240, 241, 242, 1);

        div {
          margin-right: 0;
          cursor: pointer;
          font-size: 18px;
          color: rgba(250, 75, 87, 1);
          line-height: 25px;
          border-left: 1px solid #CACBCC;
        }
      }
    }

    .forget-btn-wrapper {
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 20px;
      .el-button {
        display: block;
        width: 100%;
        margin-bottom: 0;
      }
    }
  }
</style>
