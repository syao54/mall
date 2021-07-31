<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item,index) in topImages" v-bind:Key="index">
        <img :src="item" alt=""/>
      </swiper-item>
    </swiper>
</template>

<script>
import Swiper from "components/common/swiper/Swiper";
import SwiperItem from "components/common/swiper/SwiperItem";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {SwiperItem, Swiper}
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}

</style>
