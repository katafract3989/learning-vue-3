<template>
  <h2 v-if="cols.length === 0">Добавьте новые поля для вашей таблицы</h2>
  <div class="config-table">
    <div class="config-table__cols">
      <col-field
        v-for="(col, index) in cols"
        :key="index"
        :col="col"
        :index="index + 1"
        @delete-col="pinia.deleteCol"
        @change-col-title="pinia.changeColTitle"
        @change-col-name="pinia.changeColName"
      />
    </div>

    <div class="preview-table" v-if="cols.length > 0">
      <table-preview :cols="cols" />
    </div>

    <div class="config-table__add-button">
      <custom-button text="Добавить поле" @click="pinia.addCol" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import ColField from "@/components/settings-table/ColField.vue";
import CustomButton from "@/components/ui/CustomButton.vue";
import TablePreview from "@/components/settings-table/TablePreview.vue";
import useStore from "@/store";

export default defineComponent({
  name: "ConfigurationTable",

  components: {
    ColField,
    CustomButton,
    TablePreview,
  },

  setup() {
    const pinia = useStore();
    return {
      cols: computed(() => pinia.getCols),
      pinia,
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
