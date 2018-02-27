
<template>
  <div class="companySet">
    <x-header>完善信息内容</x-header>
    <div class="manager">
        <group title="以下均为必填项" label-margin-right="2em">
            <x-input title="企业名称" v-model="name" placeholder="请输入企业名称" required></x-input>
            <x-input title="工商营业执照号码" v-model="licenseNo" placeholder="请输入正确的执照号码" required></x-input>
            <x-input title="地址" v-model="address" placeholder="请输入地址" required></x-input>
            <x-input title="联系人" v-model="linkMan" name="username" placeholder="请输入联系人" is-type="china-name" required></x-input>
            <x-input title="联系电话" v-model="phone" name="mobile" placeholder="请输入联系电话" keyboard="number" is-type="china-mobile" required></x-input>
            <x-input title="法人" v-model="legalBody" placeholder="请输入法人姓名" required></x-input>
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
      baseUrl:'http://invoice.rongecloud.com/admin',//路径
      name:'',
      licenseNo:'',
      address:'',
      linkMan:'',
      phone:'',
      legalBody:'',
      id:JSON.parse(window.localStorage.getItem('customId')),
      openId:JSON.parse(window.localStorage.getItem('infomation')).openId
    }
  },
  methods:{
    //获取数据
    getData(){
      this.$http({
        method:'get',
        url:this.baseUrl+'/custom/custom/getCustomById',
        params:{'id': this.id}
                
      }).then((data)=>{
        // console.log(data);
        if(data.data.ret == 0){
          this.name = data.data.data.name;
          this.address = data.data.data.address;
          this.linkMan = data.data.data.linkMan;
          this.phone = data.data.data.phone; 
          this.licenseNo = data.data.data.licenseNo;
          this.legalBody = data.data.data.legalBody;           
        }
        
      }).catch((err)=>{
        console.log(err) 
      })
    },
    submit(){
      this.$http({
        method:'post',
        url:this.baseUrl+'/custom/custom/'+this.id+'/update',
        params:{
        'id': this.id,
        'name': this.name,
        'licenseNo': this.licenseNo,
        'address': this.address,
        'linkMan': this.linkMan,
        'phone': this.phone,
        'legalBody': this.legalBody,
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