<template>
  <div class="config-table">
    <div class="config-table__cols" v-for="(col, index) in cols" :key="index">
      <col-field
        :col="col"
        :index="index + 1"
        @delete-col="deleteCol"
        @change-col-title="changeColTitle"
        @change-col-name="changeColName"
      />
    </div>

<!--    <div class="preview-table">-->

<!--      <h2>Превью таблицы</h2>-->

<!--    </div>-->

    <div class="config-table__add-button">
      <custom-button text="Добавить поле" @click="addCol" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require("lodash");
import ColField from "@/components/settings-table/ColField.vue";
import CustomButton from "@/components/ui/CustomButton.vue";
import TableCol from "@/domain/models/TableCol";
export default {
  name: "ConfigurationTable",
  components: {
    ColField,
    CustomButton,
  },

  setup(): Record<string, any> {
    let cols = ref([
      {
        id: 1,
        title: "Название",
        name: "title",
      },
    ]);

    const addCol = () => {
      const col = {
        id: _.uniqueId("new_col_"),
        title: "Новое поле",
        name: "",
      };
      cols.value.push(col);
      console.log(cols.value[0]);
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
  //display: flex;
  //flex-wrap: wrap;

  &__cols {

    margin-bottom: 10px;
  }

  &__add-button {
    margin: 30px 0;
    width: 100%;
  }
}

.preview-table {
  min-width: 444px;
  margin-left: 50px;
  border: 1px solid grey;
}
</style>
