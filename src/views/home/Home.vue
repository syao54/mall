<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物车</template>
    </nav-bar>
    <TabControl class="tab-control"
                :titles="titles"
                @tabClick="tabClick"
                ref="tabControl1" v-show="isTabFixed"/>
    <scroll class="wrapper"
            :pull-up-load="true"
            :probe-type="3"
            ref="scroll"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <feature-view></feature-view>
      <TabControl :titles="titles"
                  @tabClick="tabClick"
                  ref="tabControl2"/>

      <goodslist :goods="showGoods"></goodslist>
    </scroll>
    <back-top class="back-top" @click.enter="backTopClick" v-show="isShowBackTop">
      <img src="~assets/img/common/top.png" alt="">`
    </back-top>
  </div>
</template>
<script>

import HomeSwiper from "views/home/childComps/HomeSwiper";
import RecommendView from "views/home/childComps/RecommendView";
import FeatureView from "views/home/childComps/FeatureView";


import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Goodslist from "components/content/goods/Goodslist";
import Scroll from "components/common/scroll/Scroll"
import BackTop from "components/content/backTop/BackTop";

import {getHomeGoods, getHomeMultidata} from "network/home";

import bus from 'common/bus'
import {debounce} from "common/utils";
// import {onActivated, onDeactivated} from "@vue/runtime-core";




// import {getHomeData} from "network/home";
export default {
  name: "Home",
  components: {
    BackTop,
    Goodslist,
    TabControl,
    FeatureView,
    RecommendView,
    HomeSwiper,
    NavBar,
    Scroll,
  },
  data() {
    return {
      // results:null,
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY:0
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
  mounted() {
    //3.监听ITEM中图片加载完成,$refs在 CREATED中拿不到
    const refresh = debounce(this.$refs.scroll.refresh, 3000)
    bus.on('itemImageLoad', () => {
      refresh()
    })
    //4.获取 tabcontroll的offsetTop 元素可以直接拿到，组件是不可以的，没有这个属性
    //所有的组件都有一个属性$el:用于获取组件中的元素
    //this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop

  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated(){
    console.log('activated');
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh()
  },
    deactivated(){
      console.log('deactivated');
      this.saveY=this.$refs.scroll.getScrollY()
      console.log(this.saveY);
    },



  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        // this.result=res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1

      getHomeGoods(type, page).then(res => {
        console.log('======');
        this.goods[type].list.push(...res.data.list)
        // console.log(this.goods[type].list.length)
        this.goods[type].page += 1
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    backTopClick() {
      console.log("backTopClick----");
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    contentScroll(pos) {
      //1.判断backtop是否显示
      this.isShowBackTop = (-pos.y) > 1000
      //2.决定tabControl是否吸顶（position:fixed）
      this.isTabFixed=(-pos.y)>this.tabOffsetTop
      this.$refs.scroll.refresh()
    },
    loadMore() {
      console.log('上拉加载更多...');
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    }

  },

}
</script>
<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
  width:100vw;
  display: block;
  /*transform:none;*/

}

.home-nav {
  background-color: #ff8198;
  color: #F6F6F6;
  /*使用浏览器原生滚动时，为了让导航不跟随网页一起滚动*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.wrapper {
  /*height: 300px;*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}

/*.fixed{*/
/* position: fixed;*/
/*  left: 0;*/
/*  right:0;*/
/*  top:44px;*/
/*}*/

/*.content{*/
/*  height: calc(100% - 93px);*/
/*  margin-top: 44px;*/
/*  overflow: hidden;*/
/*}*/
.tab-control{
  position: relative;
  z-index: 1;
}
</style>
