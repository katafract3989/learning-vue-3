<template>
  <div class="container">
    <div class="reports">
      <div class="reports__header">
        <h1>Ваши отчёты</h1>
        <router-link to="/settings-report">
          <img class="settings-icon" src="@/assets/icon/svg/options.svg" />
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
      </div>
      <div class="report-table">
        <reports-table
          :reports="reports"
          @add-report="addModal"
          @edit-report="editReport"
        />
      </div>
    </div>
  </div>

  <modal v-if="isShowModalAdd" title="Добавить отчёт" @hide-modal="hideModal">
    <report-form :parent-id="parentId" :report-edit-id="reportEditId" @hide-modal="hideModal" />
  </modal>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import ReportsTable from "@/components/ReportsTable.vue";
import useStore from "@/store";
import Modal from "@/components/ui/Modal.vue";
import ReportForm from "@/components/ReportForm.vue";
import { ParentId } from "@/domain/types/Table";

export default defineComponent({
  components: {
    ReportsTable,
    Modal,
    ReportForm,
  },

  setup() {
    const pinia = useStore();

    let parentId: Ref<ParentId> = ref(null);
    let reportEditId: Ref<number | string | null> = ref(null);

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
    };

    return {
      reports: computed(() => pinia.getReports),
      addModal,
      editReport,
      hideModal,
      isShowModalAdd,
      parentId,
      reportEditId,
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
