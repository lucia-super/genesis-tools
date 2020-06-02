<template>
  <div class="container">
    <div>Detail PAGE</div>
    {{ this.detail }}
    <div>
      <a href="javascript:void(0);" @click="onBack()">back</a>
    </div>
    <div>
      <a href="javascript:void(0);" @click="gotoEdit()">edit</a>
    </div>
  </div>
</template>
<script>
import BaseDetail from "@/base/BaseDetail";

export default {
  extends: BaseDetail,
  methods: {
    initialize() {
      this.moduleType = "@MODULE_PLACEHOLDER";
      this.fetchDetail(1);
    },
    /**
     * 默认的去编辑页面
     */
    gotoEdit(item) {
      this.$router.push({ name: this.moduleType + "Edit", params: { item } });
    }
  }
};
</script>
