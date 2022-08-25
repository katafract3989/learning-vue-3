<template>
  <div>
    <el-form label-width="120px">
      <el-form-item v-for="col in cols" :key="col.id" :label="col.title">
        <el-input v-model="reportForm[col.name]" />
      </el-form-item>
    </el-form>
    <el-button type="success" @click="saveReport"
      >{{ reportEditId === null ? "Добавить" : "Изменить" }} отчёт</el-button
    >
    <pre>{{ reportEditId }}</pre>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import useStore from "@/store";
import { ElLoading } from "element-plus";
import { onMounted } from "vue";
import _ from "lodash";
import { Reports } from "@/domain/types/Table";

export default defineComponent({
  name: "ReportForm",

  props: {
    parentId: {
      type: [String, Number],
      default: null,
    },
    reportEditId: {
      type: [String, Number],
      default: null,
    },
  },

  setup(props, { emit }) {
    const pinia = useStore();
    const reportForm = ref({});
    const saveReport = () => {
      if (props.reportEditId !== null) {
        pinia.editReport(reportForm.value, props.reportEditId);
      } else {
        pinia.addReport(reportForm, props.parentId);
      }
      reportForm.value = {};
      emit("hide-modal");
      openLoader();
    };

    onMounted(() => findReport(pinia.getReports, props.reportEditId));

    const findReport = (reports: Reports, id: string | number | null) => {
      _.forEach(reports, (report) => {
        if (report.id === id) {
          reportForm.value = _.cloneDeep(report);
          return;
        } else if (report.childs.length > 0) {
          findReport(report.childs, id);
        }
      });
    };

    const openLoader = () => {
      const loading = ElLoading.service({
        lock: true,
        background: "rgba(0, 0, 0, 0.7)",
      });

      setTimeout(() => {
        loading.close();
      }, 300);
    };

    return {
      cols: computed(() => pinia.getCols),
      reportForm,
      saveReport,
    };
  },
});
</script>
