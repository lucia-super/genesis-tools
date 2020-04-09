<template>
  <div class="container">
    <div>Edit PAGE</div>
    {{ this.detail }}
    <a href="javascript:void(0);" @click="onBack()">back</a>
  </div>
</template>
<script>
  import BaseDetail from "../../base/BaseDetail";

  export default {
    extends: BaseDetail,
    methods: {
      initialize() {
        this.moduleType = "@placeholder";
        this.fetchDetail(1);
      },
    },
  };
</script>
