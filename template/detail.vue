<template>
  <div class="container" />
</template>
<script>
  import BaseDetail from "../../base/BaseDetail";

  export default {
    extends: BaseDetail,
    methods: {
      initialize() {
        this.moduleType = "$placeholder";
        this.fetchDetail();
      }
    }
  };
</script>
