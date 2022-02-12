<template>
  <div class="billboard">
    <h1>暂未开放</h1>
    <div class="w"></div>
  </div>
</template>

<script>
import ct_log from "../tools/ct_log";
export default {
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      ct_log.logcheck(vm, to);
    });
  },
};
</script>

<style>
</style>