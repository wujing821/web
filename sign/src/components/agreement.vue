<template>
  <div class="agreement">
    <x-header>服务协议</x-header>
    <div class="container" v-html='datalist'>
        <!-- <h2>一.关于签约说明</h2>
        <h4>1.关于签约</h4>
        <p>签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约</p>
        <h2>二.关于签约说明</h2>
        <h4>1.关于签约</h4>
        <p>签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约</p>
        <h2>三.关于签约说明</h2>
        <h4>1.关于签约</h4>
        <p>签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约签约</p> -->

    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
  name: 'agreement',
  components: {
    XHeader
  
  },
  data () {
    return {
      datalist:'',
      baseUrl:'http://invoice.rongecloud.com/admin'
    }
  },
  mounted(){
        var that = this //更改this指向
        this.$http({
            method:"get",
            url: this.baseUrl + "/serviceagreedoc/serviceagreedoc/agreeAjaxList",
            params:{"type" : "01"},
            
        }).then((data)=>{
            console.log(data)
            if(data.data.ret === 0){
                this.datalist = data.data.data[0].content
            }
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
    .container{
        h2{
            font-weight: normal;
            font-size: 18px;
            text-align: left;
        }
        h4{
            font-weight: normal;
            font-size: 16px;
            text-align: left;
            
        }
        p{
            font-size: 14px;
            text-align:justify; 
        }
    }


</style>
