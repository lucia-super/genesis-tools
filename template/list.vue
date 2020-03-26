<template>
  <div class="container">
    <table width="100%" height="100px" border="1px">
      <tr v-for="item in listData" :key="item">
        <td>{{ item.key }}</td>
        <td>{{ item.value }}</td>
        <td>more</td>
      </tr>
    </table>
  </div>
</template>
<script>
  import baseList from "../../base/BaseList";

  export default {
    extends: baseList,
    methods: {
      initialize() {
        this.moduleType = "$placeholder";
        this.fetchList();
      }
    }
  };
</script>
