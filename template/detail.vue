<template>
  <div class="container">
    {{ this.detail }}
    <button type="button" @click="onBack()">back</button>
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
