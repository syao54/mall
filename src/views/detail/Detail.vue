<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="wrapper"
            :probe-type="3"
            ref="scroll1">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <DetailBaseInfo :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      gi<detail-param-info :param-info="goodsParam"/>
      <detail-comment-info :comment-info="commentInfo"/>

    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComps/DetailNavBar";
import {getDetail, Goods, Shop,GoodsParam} from "network/detail";
import DetailSwiper from "views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "views/detail/childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "views/detail/childComps/DetailCommentInfo";

export default {
  name: "Detail",
  components: {
    DetailCommentInfo,
    DetailParamInfo, DetailGoodsInfo, Scroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar},
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      goodsParam:{},
      commentInfo: {}
    }
  },
  methods:{
    detailImageLoad(){
      this.$refs.scroll1.refresh();
      console.log("????????????");
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result;
        //获取顶部的图片
        this.topImages = data.itemInfo.topImages;
        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //创建店铺信息对象
        this.shopInfo = new Shop(data.shopInfo)
        //保存商品的详情信息
        this.detailInfo = data.detailInfo;
        //获取商品参数信息
        this.goodsParam = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //取出评论信息
        if(data.rate.cRate !==0 )
        {
          this.commentInfo=data.rate.list[0]
        }

      }
    )
  },
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: white;
  height: 100vh
}

.wrapper {
  /*100%是相对于父元素的高度*/
  height: calc(100% - 44px);
  overflow: hidden;
}

</style>
