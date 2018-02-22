<template>
  <div class="personInfo">
    <x-header>完善信息内容</x-header>
    <tab>
      <tab-item selected @on-item-click="showCompany">企业用户</tab-item>
      <tab-item @on-item-click="showManager">客户经理</tab-item>
    </tab>
    <div class="company" v-show="isShow">
        <group title="以下均为必填项">
            <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name" required></x-input>
            <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" required></x-input>
            <x-input title="机构编码" placeholder="请输入正确的机构编码" required></x-input>
            <x-input title="身份证号" placeholder="请输入身份证号码" required></x-input>
            
        </group>
        <box gap="10px 10px">
            <x-button type="primary" link="/user">提交</x-button>
        </box>
    </div>
    <div class="manager" v-show="!isShow">
        <group title="以下均为必填项">
            <x-input title="企业名称" placeholder="请输入企业名称" required></x-input>
            <x-input title="工商营业执照号码" placeholder="请输入正确的执照号码" required></x-input>
            <x-input title="地址" placeholder="请输入地址" required></x-input>
            <x-input title="联系人" name="username" placeholder="请输入联系人" is-type="china-name" required></x-input>
            <x-input title="联系电话" name="mobile" placeholder="请输入联系电话" keyboard="number" is-type="china-mobile" required></x-input>
            <x-input title="负责人" placeholder="请输入负责人姓名" required></x-input>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" link="/user">提交</x-button>
        </box>
    </div>
  </div>
</template>

<script>
import { XHeader,Tab, TabItem,XInput, Group,XButton, Box } from 'vux'
export default {
  name: 'personInfo',
  components: {
    XHeader,
    Tab,
    TabItem,
    XInput, 
    Group,
    XButton,
    Box
  },
  data () {
    return {
      isShow:true
    }
  },
  methods:{
      showCompany(){
          this.isShow = true;
      },
      showManager(){
          this.isShow = false;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
</style>
