<template>
  <div class="table">
    <div class="table__head">
      <div class="row">
        <div class="col">
          ID
        </div>
        <div
          class="col"
          v-for="(col, indexTable) in options.cols"
          :key="indexTable"
        >
          {{ col.title }}
        </div>
      </div>
    </div>
    <div class="table__body">
      <div class="table__report">
        <report
          v-for="(report, index) in reports"
          :key="index"
          :report="report"
          :index="index + 1"
          :options="options"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Report from "@/components/Report.vue";

export default {
  name: "ReportsTable",
  components: {
    Report,
  },
  props: ["reports", "options"],

  setup(): Record<string, any> {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border: 1px solid grey;
  padding: 32px;

  &__head {
    border-bottom: 1px solid gray;
    margin-bottom: 20px;
    padding-left: 5px;
    min-width: 100%;
  }

  &__body {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    min-width: 100%;
    justify-content: space-between;
  }

  .col {
    width: 350px;
    text-align: left;
    padding: 5px;
  }
}
</style>
