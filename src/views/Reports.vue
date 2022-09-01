<template>
  <div class="container">
    <div class="reports">
      <div class="reports__header">
        <h1>Ваши отчёты</h1>
        <router-link to="/settings-report">
          <img
            class="settings-icon"
            src="@/assets/icon/svg/options.svg"
            alt="icon"
          />
        </router-link>
        <el-button
          type="success"
          circle
          @click="addModal(null)"
          style="margin-left: 10px"
        >
          <el-icon style="vertical-align: middle">
            <DocumentAdd />
          </el-icon>
        </el-button>
        <el-button
          :disabled="!reports.length"
          link
          type="primary"
          @click="showSortModal"
        >
          Изменить порядок
        </el-button>
      </div>
      <div class="report-table" v-loading="loading">
        <reports-table
          :reports="reports"
          @add-report="addModal"
          @edit-report="editReport"
          @save-order="saveOrder"
        />
      </div>
    </div>
  </div>

  <modal v-if="isShowModalAdd" title="Добавить отчёт" @hide-modal="hideModal">
    <report-form
      :parent-id="parentId"
      :report-edit-id="reportEditId"
      @hide-modal="hideModal"
    />
  </modal>

  <el-dialog v-model="isShowSortModal" title="Сортировка отчётов">
    <report-sorter :reports="reports" @save-order="saveOrder" />
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, onMounted, watch } from "vue";
import ReportsTable from "@/components/ReportsTable.vue";
import useStore from "@/store";
import Modal from "@/components/ui/Modal.vue";
import ReportForm from "@/components/ReportForm.vue";
import { ParentId, Report, Reports } from "@/domain/types/Table";
import ReportSorter from "@/components/ReportSorter.vue";

export default defineComponent({
  components: {
    ReportsTable,
    ReportSorter,
    Modal,
    ReportForm,
  },

  setup() {
    const pinia = useStore();
    const isShowSortModal = ref(false);
    const loading = ref(false);
    let parentId: Ref<ParentId> = ref(null);
    let reportEditId: Ref<number | string | null> = ref(null);
    let reports = ref(pinia.getReports);
    let isShowModalAdd = ref(false);

    const addModal = (id: ParentId = null) => {
      parentId.value = id;
      isShowModalAdd.value = true;
    };

    const editReport = (id: number | string) => {
      reportEditId.value = id;
      isShowModalAdd.value = true;
    };

    const hideModal = () => {
      parentId.value = null;
      reportEditId.value = null;
      isShowModalAdd.value = false;
      indexingReports();
    };

    const showSortModal = () => (isShowSortModal.value = true);

    const hideSortModal = () => (isShowSortModal.value = false);

    const saveOrder = (items: Reports, parentId: string) => {
      loading.value = true;
      hideSortModal();
      pinia.saveOrder(items, parentId).then(() => {
        reports.value = pinia.getReports;
        indexingReports();
        setTimeout(() => {
          loading.value = false;
        }, 1500);
      });
    };

    const indexingReports = () => {
      const recursivePassing = (
        list: Report[],
        parentIndex: ParentId = null
      ) => {
        list.forEach((item: Report, index: number) => {
          const currentIndex = index + 1;
          item.index =
            parentIndex !== null
              ? `${parentIndex}.${currentIndex}`
              : currentIndex;

          if (item.children.length > 0) {
            recursivePassing(item.children, item.index);
          }
        });
      };
      recursivePassing(reports.value);
    };

    onMounted(indexingReports);

    const getReports = computed(() => pinia.getReports);

    watch(getReports, () => {
      reports.value = getReports.value;
      indexingReports();
    });

    return {
      addModal,
      editReport,
      hideModal,
      showSortModal,
      saveOrder,
      reports,
      isShowModalAdd,
      parentId,
      reportEditId,
      isShowSortModal,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.reports {
  &__header {
    display: flex;
    align-items: center;
  }
}

.settings-icon {
  margin-left: 10px;
  width: 26px;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}
</style>
