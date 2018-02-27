<template>
  <div class="payment">
    <x-header>开票信息</x-header>
    
    <divider>{{'支付二维码'}}</divider>
    <qrcode :value="codeUrl" type="img" :size="100"></qrcode>
    <box gap="10px 10px">
        <x-button type="primary" @click.native="confirmPay">支付确认</x-button>
    </box>
  </div>
</template>

<script>
import { XHeader,XButton, Box,Qrcode, Divider } from 'vux'
export default {
  name: 'payment',
  components: {
    XHeader,
    XButton, 
    Box,
    Qrcode, 
    Divider
  },
  data () {
    return {
      codeUrl:this.$route.query.codeUrl,
      mchOrderNo:this.$route.query.mchOrderNo,
      baseUrl:'http://invoice.rongecloud.com/admin',
    }
  },
  methods:{
    confirmPay(){
      this.$http({
          method:'get',
          url:this.baseUrl+'/api/pay/query_order',
          params:{
          'mchOrderNo': this.mchOrderNo//商户订单号
          }
                  
        }).then((data)=>{
            console.log(data)
            if(data.data.resCode ==="SUCCESS" && data.data.retCode ==="SUCCESS"){
              console.log('支付中');
              if(data.data.result.status == '2'){
                  //确认开票信息之后跳转页面
                  this.$router.push({path:'/success',query: {amount: data.data.result.amount}})
                  console.log('支付成功')
              }
              
            }
          
        }).catch((err)=>{
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>



</style>
