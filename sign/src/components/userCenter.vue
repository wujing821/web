<template>
  <div class="user">
    <x-header>个人中心</x-header>
    <div class="userContainer">
        <div class="userCont">
            <div class="userImg">
                <img src="./../assets/img.jpg" alt="">
            </div>
            <p>张三</p>
        </div>
    </div>
    <card :header="{title: '签约情况'}"  v-if="showItemInfo">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span v-text='totalMonthCounts'></span>
          <br/>
          {{ '本月签约' }}
        </div>
        <div class="vux-1px-r">
          <span v-text='totalCounts'></span>
          <br/>
          {{ '共签约' }}
        </div>
      </div>
    </card>
    <group title="签约列表">
      <cell-box v-for="(item,index) in list" :key="index" is-link @click.native="showDetail(item.id)">签约单位<span v-text="item.name"></span>，签约产品：<span v-text="item.product_id"></span></cell-box>
      <!-- <cell-box is-link @click.native="showDetail">签约单位1，签约产品：123</cell-box> -->
      <!-- <cell-box is-link link="/detail">签约单位1，签约产品：123</cell-box> -->
      <!-- <cell-box is-link link="/detail">签约单位1，签约产品：123</cell-box> -->
    </group>
    
    <box gap="10px 10px">
        <x-button type="primary"  @click.native="modify">设置</x-button>
        <x-button type="primary"  @click.native="clear">测试</x-button>
    </box>
  </div>
</template>

<script>
import { XHeader,Group, Cell, CellBox,XButton, Box,Card} from 'vux'
export default {
  name: 'User',
  components: {
    XHeader,
    Group,
    Cell,
    CellBox,
    XButton, 
    Box,
    Card
  },
  data () {
    return {
      //注册用户id
      id:JSON.parse(window.localStorage.getItem('customId')?window.localStorage.getItem('customId'):window.localStorage.getItem('customManagerId')),
      totalMonthCounts:'',
      totalCounts:'',
      baseUrl:'http://invoice.rongecloud.com/admin',
      list:[],//签约列表
      showItemInfo:false
    }
  },
  methods:{
    //获取数据
    getData(){
      this.$http({
        method:'get',
        url:this.baseUrl+'/agreement/agreement/getAgreementList',
        params:{'registerId': this.id}//假数据   
                
      }).then((data)=>{
        console.log(data);
        if(data.data.ret == 0){
          this.totalMonthCounts = data.data.data.totalMonthCounts;
          this.totalCounts = data.data.data.totalCounts;    
          this.list = data.data.data.list; 
          if(data.data.data.list.length){
            if(data.data.data.list[0].channel == '1'){
              this.showItemInfo = true;
            }
          }
          
        }
      })
    },
    modify(){
      //根据userInfo判断客户经理,企业用户还是新用户
      let flag = true;
      //遍历localstorage里的key值
      for(var i=0;i<localStorage.length;i++){
          if(localStorage.key(i) === 'customManagerId'){
            if(localStorage.getItem('customManagerId') !== ''){
              console.log('客户经理');
              flag = false;
              this.$router.push({path:'/managerset'});
              
            }
          }else if(localStorage.key(i) === 'customId'){          
            if(localStorage.getItem('customId') !== ''){
              console.log('企业客户');
              flag = false;
              this.$router.push({path:'/companyset'});
              
            }
          }        
      }
      //localstorage里没有用户id，证明是新用户
      if(flag){
        console.log('新用户，未注册');
        this.$router.push({path:'/info'})
      }
    },
    //跳转详情页面
    showDetail(id){
      //带参数查询
      this.$router.push({path: '/detail', query: {id: id}});
      
    },
    clear(){
      // window.localStorage.clear();
      if(window.localStorage.getItem('customId')){
        localStorage.removeItem('customId');
      }else if(window.localStorage.getItem('customManagerId')){
        localStorage.removeItem('customManagerId');        
      }
    }
  },
  mounted(){
    this.getData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>

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

.userContainer{
    margin-top: 50px;
    .userCont{
        .userImg{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 0 auto;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .signNum{
        height: 50px;
        .signNumber{
            float: left;
            margin-left: 20px;
        }
        .signTotal{
            float: right;
            margin-right: 20px;
        }
    }
}

@import '~vux/src/styles/1px.less';

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
//链接跳转
.link{
  text-decoration: none;
}
</style>
