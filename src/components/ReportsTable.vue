<template>
  <div>
    <span @click="addModal">Добавить</span>

    <el-table :data="reports" style="width: 100%" :border="false">
      <el-table-column type="expand">
        <template #default="report">
          <div>
            <h2 v-if="report.row.childs">
              Вложенные отчёты
              <el-button type="success" circle @click="addModal">
                <el-icon style="vertical-align: middle">
                  <DocumentAdd />
                </el-icon>
              </el-button>
            </h2>
            <reports-table :reports="report.row.childs" />
            <modal
              v-if="isShowModalAdd"
              :title="`Добавить к отчёту (${report.row.title})`"
              @hide-modal="hideModal"
            >
              <report-form />
            </modal>
          </div>
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

  <!--  <div class="table">-->
  <!--    <div class="table__head">-->
  <!--      <div class="row">-->
  <!--        <div class="col">#</div>-->
  <!--        <div-->
  <!--          class="col"-->
  <!--          v-for="(title, indexTable) in colsTitles"-->
  <!--          :key="indexTable"-->
  <!--        >-->
  <!--          {{ title }}-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="table__body">-->
  <!--      <div class="table__report">-->
  <!--        <report-->
  <!--          v-for="(report, index) in reports"-->
  <!--          :key="index"-->
  <!--          :report="report"-->
  <!--          :index="index + 1"-->
  <!--          :cols="colsNames"-->
  <!--        />-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
// import Report from "@/components/Report.vue";
import useStore from "@/store";
import ReportsTable from "@/components/ReportsTable.vue";
import Modal from "@/components/ui/Modal.vue";
import ReportForm from "@/components/ReportForm.vue";
export default defineComponent({
  name: "ReportsTable",
  components: {
    // Report,
    ReportsTable,
    Modal,
    ReportForm,
  },
  props: {
    reports: {
      type: Array,
      default: () => [],
    },
  },

  setup() {
    const pinia = useStore();
    let isShowModalAdd = ref(false);
    const addModal = () => {
      isShowModalAdd.value = true;
    };

    const hideModal = () => {
      isShowModalAdd.value = false;
    };

    return {
      cols: computed(() => pinia.getCols),
      colsTitles: computed(() => pinia.getColsTitles),
      colsNames: computed(() => pinia.getColsNames),
      addModal,
      hideModal,
      isShowModalAdd,
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
</style>
