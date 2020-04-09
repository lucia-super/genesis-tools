<template>
  <div class="container">
    <div style="list-style: none; display: flex; margin: 20px;">
      <label>name: </label> <input type="text" :value="conditions.value" />
      <button type="button" @click="fetchList()">search</button>
    </div>

    <table width="100%" height="100px" border="1px">
      <tr v-for="(item, index) in listData" :key="item + index">
        <td>{{ item.key }}</td>
        <td>{{ item.value }}</td>
        <td>
          <a href="javascript:void(0);" @click="gotoDetail()">more</a>
        </td>
      </tr>
    </table>

    <ul style="list-style: none; display: flex;">
      <li>
        {{ pagination.page }}
      </li>
      <a href="javascript:void(0);" @click="onPageChange(pagination.page + 1)">
        下一页
      </a>
    </ul>
  </div>
</template>
<script>
  import baseList from "../../base/BaseList";

  export default {
    extends: baseList,
    data() {
      return {
        moduleType: "@placeholder",
        conditions: {
          value: "123",
        },
      };
    },
  };
</script>
