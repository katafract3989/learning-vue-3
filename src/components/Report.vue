<template>
  <div class="report-wrapper">
    <div class="report">
      <div class="row">
        <div class="col">{{ reportIndex }}</div>
        <div
          class="col truncate"
          v-for="(colName, indexColTable) in cols"
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
          :cols="cols"
        />
      </accordion>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import Accordion from "@/components/Accordion.vue";

export default defineComponent({
  name: "Report",

  components: {
    Accordion,
  },

  props: {
    report: {
      type: Object,
      required: true,
    },

    cols: {
      type: Array,
      default: () => [],
    },

    index: {
      type: Number,
      required: true,
    },

    parentIndex: {
      type: [Number, String],
      default: null,
    },
  },

  setup(props) {
    const reportIndex = computed(() => {
      const { index, parentIndex } = props;
      return parentIndex ? `${parentIndex}.${index}` : index;
    });

    return {
      reportIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/scss/_variables.scss";


.report-wrapper {
  margin-bottom: 10px;
  border-left: 5px solid $blue-color;
}

.report {
  margin-bottom: 5px;
  width: 100%;
  background: $dark-color;
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
  -webkit-line-clamp: 4;
}

.hidden-reports {
  width: 100%;
}
</style>
