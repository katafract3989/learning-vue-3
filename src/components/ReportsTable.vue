<template>
  <div>
    <el-empty
      :image-size="400"
      v-if="reports.length === 0"
      description="Отчёты отсутствуют"
    >
      <el-button type="success" @click="addReport(null)">
        Добавить отчёт
      </el-button>
    </el-empty>

    <el-table v-else :data="reports" style="width: 100%" :border="false">
      <el-table-column type="expand">
        <template #default="report">
          <div class="nested-reports" v-if="report.row.childs.length > 0">
            <h2>
              Вложенные отчёты
              <el-button type="success" circle @click="addReport(report.row.id)">
                <el-icon style="vertical-align: middle">
                  <DocumentAdd />
                </el-icon>
              </el-button>
            </h2>
            <reports-table :reports="report.row.childs.length > 0" />
          </div>
          <el-empty v-else description="Вложенные отчёты отсутствуют">
            <el-button type="success" @click="addReport(report.row.id)">
              Добавить дочерний отчёт
            </el-button>
          </el-empty>
        </template>
      </el-table-column>

      <el-table-column
        v-for="(col, indexTable) in cols"
        :key="indexTable"
        :label="col.title"
        :prop="col.name"
      />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import useStore from "@/store";
import ReportsTable from "@/components/ReportsTable.vue";

const ReportsTableComp: any = defineComponent({
  name: "ReportsTable",
  components: {
    ReportsTable,
  },

  props: {
    reports: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const pinia = useStore();

    const addReport = (parentId: number | string | null) => {
      emit("add-report", parentId);
    };

    return {
      cols: computed(() => pinia.getCols),
      colsTitles: computed(() => pinia.getColsTitles),
      colsNames: computed(() => pinia.getColsNames),
      addReport,
    };
  },
});

export default ReportsTableComp;
</script>

<style lang="scss" scoped>
@import "../assets/styles/scss/_variables.scss";

.table {
  width: 100%;
  border: $border-grey;
  padding: 32px;
  min-height: 600px;

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

  &__footer {
    margin: 10px;
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

.nested-reports {
  margin-left: 20px;
}
</style>
