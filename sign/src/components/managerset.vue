<template>
  <div class="companySet">
    <x-header>完善信息内容</x-header>
    <div class="company">
        <group title="以下均为必填项" label-margin-right="2em">
            <x-input title="姓名"  v-model="name" name="username" placeholder="请输入姓名" is-type="china-name" required></x-input>
            <x-input title="手机号码"  v-model="phone"  name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" required></x-input>
            <x-input title="机构编码"  v-model="branchCode"  placeholder="请输入正确的机构编码" required></x-input>
            <x-input title="身份证号"  v-model="cardId"  placeholder="请输入身份证号码" required></x-input>
            
        </group>
        <box gap="10px 10px">
            <x-button type="primary" @click.native="submit">提交</x-button>
        </box>
    </div>
    <toast type="text"></toast>
  </div>
</template>

<script>
import { XHeader,XInput, Group,XButton, Box,Toast } from 'vux'
export default {
  name: 'companySet',
  components: {
    XHeader,
    XInput, 
    Group,
    XButton,
    Box,
    Toast
  },
  data () {
    return {
      baseUrl:'http://invoice.rongecloud.com/admin',//验证码路径
      name:'',
      cardId:'',
      phone:'',
      branchCode:'',
      id:JSON.parse(window.localStorage.getItem('customManagerId')),
      openId:JSON.parse(window.localStorage.getItem('infomation')).openId
    }
  },
  methods:{
    //获取数据
    getData(){
      this.$http({
        method:'get',
        url:this.baseUrl+'/custommanager/custommanager/getCustomManagerById',
        params:{'id': this.id}
                
      }).then((data)=>{
        // console.log(data);
        if(data.data.ret == 0){
          this.name = data.data.data.name;
          this.cardId = data.data.data.cardId;
          this.phone = data.data.data.phone;
          this.branchCode = data.data.data.branchCode;           
        }
        
      }).catch((err)=>{
        console.log(err) 
      })
    },
    submit(){
      this.$http({
        method:'post',
        url:this.baseUrl+'/custommanager/custommanager/'+this.id+'/update',
        params:{
        'id': this.id,
        'name': this.name,
        'cardId': this.cardId,
        'phone': this.phone,
        'branchCode': this.branchCode,
        'openId':this.openId
        }
                
      }).then((data)=>{
        if(data.data.ret == 0){
          this.$vux.toast.text('保存成功'); 
        }
      }).catch((err)=>{
        this.$vux.toast.text('保存失败'); 
      })
    }
  },
  mounted(){
    this.getData();
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
