<template>
  <div>
    <el-form label-width="120px">
      <el-form-item v-for="col in cols" :key="col.id" :label="col.title">
        <el-input v-model="reportForm[col.name]" />
      </el-form-item>
    </el-form>
    <el-button type="success" @click="addReport">Добавить отчёт</el-button>
    <pre>{{ reportForm }}</pre>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import useStore from "@/store";
export default defineComponent({
  name: "ReportForm",

  setup() {
    const pinia = useStore();

    const reportForm = ref({});
    const addReport = () => pinia.addReport(reportForm);
    return {
      cols: computed(() => pinia.getCols),
      reportForm,
      addReport,
    };
  },
});
</script>

<style scoped></style>
