<template>
  <div class="pay">
    <x-header>开票信息</x-header>
    <group :title="'您已成功签署电子发票服务协议，请尽快完成支付'">
      <!-- <cell-box is-link> -->
        <form-preview :header-label="'付款金额'" :header-value="amount" :body-items="list"></form-preview>
      <!-- </cell-box> -->
    </group>
    <group label-width="7em" label-margin-right="2em" label-align="left" :title="'请输入发票信息'">
      <x-input ref="invoiceTitle" required title="开票单位名称" placeholder="必填" v-model="invoiceTitle"></x-input>
      <x-input ref="invoiceTaxNo" required title="开票单位税号" placeholder="必填" v-model="invoiceTaxNo"></x-input>
      <x-input ref="invoiceAdress" required title="开票单位地址" placeholder="必填" v-model="invoiceAdress"></x-input>
      <x-input ref="invoiceTel" required title="开票单位电话" placeholder="必填" v-model="invoiceTel"></x-input>
      <x-input ref="invoiceOpenBank" required title="开户银行" placeholder="必填" v-model="invoiceOpenBank"></x-input>
      <x-input ref="invoiceAccountNo" required title="开户银行账户" placeholder="必填" v-model="invoiceAccountNo"></x-input>  
    </group>
    <box gap="10px 10px">
        <x-button type="primary" @click.native="pay" v-if="isShow">支付确认</x-button>
        <x-button type="primary" @click.native="confirm" v-else>确认开票信息</x-button>
    </box>
    <toast type="text"></toast>
  </div>
</template>

<script>
import { XHeader,Group, Cell, CellBox,XButton, Box,FormPreview, XInput,Qrcode, Divider,Toast } from 'vux'
export default {
  name: 'pay',
  components: {
    XHeader,
    Group,
    Cell,
    CellBox,
    XButton, 
    Box,
    FormPreview,
    XInput,
    Qrcode, 
    Divider,
    Toast
  },
  data () {
    return {
      isShow: window.localStorage.getItem('customId'),
      baseUrl:'http://invoice.rongecloud.com/admin',//路径
      amount: 0.01,//支付金额  
      openId:JSON.parse(window.localStorage.getItem('infomation')).openId,
      // openId:'onXVSwx-oeqmpWpolHp-5Qpm_ETo',
      invoiceTitle:'',
      invoiceTaxNo:'',
      invoiceAdress:'',
      invoiceTel:'',
      invoiceOpenBank:'',
      invoiceAccountNo:'',
      mchOrderNo: new Date().getTime()+Math.random(),
      list: [
        {
          label: '企业名称',
          value: this.$route.query.name
        }, 
        {
          label: '营业执照号',
          value: this.$route.query.licenseNo
        }, 
        {
          label: '地址',
          value: this.$route.query.address
        },
        {
          label: '联系人',
          value: this.$route.query.linkMan
        }, 
        {
          label: '联系人手机号',
          value: this.$route.query.phone
        }, 
        {
          label: '产品',
          value: this.$route.query.productId
        },
        {
          label: '合同期限',
          value: this.$route.query.contractLimit
        }
      ]
      //向微信发起请求
      // appId : '',     //公众号名称，由商户传入
      // timeStamp : '',         //时间戳，自1970年以来的秒数
      // nonceStr : '', //随机串
      // package : '',
      // signType : '',         //微信签名方式：
      // paySign : ''
    }
  },
  methods:{
    confirm(){
      let valid = true;
      if(this.invoiceTitle == ''){
        this.$refs.invoiceTitle.onBlur();
        valid = false; 
      }
      if(this.invoiceTaxNo == ''){
        this.$refs.invoiceTaxNo.onBlur();
        valid = false;
      }
      if(this.invoiceAdress == ''){
        this.$refs.invoiceAdress.onBlur();
        valid = false;
      }
      if(this.invoiceTel == ''){
        this.$refs.invoiceTel.onBlur();
        valid = false;
      }
      if(this.invoiceAccountNo == ''){
        this.$refs.invoiceAccountNo.onBlur();
        valid = false;
      }
      if(this.invoiceOpenBank == ''){
        this.$refs.invoiceOpenBank.onBlur();
        valid = false;
      }
      if(valid){
        console.log('全部填写完毕，验证成功');
        console.log(parseInt(this.amount*100))
        this.mchOrderNo = new Date().getTime()+Math.random();
        this.$http({
          method:'get',
          url:this.baseUrl+'/api/pay/create_order',
          params:{
          'amount': parseInt(this.amount*100),
          'currency': 'CNY',
          'channelId': 'WX_NATIVE',
          'mchOrderNo': this.mchOrderNo,//商户订单号
          'agreementId': this.$route.query.signContractId,//签约id
          'invoiceTitle': this.invoiceTitle,
          'invoiceTaxNo': this.invoiceTaxNo,
          'invoiceAdress': this.invoiceAdress,
          'invoiceTel': this.invoiceTel,
          'invoiceAccountNo': this.invoiceAccountNo,
          'invoiceOpenBank': this.invoiceOpenBank
          }
                  
        }).then((data)=>{
            console.log(data)
            if(data.data.resCode ==="SUCCESS" && data.data.retCode ==="SUCCESS"){
              console.log('开票成功，可以支付了');
              //确认开票信息之后跳转页面
              this.$router.push({path:'/payment',query: {codeUrl: data.data.codeUrl,mchOrderNo: this.mchOrderNo}})
            }
          
        }).catch((err)=>{
          console.log(err)
        })
        
      }

      
    },
    //企业用户调用微信支付方式
    pay(){
      let valid = true;
      if(this.invoiceTitle == ''){
        this.$refs.invoiceTitle.onBlur();
        valid = false; 
      }
      if(this.invoiceTaxNo == ''){
        this.$refs.invoiceTaxNo.onBlur();
        valid = false;
      }
      if(this.invoiceAdress == ''){
        this.$refs.invoiceAdress.onBlur();
        valid = false;
      }
      if(this.invoiceTel == ''){
        this.$refs.invoiceTel.onBlur();
        valid = false;
      }
      if(this.invoiceAccountNo == ''){
        this.$refs.invoiceAccountNo.onBlur();
        valid = false;
      }
      if(this.invoiceOpenBank == ''){
        this.$refs.invoiceOpenBank.onBlur();
        valid = false;
      }
      if(valid){
        console.log('全部填写完毕，验证成功');
        this.mchOrderNo = new Date().getTime()+Math.random();
        //先判断是否即将给微信传递的值是否已从后台取过
        // if(!this.appId && !this.timeStamp && !this.nonceStr && !this.package && !this.signType && !this.paySign){
            this.$http({
              method:'get',
              url:this.baseUrl+'/api/pay/create_order',
              params:{
              'amount': parseInt(this.amount*100),
              'currency': 'CNY',
              'channelId': 'WX_JSAPI',
              'openId': this.openId,
              'mchOrderNo': this.mchOrderNo,//商户订单号
              'agreementId':  this.$route.query.signContractId,//签约id
              'invoiceTitle': this.invoiceTitle,
              'invoiceTaxNo': this.invoiceTaxNo,
              'invoiceAdress': this.invoiceAdress,
              'invoiceTel': this.invoiceTel,
              'invoiceAccountNo': this.invoiceAccountNo,
              'invoiceOpenBank': this.invoiceOpenBank
            }
                    
          }).then((data)=>{
              console.log(data);
              if(data.data.resCode ==="SUCCESS" && data.data.retCode ==="SUCCESS"){
                console.log('开票成功，可以支付了');
                // this.appId = data.data.payParams.appId,   //公众号名称，由商户传入
                // this.timeStamp = data.data.payParams.timeStamp,  //时间戳，自1970年以来的秒数
                // this.nonceStr = data.data.payParams.nonceStr, //随机串
                // this.package = data.data.payParams.package,
                // this.signType = data.data.payParams.signType, //微信签名方式
                // this.paySign = data.data.payParams.paySign
                     
              // this.getPay();
              function onBridgeReady(){
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', {
                        "appId":data.data.payParams.appId,     //公众号名称，由商户传入     
                        "timeStamp":data.data.payParams.timeStamp,         //时间戳，自1970年以来的秒数     
                        "nonceStr": data.data.payParams.nonceStr, //随机串     
                        "package":data.data.payParams.package,     
                        "signType": data.data.payParams.signType,         //微信签名方式：     
                        "paySign":data.data.payParams.paySign, //微信签名 
                        success:function(res){
                            alert('成功')
                            //确认开票信息之后跳转页面
                            this.$router.push({path:'/success',query: {amount: this.amount}})
                        }
                    },
                    function(res){     
                        if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                          console.log('成功');
                          alert('111111成功')
                          //确认开票信息之后跳转页面
                          this.$router.push({path:'/success',query: {amount: this.amount}})
                        }else{
                          // alert('支付失败：' + res.err_msg);
                          this.$vux.toast.text('支付失败');
                          console.log('微信端支付报错'+res.err_msg);//错误信息
                        }
                    }
                ); 
              }
              if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
              }else{
                onBridgeReady();
              }
            } 
          }).catch((err)=>{
            console.log('后台支付报错'+err)
            this.$vux.toast.text('支付失败');
          
          })
        // }else{//如果已经有值了，就可以向微信发送请求调起支付接口
        //   this.getPay();
        // }
        
      }
    },
    //调起微信支付弹窗
    // getPay(){
      
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

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
  text-decoration:none; 
}

.weui-form-preview__btn_primary{
    text-decoration: none;
}
.vux-form-preview{
    width: 98%;
}

.weui-form-preview:before{
    border-top:none !important;
}

</style>
