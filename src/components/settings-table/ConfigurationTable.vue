<template>
  <h2 v-if="cols.length === 0">Добавьте новые поля для вашей таблицы</h2>
  <div class="config-table">
    <div class="config-table__cols">
      <col-field
        v-for="(col, index) in cols"
        :key="index"
        :col="col"
        :index="index + 1"
        @delete-col="deleteCol"
        @change-col-title="changeColTitle"
        @change-col-name="changeColName"
      />
    </div>

    <div class="preview-table" v-if="cols.length > 0">
      <table-preview :cols="cols" />
    </div>

    <div class="config-table__add-button">
      <custom-button text="Добавить поле" @click="addCol" />
    </div>
    <custom-button text="Сохранить таблицу" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require("lodash");
import ColField from "@/components/settings-table/ColField.vue";
import CustomButton from "@/components/ui/CustomButton.vue";
import TableCol from "@/domain/models/TableCol";
import TablePreview from "@/components/settings-table/TablePreview.vue";

export default {
  name: "ConfigurationTable",
  components: {
    ColField,
    CustomButton,
    TablePreview,
  },

  setup(): Record<string, any> {
    let cols = ref([
      {
        id: 1,
        title: "Название",
        name: "title",
      },
      {
        id: 2,
        title: "Описание",
        name: "description",
      },
      {
        id: 3,
        title: "Статус отчёта",
        name: "status",
      },
    ]);

    const addCol = () => {
      const col = {
        id: _.uniqueId("new_col_"),
        title: "Новое поле",
        name: _.uniqueId("col_name_"),
      };
      cols.value.push(col);
    };

    const changeColTitle = (id: string | number, title: string): void => {
      const changeableCol = _.find(
        cols.value,
        (col: TableCol) => col.id === id
      );
      changeableCol.title = title;
    };

    const changeColName = (id: string | number, name: string): void => {
      const changeableCol = _.find(
        cols.value,
        (col: TableCol) => col.id === id
      );
      changeableCol.name = name;
    };

    const deleteCol = (id: number | string): void => {
      cols.value = _.filter(cols.value, (col: TableCol) => col.id !== id);
    };

    return {
      addCol,
      deleteCol,
      changeColTitle,
      changeColName,
      cols,
    };
  },
};
</script>

<style lang="scss" scoped>
.config-table {
  display: flex;
  flex-wrap: wrap;

  &__cols {
    display: flex;
    flex-direction: column !important;
    margin-bottom: 10px;
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
