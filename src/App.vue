<template>
  <div id="app0">
<!--    <keep-alive>-->
<!--      <router-view></router-view>-->
<!--    </keep-alive>-->

      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive"/>
      </RouterView>
    <main-tab-bar/>
  </div>

</template>


<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
 name:'app0',
 components:{
   MainTabBar
 }
}
</script>


<style>
@import "assets/css/base.css";
</style>
