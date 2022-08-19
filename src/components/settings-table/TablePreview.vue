<template>
  <div class="preview-table">
    <table>
      <tr>
        <th v-for="(col, indexCol) in cols" :key="indexCol">{{ col.title }}</th>
      </tr>
      <tr>
        <td v-for="(col, indexTd) in cols" :key="indexTd">{{ col.name }}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TablePreview",
  props: {
    cols: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.preview-table {
  overflow-y: auto;
  max-width: 800px;
  border-bottom: 1px solid silver;

  table * {
    margin: 0;
    padding: 5px;
    text-align: left;
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
