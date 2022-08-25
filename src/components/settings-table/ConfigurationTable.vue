<template>
  <el-empty
    v-if="cols.length === 0"
    description="Добавьте новые поля для вашей таблицы"
    :image-size="200"
  />
  <div class="config-table">
    <div class="config-table__head" v-if="cols.length > 0">
      <el-switch
        v-model="isSortCol"
        class="ml-2"
        active-text="Сортировать"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      />
    </div>
    <div class="config-table__cols" v-if="isSortCol">
      <draggable v-model="cols" group="cols" item-key="id">
        <template #item="{ element }">
          <div draggable="false">
            <col-field
              :col="element"
              :is-sort="isSortCol"
              @delete-col="deleteCol"
              @change-col-title="changeTitle"
              @change-col-name="changeName"
            />
          </div>
        </template>
      </draggable>
    </div>
    <div class="config-table__cols" v-else>
      <col-field
        v-for="col in cols"
        :key="col.id"
        :col="col"
        :is-sort="isSortCol"
        @delete-col="deleteCol"
        @change-col-title="changeTitle"
        @change-col-name="changeName"
      />
    </div>

    <!--    <div class="preview-table" v-if="cols.length > 0">-->
    <!--      <table-preview :cols="cols" />-->
    <!--    </div>-->
  </div>
  <div class="footer">
    <div class="footer__button">
      <router-link to="/reports">
        <el-button type="info">К отчётам</el-button>
      </router-link>
    </div>
    <div class="footer__button">
      <el-button :disabled="checkChanges" type="primary" @click="saveSettings"
        >Сохранить</el-button
      >
    </div>
    <div class="footer__button">
      <el-button type="success" :disabled="isSortCol" @click="addCol" circle>
        <el-icon style="vertical-align: middle">
          <Plus />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ColField from "@/components/settings-table/ColField.vue";
// import TablePreview from "@/components/settings-table/TablePreview.vue";
import useStore from "@/store";
import { ElMessage } from "element-plus";
import draggable from "vuedraggable";
import _ from "lodash";
import { TableCol } from "@/domain/types/Table";

export default defineComponent({
  name: "ConfigurationTable",

  components: {
    ColField,
    // TablePreview,
    draggable,
  },

  setup() {
    const pinia = useStore();
    const cols = ref(_.cloneDeep(pinia.getCols));
    let isSortCol = ref(false);
    const addCol = () => {
      const col: TableCol = {
        id: _.uniqueId("new_col_"),
        title: "Новое поле",
        name: _.uniqueId("col_name_"),
      };
      cols.value.push(col);

      ElMessage({
        showClose: true,
        message: "Колонка добавлена",
        type: "warning",
        grouping: true,
      });
    };

    const deleteCol = (id: number | string) => {
      cols.value = _.filter(cols.value, (col) => col.id !== id);

      ElMessage({
        showClose: true,
        message: "Колонка удалена",
        type: "warning",
        grouping: true,
      });
    };

    const checkChanges = computed(() => {
      return _.isEqual(cols.value, pinia.getCols);
    });

    const changeTitle = (id: number, title: string) => {
      const col = _.find(cols.value, (col) => col.id === id);
      if (col) {
        col.title = title;
      }
    };

    const changeName = (id: number, name: string) => {
      const col = _.find(cols.value, (col) => col.id === id);
      if (col) {
        col.title = name;
      }
    };

    const saveSettings = () => {
      pinia.saveCols(cols.value);
    };

    return {
      cols,
      addCol,
      deleteCol,
      saveSettings,
      changeTitle,
      changeName,
      checkChanges,
      isSortCol,
    };
  },
});
</script>

<style lang="scss" scoped>
.config-table {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 40%;

  &__head {
    display: flex;
  }

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

.footer {
  display: flex;

  &__button {
    margin-right: 10px;
  }
}
</style>
