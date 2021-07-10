<template>
 <div class="tab-bar-item" @click="itemClick">
<!--   所有ITEM都展示同一个图片和文字-->
<!--   <img src="../../assets/img/tabbar/home.svg">-->
<!--   <div>首页</div>-->
   <div v-if="!isActive"><slot  name="item-icon"></slot></div>
        <div v-else><slot  name="item-icon-active"></slot></div>
<!--设置属性都用DIV包裹一下，这样SLOT被替换掉时，DIV不变-->
<!--        <div :class="{active:isActive}"> <slot name="item-text"></slot> </div>-->
<!--   动态绑定样式，无法绑定class-->
   <div :style="activeStyle"> <slot name="item-text"></slot> </div>

</div>
</template>
<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'blueviolet'
    }
  },
  data(){
    return{
      // isActive:true 不能写死
    }
  },
  computed:{
    isActive(){
      // /Home-》item1(/Home) = true
      // /Home -> item1(/Category) = false ....
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      //path不能写死，要别人传进来
      this.$router.replace(this.path)
    }
  }
}
</script>
<!--采用SCOPED后，对组件A内采用的子组件，只会对其根元素加上组件A的标签，因此对子组件的根元素修改生效，对非根元素不生效-->
<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
</style>

<!--对子组件非根元素的样式修改要放在此处-->
<style>
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/*.active{*/
/*  color: blueviolet;*/
/*}*/
</style>
