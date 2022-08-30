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
            <div class="nested-reports__head">
              <h2>
                Вложенные отчёты
                <el-button
                  type="success"
                  circle
                  @click="addReport(report.row.id)"
                >
                  <el-icon style="vertical-align: middle">
                    <DocumentAdd />
                  </el-icon>
                </el-button>

                <el-button type="primary" @click="showSortModal">
                  <el-icon style="vertical-align: middle">
                    <Expand />
                  </el-icon>
                  Изменить порядок
                </el-button>
              </h2>
            </div>

            <reports-table
              :reports="report.row.childs"
              @add-report="addReport"
              @edit-report="editReport"
            />
            <el-dialog v-model="isShowSortModal" title="Shipping address">
              <draggable v-model="report.row.childs" group="reports" item-key="id">
                <div
                  v-for="element in report.row.childs"
                  :key="element.id"
                  class="item"
                >
                  1
                </div>
              </draggable>
            </el-dialog>
          </div>
          <el-empty v-else description="Вложенные отчёты отсутствуют">
            <el-button type="success" @click="addReport(report.row.id)">
              Добавить дочерний отчёт
            </el-button>
          </el-empty>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(col, indexTable) in pinia.getCols"
        :key="indexTable"
        :label="col.title"
        :prop="col.name"
      />

      <el-table-column
        :data="reports"
        fixed="right"
        label="Действия"
        width="120"
      >
        <template #default="report">
          <el-button
            link
            type="warning"
            size="small"
            @click="editReport(report.row.id)"
            >Изменить</el-button
          >
          <el-button
            link
            type="danger"
            size="small"
            @click="deleteReport(report.row.id)"
            >Удалить</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useStore from "@/store";
import ReportsTable from "@/components/ReportsTable.vue";
import { ParentId, Reports } from "@/domain/types/Table";
import draggable from "vuedraggable";

const ReportsTableComp: any = defineComponent({
  name: "ReportsTable",
  components: {
    ReportsTable,
    draggable,
  },

  props: {
    reports: {
      type: Array,
      default: () => [] as Reports,
    },
  },

  setup(props, { emit }) {
    const pinia = useStore();
    const isShowSortModal = ref(false);
    const addReport = (parentId: ParentId) => emit("add-report", parentId);
    const editReport = (id: string | number) => emit("edit-report", id);
    const deleteReport = (id: string | number) => pinia.deleteReport(id);
    const showSortModal = () => {
      isShowSortModal.value = true;
    };
    return {
      addReport,
      editReport,
      deleteReport,
      pinia,
      isShowSortModal,
      showSortModal,
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

  &__head {
    display: flex;
  }
}
</style>
