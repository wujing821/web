<template>
  <div class="user">
    <x-header>个人中心<router-link slot="right" to="/info" class="link">设置</router-link></x-header>
    <div class="userContainer">
        <div class="userCont">
            <div class="userImg">
                <img src="./../assets/logo.png" alt="">
            </div>
            <p>张三</p>
        </div>
    </div>
    <card :header="{title: '签约情况'}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>11</span>
          <br/>
          {{ '本月签约' }}
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/>
          {{ '共签约' }}
        </div>
      </div>
    </card>
    <group title="签约列表">
      <cell-box is-link link="/detail">签约单位1，签约产品：123</cell-box>
      <cell-box is-link link="/detail">签约单位1，签约产品：123</cell-box>
      <cell-box is-link link="/detail">签约单位1，签约产品：123</cell-box>
      <cell-box is-link link="/detail">签约单位1，签约产品：123</cell-box>
    </group>
    <box gap="10px 10px">
        <x-button type="primary" link="/info">设置</x-button>
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
      
    }
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
