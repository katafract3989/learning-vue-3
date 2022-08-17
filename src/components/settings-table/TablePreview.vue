<template>
  <div class="preview-table">
    <table>
      <tr>
        <th v-for="(col, indexCol) in cols" :key="indexCol">{{ col.title }}</th>
      </tr>
      <!--ряд с ячейками заголовков-->
      <tr>
        <td v-for="(col, indexTd) in cols" :key="indexTd">{{ col.name }}</td>
      </tr>
      <tr v-for="(col, indexTr) in cols" :key="indexTr">
        <td v-for="(col, indexTd) in cols" :key="indexTd"></td>
      </tr>
      <!--ряд с ячейками тела таблицы-->
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: "TablePreview",
  props: {
    cols: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-table {
  overflow-y: auto;
  max-width: 800px;

  table {
    background: deepskyblue;
  }

  table * {
    color: white;
    margin: 0;
    padding: 5px;
    text-align: left;
    border: 1px solid white;
  }
  th {
    min-width: 100px;
    font-weight: 600;
  }
  tr {
    min-height: 50px;
  }
  td {
    min-height: 100px;
  }
}
</style>
