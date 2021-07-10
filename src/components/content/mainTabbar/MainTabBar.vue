<template>
  <tab-bar>
    <tab-bar-item path="/Home">
      <!--具名插槽-->
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/home.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" alt="">
      </template>
      <template v-slot:item-text><div>首页</div></template>
    </tab-bar-item>
    <tab-bar-item path="/Category">
      <template v-slot:item-icon >
        <img src="~assets/img/tabbar/category.svg" alt="">
      </template>
      <template v-slot:item-icon-active >
        <img src="~assets/img/tabbar/category_active.svg" alt="">
      </template>
      <template v-slot:item-text><div>目录</div></template>
    </tab-bar-item>

    <tab-bar-item path="/Cart">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/cart.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/cart_active.svg" alt="">
      </template>
      <template v-slot:item-text><div>购物车</div></template>
    </tab-bar-item>

    <tab-bar-item path="/Profile">
      <template v-slot:item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt="">
      </template>
      <template v-slot:item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" alt="">
      </template>
      <template v-slot:item-text><div>我的</div></template>
    </tab-bar-item>
    <!--      <tab-bar-item>-->
    <!--        <template v-slot:item-icon>-->
    <!--          <img src="./assets/img/tabbar/profile.svg" alt="">-->
    <!--        </template>-->
    <!--        <template v-slot:item-text><div>我的</div></template>-->
    <!--      </tab-bar-item>-->
  </tab-bar>
</template>
<script>

import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from 'components/common/tabbar/TabBarItem';
export default {
  name: "MainTabBar",
  components: {
    TabBarItem,
    TabBar
  }
}
</script>
<style scoped>
</style>
