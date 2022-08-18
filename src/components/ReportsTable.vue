<template>
  <div class="table">
    <div class="table__head">
      <div class="row">
        <div class="col">#</div>
        <div
          class="col"
          v-for="(title, indexTable) in colsTitles"
          :key="indexTable"
        >
          {{ title }}
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
          :cols="colsNames"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Report from "@/components/Report.vue";
import useStore from "@/store";
export default defineComponent({
  name: "ReportsTable",
  components: {
    Report,
  },
  props: {
    reports: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const pinia = useStore();
    return {
      colsTitles: computed(() => pinia.getColsTitles),
      colsNames: computed(() => pinia.getColsNames),
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/scss/_variables.scss";

.table {
  width: 100%;
  border: $border-grey;
  padding: 32px;

  &__head {
    border-bottom: $border-grey;
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
