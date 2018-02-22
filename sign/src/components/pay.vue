<template>
  <div class="pay">
    <x-header>等待支付</x-header>
    <group :title="'您已成功签署电子发票服务协议，请尽快完成支付'">
      <cell-box is-link>
        <form-preview :header-label="'付款金额'" header-value="¥2400.00" :body-items="list" name="demo"></form-preview>
      </cell-box>
    </group>
    <group label-width="7em" label-margin-right="2em" label-align="left" :title="'请输入发票信息'">
      <x-input title="开票单位名称" placeholder="必填" v-model="value3"></x-input>
      <x-input title="开票单位税号" placeholder="必填" v-model="value3"></x-input>
      <x-input title="开票单位地址" placeholder="必填" v-model="value3"></x-input>
      <x-input title="开票单位电话" placeholder="必填" v-model="value3"></x-input>
      <x-input title="开户银行" placeholder="必填" v-model="value3"></x-input>
      <x-input title="开户银行账户" placeholder="必填" v-model="value3"></x-input>  
    </group>
    <divider>{{'支付二维码'}}</divider>
    <qrcode value="https://vux.li?x-page=demo_qrcode" type="img" :size="100"></qrcode>
    <box gap="10px 10px">
        <x-button type="primary" link="/success">支付确认</x-button>
    </box>
  </div>
</template>

<script>
import { XHeader,Group, Cell, CellBox,XButton, Box,FormPreview, XInput,Qrcode, Divider } from 'vux'
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
    Divider
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
      ],
      buttons2: [{
        style: 'primary',
        text: '回到个人中心',
        link: '/userCenter'
        // onButtonClick: (name) => {
        //   alert(`clicking ${name}`)
        // }
      }],
      value3: ''
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
