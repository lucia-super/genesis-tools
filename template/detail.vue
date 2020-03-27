<template>
  <div class="container">
    {{ this.detail }}
  </div>
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
