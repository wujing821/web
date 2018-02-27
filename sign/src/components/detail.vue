<template>
  <div class="signDetail">
    <x-header>签约详情</x-header>
    <form-preview :header-label="'付款金额'" header-value="10.00" :body-items="list" name="demo"></form-preview>
  </div>
</template>

<script>
import { XHeader,FormPreview} from 'vux'
export default {
  name: 'signDetail',
  components: {
    XHeader,
    FormPreview
  },
  data () {
    return {
      baseUrl:'http://invoice.rongecloud.com/admin',
      list:[]
    }
  },
  mounted(){
    //获取数据
    let signId = this.$route.query.id;
      console.log(signId)
      this.$http({
        method:'get',
        url:this.baseUrl+'/agreement/agreement/getAgreementDetail',
        params:{'id': signId}
                
      }).then((data)=>{
        console.log(data);
        if(data.data.ret == 0){
          console.log(333)
          this.list = [
            {
              label: '企业名称',
              value: data.data.data.name
            }, 
            {
              label: '营业执照号',
              value: data.data.data.licenseNo
            }, 
            {
              label: '地址',
              value: data.data.data.address
            },
            {
              label: '联系人',
              value: data.data.data.linkMan
            }, 
            {
              label: '联系人手机号',
              value: data.data.data.phone
            }, 
            {
              label: '产品',
              value: data.data.data.productId
            },
            {
              label: '合同期限',
              value: data.data.data.contractLimit
            }
          ]
        }
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
   


</style>
