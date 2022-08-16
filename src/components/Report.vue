<template>
  <div class="report-wrapper">
    <div class="report">
      <div class="row">
        <div class="col">{{ reportIndex }}</div>

        <div
          class="col"
          v-for="(colName, indexColTable) in reportCols"
          :key="indexColTable"
        >
          {{ report[colName] }}
        </div>
      </div>
    </div>
    <div class="hidden-reports">
      <accordion
        v-if="report.childs !== null"
        :title="`Показать ещё ${report.childs.length}`"
      >
        <report
          v-for="(childReport, childIndex) in report.childs"
          :key="childIndex"
          :report="childReport"
          :parentIndex="reportIndex"
          :index="childIndex + 1"
          :options="options"
        />
      </accordion>
    </div>
  </div>
</template>

<script lang="ts">
import Accordion from "@/components/Accordion.vue";
import TableConfig from "@/domain/models/TableConfig";
import { computed } from "vue";

export default {
  name: "Report",
  props: ["report", "index", "parentIndex", "options"],
  components: {
    Accordion,
  },
  setup(props: {
    options: TableConfig;
    index: number | string;
    parentIndex: number | string;
  }): Record<string, any> {
    const reportCols = props.options.cols.map((col) => col.name);

    const reportIndex = computed(() => {
      const currentIndex = props.index;
      const parentIndex = props.parentIndex;
      return parentIndex ? `${parentIndex}.${currentIndex}` : currentIndex;
    });

    return {
      reportIndex,
      reportCols,
    };
  },
};
</script>

<style lang="scss" scoped>
.report-wrapper {
  margin-bottom: 10px;
  border-left: 5px solid deepskyblue;
}

.report {
  margin-bottom: 5px;
  width: 100%;
  background: #3b3b3b;
  color: white;

  overflow: hidden;
}

.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.col {
  width: 350px;
  text-align: left;
  padding: 5px;
}

.hidden-reports {
  width: 100%;
}
</style>
