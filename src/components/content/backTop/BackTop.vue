<template>
  <!--  <div class="back-top" @click="topClick">-->
  <div class="back-top">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods: {
    // topClick: function () {
    //   this.$emit('backTop');
    // }
  }
}
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 6px;
  bottom: 40px;
}

.back-top :deep() img {
  width: 43px;
  height: 43px;
}

</style>
