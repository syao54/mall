<template>
  <div id="home">
  <nav-bar class="home-nav"><template v-slot:center>购物街</template></nav-bar>
  <home-swiper :banners="banners"></home-swiper>
    <RecommendView :recommends="recommends"></RecommendView>
    <feature-view></feature-view>
    <TabControl class="tab-control" :titles="titles"></TabControl>
    <li><img src="img/1.jpg" alt=""></li>
    <li><img src="img/2.jpg" alt=""></li>
    <li><img src="img/3.jpg" alt=""></li>
    <li><img src="img/4.jpg" alt=""></li>
    <li><img src="img/5.jpg" alt=""></li>
    <li><img src="img/6.jpg" alt=""></li>
    <li><img src="img/7.jpg" alt=""></li>
    <li><img src="img/8.jpg" alt=""></li>
    <li><img src="img/9.jpg" alt=""></li>
    <li><img src="img/10.jpg" alt=""></li>
    <li><img src="img/11.jpg" alt=""></li>
    <li><img src="img/12.jpg" alt=""></li>
    <li><img src="img/13.jpg" alt=""></li>
    <li><img src="img/14.jpg" alt=""></li>
    <li><img src="img/15.jpg" alt=""></li>
    <li><img src="img/16.jpg" alt=""></li>
    <li><img src="img/17.jpg" alt=""></li>
    <li><img src="img/18.jpg" alt=""></li>
    <li><img src="img/19.jpg" alt=""></li>
    <li><img src="img/20.jpg" alt=""></li>
    <li><img src="img/21.jpg" alt=""></li>
    <li><img src="img/22.jpg" alt=""></li>
    <li><img src="img/23.jpg" alt=""></li>
    <li><img src="img/24.jpg" alt=""></li>
    <li><img src="img/25.jpg" alt=""></li>
    <li><img src="img/26.jpg" alt=""></li>
    <li><img src="img/27.jpg" alt=""></li>
    <li><img src="img/28.jpg" alt=""></li>
    <li><img src="img/29.jpg" alt=""></li>
    <li><img src="img/30.jpg" alt=""></li>
    <li><img src="img/31.jpg" alt=""></li>
    <li><img src="img/32.jpg" alt=""></li>
    <li><img src="img/33.jpg" alt=""></li>
    <li><img src="img/34.jpg" alt=""></li>
    <li><img src="img/35.jpg" alt=""></li>
    <li><img src="img/36.jpg" alt=""></li>
    <li><img src="img/37.jpg" alt=""></li>
    <li><img src="img/38.jpg" alt=""></li>
    <li><img src="img/39.jpg" alt=""></li>
    <li><img src="img/40.jpg" alt=""></li>
    <li><img src="img/41.jpg" alt=""></li>
    <li><img src="img/42.jpg" alt=""></li>
    <li><img src="img/43.jpg" alt=""></li>
    <li><img src="img/44.jpg" alt=""></li>
    <li><img src="img/45.jpg" alt=""></li>
    <li><img src="img/46.jpg" alt=""></li>
    <li><img src="img/47.jpg" alt=""></li>
    <li><img src="img/48.jpg" alt=""></li>
    <li><img src="img/49.jpg" alt=""></li>
    <li><img src="img/50.jpg" alt=""></li>
    <li><img src="img/51.jpg" alt=""></li>
    <li><img src="img/52.jpg" alt=""></li>
    <li><img src="img/53.jpg" alt=""></li>
    <li><img src="img/54.jpg" alt=""></li>
    <li><img src="img/55.jpg" alt=""></li>
    <li><img src="img/56.jpg" alt=""></li>
    <li><img src="img/57.jpg" alt=""></li>
    <li><img src="img/58.jpg" alt=""></li>
    <li><img src="img/59.jpg" alt=""></li>
    <li><img src="img/60.jpg" alt=""></li>
    <li><img src="img/61.jpg" alt=""></li>
    <li><img src="img/62.jpg" alt=""></li>
    <li><img src="img/63.jpg" alt=""></li>
    <li><img src="img/64.jpg" alt=""></li>
    <li><img src="img/65.jpg" alt=""></li>
    <li><img src="img/66.jpg" alt=""></li>
    <li><img src="img/67.jpg" alt=""></li>
    <li><img src="img/68.jpg" alt=""></li>
    <li><img src="img/69.jpg" alt=""></li>
    <li><img src="img/70.jpg" alt=""></li>
    <li><img src="img/71.jpg" alt=""></li>
    <li><img src="img/72.jpg" alt=""></li>
    <li><img src="img/73.jpg" alt=""></li>
    <li><img src="img/74.jpg" alt=""></li>
    <li><img src="img/75.jpg" alt=""></li>
  </div>
</template>
<script>

import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";


import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

import {getHomeGoods,getHomeMultidata} from "network/home";




// import {getHomeData} from "network/home";
export default {
  name: "Home",
  components:{
    TabControl,
    FeatureView,
    RecommendView,
    HomeSwiper,
    NavBar,
  },
  data(){
    return {
      // results:null,
      banners:[],
      recommends:[],
      titles:["流行","新款","精选"],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      }
    }
  },
  //组件创建完发送网络请求
  //created中只写主要逻辑
  created() {
    //1.请求多个数据,不写this调用的是导入的函数
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods:{
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        console.log(res);
        // this.result=res;
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        console.log(res);
      })
    }
  }
}
</script>
<style scoped>
#home{
  padding-top: 44px;
}
.home-nav{
  background-color: #ff8198;
  color: #F6F6F6;
  position: fixed;
  left: 0;
  right: 0;
  top:0;
  z-index: 9;
}
.tab-control{
  position: sticky;
  top:44px;
}
</style>
