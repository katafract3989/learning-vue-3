<template>
  <div>
    <el-form label-width="120px">
      <el-form-item v-for="col in cols" :key="col.id" :label="col.title">
        <el-input v-model="reportForm[col.name]" />
      </el-form-item>
    </el-form>
    <el-button type="success" @click="addReport">Добавить отчёт</el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import useStore from "@/store";
import { ElLoading } from "element-plus";

export default defineComponent({
  name: "ReportForm",

  props: {
    parentId: {
      type: [String, Number],
      default: null,
    },
  },

  setup(props, { emit }) {
    const pinia = useStore();
    const reportForm = ref({});
    const addReport = () => {
      pinia.addReport(reportForm, props.parentId);
      reportForm.value = {};
      emit("hide-modal");
      openLoader();
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
      addReport,
    };
  },
});
</script>

