<template>
  <el-empty
    v-if="cols.length === 0"
    description="Добавьте новые поля для вашей таблицы"
    :image-size="200"
  >
    <el-button type="primary" @click="addCol">Добавить поле</el-button>
  </el-empty>
  <div class="config-table">
    <div class="config-table__cols">
      <col-field
        v-for="(col, index) in cols"
        :key="index"
        :col="col"
        :index="index + 1"
        @delete-col="deleteCol"
        @change-col-title="pinia.changeColTitle"
        @change-col-name="pinia.changeColName"
      />
    </div>

    <div class="preview-table" v-if="cols.length > 0">
      <table-preview :cols="cols" />
    </div>

    <div
      class="config-table__add-button"
      v-if="cols.length > 0"
      @click="notifAdd"
    >
      <el-button type="primary" @click="addCol">Добавить поле</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import ColField from "@/components/settings-table/ColField.vue";
import TablePreview from "@/components/settings-table/TablePreview.vue";
import useStore from "@/store";
import { ElMessage } from "element-plus";
export default defineComponent({
  name: "ConfigurationTable",

  components: {
    ColField,
    TablePreview,
  },

  setup() {
    const pinia = useStore();

    const addCol = () => {
      pinia.addCol()
      ElMessage({
        showClose: true,
        message: "Колонка добавлена",
        type: "success",
        grouping: true,
      });
    };

    const deleteCol = (id: number | string) => {
      pinia.deleteCol(id);
      ElMessage({
        showClose: true,
        message: "Колонка удалена",
        type: "error",
        grouping: true,
      });
    };

    return {
      cols: computed(() => pinia.getCols),
      pinia,
      addCol,
      deleteCol,
    };
  },
});
</script>

<style lang="scss" scoped>
.config-table {
  display: flex;
  flex-wrap: wrap;

  &__cols {
    margin-bottom: 10px;
    max-height: 600px;
    overflow: auto;
  }

  &__add-button {
    margin: 30px 0;
    width: 100%;
  }
}

.preview-table {
  margin-left: 10px;
}
</style>
