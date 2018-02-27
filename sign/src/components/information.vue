<template>
  <div class="personInfo">
    <x-header>完善信息内容</x-header>
    <tab>
      <tab-item selected @on-item-click="showCompany">客户经理</tab-item>
      <tab-item @on-item-click="showManager">企业用户</tab-item>
    </tab>
    <div class="company" v-show="isShow">
        <group title="以下均为必填项">
            <x-input ref="name" title="姓名" v-model="name" name="username" type='text' placeholder="请输入姓名" is-type="china-name" required></x-input>
            <x-input ref="tel" title="手机号码" v-model="tel" name="mobile" type='text' placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" required></x-input>
            <x-input ref="branchCode" title="机构编码" v-model="branchCode" type='text' placeholder="请输入正确的机构编码" required></x-input>
            <x-input ref="identity" title="身份证号" v-model="identity" type='text' placeholder="请输入身份证号码" required></x-input>
            
        </group>
        <box gap="10px 10px">
            <x-button type="primary" @click.native="magagerSubmit">提交</x-button>
        </box>
        <toast type="text"></toast>
    </div>
    <div class="manager" v-show="!isShow">
        <group title="以下均为必填项">
            <x-input ref="companyName" title="企业名称" v-model="companyName" type='text' placeholder="请输入企业名称" required></x-input>
            <x-input ref="licenseNo" title="工商营业执照号码" v-model="licenseNo" type='text' placeholder="请输入正确的执照号码" required></x-input>
            <x-input ref="address" title="地址" v-model="address" type='text' placeholder="请输入地址" required></x-input>
            <x-input ref="linkMan" title="联系人" v-model="linkMan" name="username" type='text' placeholder="请输入联系人" is-type="china-name" required></x-input>
            <x-input ref="phone" title="联系电话" v-model="phone" name="mobile" type='text' placeholder="请输入联系电话" keyboard="number" is-type="china-mobile" required></x-input>
            <x-input ref="legalBody" title="法人" v-model="legalBody" type='text' placeholder="请输入负责人姓名" required></x-input>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" @click.native="companySubmit">提交</x-button>
        </box>
        <toast type="text"></toast>
    </div>
  </div>
</template>

<script>
import { XHeader,Tab, TabItem,XInput, Group,XButton, Box,Toast } from 'vux'
import { setTimeout } from 'timers';

export default {
  name: 'personInfo',
  components: {
    XHeader,
    Tab,
    TabItem,
    XInput, 
    Group,
    XButton,
    Box,
    Toast
  },
  data () {
    return {
      isShow: true,
      baseUrl:'http://invoice.rongecloud.com/admin',
      name:'',//客户经理姓名
      tel:'',//客户经理电话
      branchCode:'',//客户经理机构编码
      identity:'',//客户经理身份证号
      //企业用户
      companyName:'',//企业名称
      licenseNo:'',//工商营业执照号码
      address:'',//地址
      linkMan:'',//联系人
      phone:'',//电话
      legalBody:'',//法人
      openId:JSON.parse(window.localStorage.getItem('infomation')).openId
    }
  },
  methods:{
      showCompany(){
        this.isShow = true;
      },
      showManager(){
        this.isShow = false;
      },
      //客户经理信息完善
      magagerSubmit(){
        let valid = true;
    
        if(this.name == ''){
          this.$refs.name.onBlur();
          valid = false;
        }else{
          //当姓名不为空，但未通过验证
          if(!this.$refs.name.valid){
            valid = false;
          }
        }
  
        if(this.branchCode == ''){
          this.$refs.branchCode.onBlur();
          valid = false;
        }
        if(this.identity == ''){
          this.$refs.identity.onBlur();
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
        if(valid){
          console.log('全部填写完毕，验证成功')
          this.$http({
            method:'post',
            url:this.baseUrl+'/custommanager/custommanager/create',
            params:{
              'name': this.name,
              'cardId':this.identity,
              'phone':this.tel,
              'branchCode':this.branchCode,
              'openId':this.openId
              }
            //路由跳转 link="/user"
                    
          }).then((data)=>{
            // console.log(data);
            if(data.data.ret == 0){
              this.$vux.toast.text('保存成功');
              if(window.localStorage){
                localStorage.setItem("customManagerId",JSON.stringify(data.data.data))
              }
              //验证成功之后跳转路由
              setTimeout(()=>{
                this.$router.push({path:'/'})
              },2000)   
            }
          }).catch((err)=>{
            this.$vux.toast.text('保存失败'); 
          })
          
        }

      },
      //企业客户信息完善
      companySubmit(){
        let companyValid = true;

        if(this.companyName == ''){
          this.$refs.companyName.onBlur();
          companyValid = false;
        }else{
          //当姓名不为空，但未通过验证
          if(!this.$refs.companyName.valid){
            companyValid = false;
          }
        }
  
        if(this.licenseNo == ''){
          this.$refs.licenseNo.onBlur();
          companyValid = false;
        }
        if(this.address == ''){
          this.$refs.address.onBlur();
          companyValid = false;
        }
      
        if(this.linkMan == ''){
          this.$refs.linkMan.onBlur();
          companyValid = false;
        }else{
          //当姓名不为空，但未通过验证
          if(!this.$refs.linkMan.valid){
            companyValid = false;
          }
        }


        if(this.legalBody == ''){
          this.$refs.legalBody.onBlur();
          companyValid = false;
        }
        //当电话号码为空
        if(this.phone == ''){
          this.$refs.phone.onBlur();
          companyValid = false;
        }else{
          //当电话号码不为空，但未通过验证
          if(!this.$refs.phone.valid){
            companyValid = false;
          }
        }
        if(companyValid){
          console.log('全部填写完毕，验证成功')
          this.$http({
            method:'post',
            url:this.baseUrl+'/custom/custom/create',
            params:{
              'name': this.companyName,
              'licenseNo':this.licenseNo,
              'address':this.address,
              'linkMan':this.linkMan,
              'phone':this.phone,
              'legalBody':this.legalBody,
              'openId':this.openId
            }
                    
            }).then((data)=>{
              // console.log(data)
              if(data.data.ret == 0){
                this.$vux.toast.text('保存成功'); 
                if(window.localStorage){
                  localStorage.setItem("customId",JSON.stringify(data.data.data))
                } 
                //验证成功之后跳转路由
                setTimeout(()=>{
                  this.$router.push({path:'/'})
                },2000)         
              }
            }).catch((err)=>{
              // console.log(err)
              this.$vux.toast.text('保存失败');
            })
          
        }
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
