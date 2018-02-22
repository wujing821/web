<template>
  <div class="sign">
    <x-header>电子发票签约<router-link class="link" slot="right" to="/user">个人中心</router-link></x-header>
    <!-- <group>
      <cell title="title" value="value"></cell>
    </group> -->
    <group label-width="5em" label-margin-right="2em" label-align="left" title="以下内容均为必填项">
      <x-input title="企业名称" placeholder="必填" required v-model="companyname"></x-input>
      <x-input title="工商营业执照号码" placeholder="必填" required v-model="licenseNum"></x-input>
      <x-input title="地址" placeholder="必填" v-model="address"></x-input>
      <x-input title="联系人" placeholder="必填" required v-model="linkman"></x-input>
      <x-input title="联系电话" mask="999 9999 9999" v-model="tel" :max="13" is-type="china-mobile" placeholder="必填" ></x-input>
      <selector title="选择产品" :options="this.productlist" v-model="product" placeholder="请选择产品" :direction="'right'"></selector>
      <!-- <selector title="合同期限" :options="['1年', '2年']" v-model="value2"></selector> -->
      <x-number title="合同期限" align="left" v-model="numberValue" button-style="round" :min="0" :max="50" placeholder="必填" ></x-number>
      <x-input title="图形验证码" class="weui-cell_vcode" v-model="imgCode">
        <img id="img_jcaptcha"  slot="right" class="weui-vcode-img" :src="this.imgSrc+'/jcaptcha.jpg'"  @click="changeJcaptchaSrc">
        <!-- <img id="img_jcaptcha"  src="${appPath}/jcaptcha.jpg" class="weui-vcode-img" onclick="changeJcaptchaSrc();" /> -->

      </x-input>
      <x-input title="短信验证码" class="weui-vcode">
        <x-button id="getmsgBtn"   slot="right" type="primary" mini  @click.native="getMsg">发送验证码</x-button>
      </x-input>
    </group>
    <div style="padding:15px;">
      <check-icon :value.sync="checkagree">同意协议内容</check-icon>
      <!-- <a href="https://github.com/airyland/vux/blob/v2/src/App.vue">威顿华融电子发票服务协议</a> -->
      <router-link to="/agreement">威顿华融电子发票服务协议</router-link>
    </div>
    <x-button type="primary" link="/pay">签署服务协议</x-button>
    <!-- 引导页 -->
    <div v-transfer-dom>
      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <p style="color:#fff;text-align:center;" @click="showDialogStyle = false">
          <span style="font-size:14px;">请您先完善个人中心基本信息，否则无法签约</span>
          <br>
          <br>
          <x-icon type="ios-close-outline" style="fill:#fff;"></x-icon>
        </p>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { XHeader,Group, Cell, XInput, Selector,XButton,CheckIcon,XDialog, XNumber,AjaxPlugin, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'sign',
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Group,
    Cell,
    XInput,
    Selector,
    XButton,
    CheckIcon,
    XDialog,
    XNumber,
    AjaxPlugin
  },
  data () {
    return {
      companyname: '',//企业名称
      product: '',//产品名称
      productlist:['产品一','产品二','产品三','产品四'],//产品列表选项
      tel: '',//联系电话
      licenseNum:'',//工商营业执照号码
      address:'',//地址
      linkman:'',//联系人
      numberValue: 0,//合同期限
      checkagree: false,//同意协议与否
      showDialogStyle: true,//引导页
      msg:'http://172.17.29.3:8080/invoiceplatform/admin',//短信验证码路径
      imgSrc:"http://172.17.29.3:8080/invoiceplatform", //图片验证码路径
      imgCode:''//图形验证码
    }
  },
  methods:{
    changeJcaptchaSrc(){
      document.getElementById("img_jcaptcha").src=this.imgSrc+'/jcaptcha.jpg?_='+(new Date()).getTime();  
    },
    getMsg(){
      // console.log(888);
      // let dataStr = '18810724186'+this.imgCode;
      let dataStr = {};
      dataStr['mobile'] = this.tel;
      dataStr['imgJcaptcha'] = this.imgCode;
      console.log(dataStr)
      AjaxPlugin.$http.get(this.msg+'/validcode/sms/getVfcode', dataStr)
      .then((response) => {
        // if (cb) cb(response.data)
        console.log(data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.link{
  text-decoration: none;
}
.weui-cell_select-after .weui-select{
  padding-left: 10px !important;
}
</style>
