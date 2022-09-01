<template>
  <div v-if="cols.length > 0">
    <el-form label-width="120px">
      <div v-for="col in cols" :key="col.id">
        <el-form-item :label="col.title">
          <el-input v-model="reportForm[col.name]" />
        </el-form-item>
      </div>
    </el-form>
    <el-button type="success" @click="saveReport"
      >{{ reportEditId === null ? "Добавить" : "Изменить" }} отчёт</el-button
    >
  </div>
  <div v-else style="width: 400px">
    <el-empty size="large" description="Поля отсутствуют. Настройте таблицу">
      <router-link to="/settings-report">
        <el-button type="primary">
          <el-icon size="large"> <Operation /> </el-icon>Настроить
          таблицу</el-button
        >
      </router-link>
    </el-empty>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import useStore from "@/store";
import { ElLoading } from "element-plus";
import { onMounted } from "vue";
import { cloneDeep } from "lodash";
import { Reports } from "@/domain/types/Table";
import { Operation } from "@element-plus/icons-vue";
export default defineComponent({
  name: "ReportForm",
  components: {
    Operation,
  },

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
      reports.forEach((report) => {
        if (report.id === id) {
          reportForm.value = cloneDeep(report);
          return;
        } else if (report.children.length > 0) {
          findReport(report.children, id);
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
      cols: computed(() => pinia.getCols.filter((col) => !col.fixed)),
      saveReport,
      reportForm,
    };
  },
});
</script>
