<template>
  <div class="signDetail">
    <x-header>签约详情</x-header>
    <form-preview :header-label="'付款金额'" header-value="¥2400.00" :body-items="list" name="demo"></form-preview>

  </div>
</template>

<script>
import { XHeader,FormPreview } from 'vux'
export default {
  name: 'signDetail',
  components: {
    XHeader,
    FormPreview
  },
  data () {
    return {
      list: [
        {
            label: '合同编号:',
            value: '123'
        }, 
        {
            label: '签署人:',
            value: '张三'
        }, 
        {
            label: '签署时间:',
            value: '2018年02月28日'
        },
        {
            label: '产品套餐:',
            value: '3000张/年'
        }, 
        {
            label: '服务周期',
            value: '3年'
        }, 
        {
            label: '产品单价',
            value: '1000元'
        },
        {
            label: '合同总价',
            value: '3000元'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
   


</style>
