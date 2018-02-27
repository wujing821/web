<template>
  <div class="sign">
    <x-header>电子发票签约<router-link class="link" slot="right" to="/user">个人中心</router-link></x-header>
    <!-- <group>
      <cell title="title" value="value"></cell>
    </group> -->
    <group label-width="5em" label-margin-right="2em" label-align="left" title="以下内容均为必填项">
      <x-input ref="companyName" title="企业名称" placeholder="必填" required v-model="companyname" type='text'></x-input>
      <x-input ref="license" title="工商营业执照号码" placeholder="必填" required v-model="licenseNum" type='text'></x-input>
      <x-input ref="address" title="地址" placeholder="必填" required v-model="address" type='text'></x-input>
      <x-input ref="linkman" title="联系人" placeholder="必填" required v-model="linkman" type='text'></x-input>
      <x-input ref="tel" title="联系电话" mask="99999999999" required v-model="tel" :max="13" is-type="china-mobile" placeholder="必填"  type='text'></x-input>
      <selector title="选择产品" :options="this.productlist" v-model="product" placeholder="请选择产品" :direction="'right'" type='text'></selector>
      <!-- <selector title="合同期限" :options="['1年', '2年']" v-model="value2"></selector> -->
      <x-number title="合同期限" align="left" v-model="term" button-style="round" :min="0" :max="50" placeholder="必填"  type='text'></x-number>
      <x-input ref="imgCode" title="图形验证码" class="weui-cell_vcode" required v-model="imgCode" type='text'>
        <img id="img_jcaptcha"  slot="right" class="weui-vcode-img" :src="baseUrl+'/images/getValiImage?ts='+time"  @click="changeJcaptchaSrc">
        <!-- <img id="img_jcaptcha"  src="${appPath}/jcaptcha.jpg" class="weui-vcode-img" onclick="changeJcaptchaSrc();" /> -->

      </x-input>
      <x-input ref="msg" title="短信验证码" class="weui-vcode" required v-model="msg" type='text'>
        <x-button id="getmsgBtn"   slot="right" type="primary" mini  @click.native="getMsg">发送验证码</x-button>
      </x-input>
    </group>
    <div style="padding:15px;">
      <check-icon :value.sync="checkagree">同意协议内容</check-icon>
      <!-- <a href="https://github.com/airyland/vux/blob/v2/src/App.vue">威顿华融电子发票服务协议</a> -->
      <router-link to="/agreement">威顿华融电子发票服务协议</router-link>
    </div>
    <x-button type="primary" @click.native="getValid">签署服务协议</x-button>
    <!-- 引导页 -->
    <div v-transfer-dom>
      <x-dialog v-model="showDialogStyle" hide-on-blur :dialog-style="{'max-width': '100%', width: '100%', height: '100%', 'background-color': 'transparent'}">
        <p style="color:#fff;text-align:center;margin-top:70%">
          <span style="font-size:14px;">请您先完善个人中心基本信息，否则无法签约</span>
          <br>
          <br>
          <x-icon type="ios-close-outline" style="fill:#fff;" @click="close"></x-icon>
        </p>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import { XHeader,Group, Cell, XInput, Selector,XButton,CheckIcon,XDialog, XNumber, TransferDomDirective as TransferDom } from 'vux'
import { debug } from 'util';

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
    XNumber
  },
  data () {
    return {
      ticket:'',//code值
      companyname: '',//企业名称
      product: '',//产品名称
      productlist:['产品一','产品二','产品三','产品四'],//产品列表选项
      tel: '',//联系电话
      licenseNum:'',//工商营业执照号码
      address:'',//地址
      linkman:'',//联系人
      term: 0,//合同期限
      checkagree: false,//同意协议与否
      showDialogStyle: false,//是否显示引导页
      baseUrl:'http://invoice.rongecloud.com/admin',//验证码路径
      imgCode:'',//图形验证码
      msg:'',//短信验证码
      time:new Date().getTime()+Math.random(),
      id:JSON.parse(window.localStorage.getItem('customId')?window.localStorage.getItem('customId'):window.localStorage.getItem('customManagerId')),
      channel:JSON.parse(window.localStorage.getItem('customId')? 0 : 1),//签约渠道
      openId:'',//微信用户公众号id
      signContractId:''//签约id
    }
  },
  methods:{
    
    //关闭提示层
    close(){
      this.showDialogStyle = false;
      this.$router.push({path:'/info'})
    },
    //刷新验证码图片
    changeJcaptchaSrc(){
      // document.getElementById("img_jcaptcha").src=this.imgSrc+'/jcaptcha.jpg?_='+(new Date()).getTime();  
      this.time = new Date().getTime()+Math.random();
      this.$http({
        method:'get',
        url:this.baseUrl+'/images/getValiImage',
        params:{'ts': this.time}
                
      }).then((data)=>{
        console.log('获取图片验证码成功')
      }).catch((err)=>{
        console.log('获取图片验证码失败')
      })
    },
    //获取短信验证码
    getMsg(){
      this.$http({
        method:'get',
        url: this.baseUrl +'/validcode/sms/getVfcode',
        params:{'mobile':this.tel,'key':this.time,'code':this.imgCode}
                
      }).then((data)=>{
        if(data.data.ret == 0){   
          console.log('获取短信验证码成功')                
        }
      }).catch((err)=>{
        console.log('获取短信验证码失败')
      })
    },
    //签约方法
    getValid(){
      //定义校验变量默认为true
      var valid = true;
      if(this.companyname == ''){
        this.$refs.companyName.onBlur();
        valid = false; 
      }
      if(this.licenseNum == ''){
        this.$refs.license.onBlur();
        valid = false;
      }
      if(this.address == ''){
        this.$refs.address.onBlur();
        valid = false;
      }
      if(this.linkman == ''){
        this.$refs.linkman.onBlur();
        valid = false;
      }
      //当电话号码为空
      if(this.tel == ''){
        this.$refs.tel.onBlur();
        valid = false;
      }else{
        //当电话号码不为空，但未通过验证
        if(!this.$refs.tel.valid){
          valid = false;
        }
      }
      if(this.imgCode == ''){
        this.$refs.imgCode.onBlur();
        valid = false;
      }
      if(this.msg == ''){
        this.$refs.msg.onBlur();
          valid = false;
      }
      if(this.product == ''){
        valid = false;
      }
      if(this.term == 0 ){
        valid = false;
      }
      if(this.checkagree === false){    
        valid = false;
      }
      if(valid){
        console.log('全部填写完毕，验证成功');
        this.$http({
          method:'post',
          url: this.baseUrl +'/agreement/agreement/create',
          params:{
          'registerId':this.id,//客户id
          'channel':this.channel,//客户经理id
          'name':this.companyname,//企业名称
          'licenseNo':this.licenseNum,//营业执照号
          'address':this.address,//地址
          'linkMan':this.linkman,//联系人
          'phone':this.tel,//联系人手机号
          'productId':this.product,//产品id
          'contractLimit':this.term,//合同期限
          'smsCode':this.msg,//短信验证码
          'openId':this.openId//微信用户公众号id
          }

        }).then((data)=>{
          console.log(data)
          if(data.data.ret == 0){   
            console.log('签约成功') 
            this.signContractId = data.data.data; 
            //验证成功之后跳转路由
            this.$router.push({path:'/pay', query: {name: this.companyname,licenseNo:this.licenseNum,address:this.address,linkMan:this.linkman,
                phone:this.tel,productId:this.product,contractLimit:this.term,signContractId:this.signContractId}})             
          }
          
        }).catch((err)=>{
          console.log('签约失败')
        })
      }
    },
    getData(){
      //获取用户信息
      let obj = {};

      this.$http({
          method:'get',
          url:this.baseUrl+'/register/register/getUser',
          params:{'code': this.ticket}
                  
        }).then((data)=>{
          console.log(data)
          if(data.data.ret == 0){   
            this.openId = data.data.data.openId;//微信公众号id  
            //将获取的用户信息存入localstorage 
            if(data.data.data.usertype == 0){//用户未注册
              this.showDialogStyle = true;//显示引导层
              obj['usertype'] = 0;
              obj['openId'] = data.data.data.openId;

            }else if(data.data.data.usertype == 1){//企业用户
              this.showDialogStyle = false;
              if(window.localStorage){
                localStorage.setItem("customId",JSON.stringify(data.data.data.id))
              }
              obj['usertype'] = 1;
              obj['customId'] = data.data.data.id;
              obj['name'] = data.data.data.name;
              obj['licenseNo'] = data.data.data.licenseNo;
              obj['address'] = data.data.data.address;
              obj['linkMan'] = data.data.data.linkMan;
              obj['phone'] = data.data.data.phone;
              obj['openId'] = data.data.data.openId;
              obj['legalBody'] = data.data.data.legalBody;
            }else if(data.data.data.usertype == 2){//客户经理
              this.showDialogStyle = false;
              if(window.localStorage){
                localStorage.setItem("customManagerId",JSON.stringify(data.data.data.id))
              }
              obj['usertype'] = 2;
              obj['customManagerId'] = data.data.data.id;
              obj['name'] = data.data.data.name;
              obj['linkMan'] = data.data.data.linkMan;
              obj['phone'] = data.data.data.phone;
              obj['openId'] = data.data.data.openId;
              obj['cardId'] = data.data.data.cardId;
              obj['branchCode'] = data.data.data.branchCode;            
            }
            //存入localhost
            localStorage.setItem("infomation",JSON.stringify(obj));
          }
        }).catch((err)=>{
          console.log(err)
        })
    }
  },
  mounted(){
    
    //截取地址栏code值方法
    function QueryString(val) {
      var uri = window.location.search;
      var re = new RegExp("" + val + "\=([^\&\?]*)", "ig");
      return((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null);
    }  
    //页面加载时会截取地址栏的code值
    this.ticket = QueryString("code");
    console.log(this.ticket);
    //当code值为空时，向微信发起请求，等待微信返回带有code参数的地址
    if(!this.ticket){
      if(!JSON.parse(window.localStorage.getItem('customId')) && !JSON.parse(window.localStorage.getItem('customManagerId'))){
        //先下测试地址
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4093b281fe90361c&redirect_uri=http%3a%2f%2ferong.free.ngrok.cc&response_type=code&scope=snsapi_base&state=hello-world#wechat_redirect';
        //线上回调地址
        //window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4093b281fe90361c&redirect_uri=http%3a%2f%2ffront.invoice.rongecloud.com%2fstatic&response_type=code&scope=snsapi_base&state=hello-world#wechat_redirect';
      
      }else{
        this.showDialogStyle = false;//当code为空，但有用户信息时，关闭引导页
      }
      
    }else{//当code不为空时，没有用户信息时，向后台发送请求，请求用户信息
      //将code值存入localhost
      localStorage.setItem("code",JSON.stringify(this.ticket));
      if(!JSON.parse(window.localStorage.getItem('customId')) && !JSON.parse(window.localStorage.getItem('customManagerId'))){
        this.getData();

      }else{//当code不为空时，也有用户信息时，关闭引导页
        this.showDialogStyle = false;
      }
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
