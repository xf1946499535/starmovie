<template>
  <div class="show"><h1>暂未开放</h1></div>
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