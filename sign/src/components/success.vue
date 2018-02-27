<template>
  <div class="success">
    <x-header>付款成功</x-header>
    <!-- <form-preview :header-label="'付款金额'" header-value="¥2400.00" :body-items="list" :footer-buttons="buttons2" name="demo"></form-preview> -->
    <box gap="50px 10px">
      <icon type="success" is-msg></icon>
      <p>支付成功</p>
      <div class="payInfo">您已成功支付合同费用<span class="payMoney" v-text='amount'></span>分，我们将尽快为您配置开通电子发票服务，感谢您的使用</div>
      <p>服务电话：400-123-45678</p>
    </box>
  </div>
</template>

<script>
import { XHeader,Group, Cell, CellBox,XButton, Box,FormPreview,Icon } from 'vux'
export default {
  name: 'success',
  components: {
    XHeader,
    Group,
    Cell,
    CellBox,
    XButton, 
    Box,
    FormPreview,
    Icon
  },
  data () {
    return {
      amount:this.$route.query.amount,
      list: [{
        label: '产品',
        value: '产品一'
      }, {
        label: '感谢您的使用',
        value: '我们将尽快开通电子发票服务'
      }, {
        label: '服务电话',
        value: '400-123-2112'
      }],

      buttons2: [{
        style: 'primary',
        text: '回到个人中心',
        link: '/user'
        // onButtonClick: (name) => {
        //   alert(`clicking ${name}`)
        // }
      }]
    }
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
.payInfo{
    // color: #;
    .payMoney{
        color: #FFBE00;      
    }
}

.weui-form-preview__btn_primary{
    text-decoration: none;
}

</style>
