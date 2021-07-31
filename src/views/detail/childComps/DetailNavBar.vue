<template>
  <nav-bar>
    <template v-slot:left>
<!--      SLOT在父组件中设定样式必须加一层DIV包裹，否则会被替换掉-->
      <div class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="" />
      </div>
    </template>

    <template v-slot:center>
      <div class="title">
      <div v-for="(title,index) in titles" v-bind:key="index"
           :class="{active:index===currentIndex}"
           @click="itemClick(index)"
           class="title-item">
        {{title}}</div>
    </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {NavBar},
  data() {
    return {
      titles: ['商品','参数','评论','详情'],
      currentIndex:0,
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex=index
    },
    backClick(){
      this.$router.back()
    }
  }

}
</script>

<style scoped>
.active{
  color: #ff5777;
}
.title{
  display: flex;
  width: 100%;
  font-size: 13px;
}

.title-item{
/*float: left;*/
/*width: 25%;*/
  flex:1
}
.back img{
vertical-align: middle;
}


</style>
