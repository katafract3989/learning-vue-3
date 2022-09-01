<template>
  <div>
    <draggable
      v-model="items"
      group="reportsSort"
      item-key="id"
      class="draggable"
    >
      <template #item="{ element }">
        <div :key="element.id" class="item">
          <div class="preview-item">
            <span>ID:</span>
            <span> {{ element.id }}</span>
          </div>

          <div class="preview-item" v-if="element.title">
            <span>{{ element.title }}</span>
          </div>

          <div class="preview-item" v-if="element.description">
            <span>{{ element.description }}</span>
          </div>
        </div>
      </template>
    </draggable>

    <el-button type="primary" @click="saveOrder">Сохранить</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  name: "ReportSorter",
  components: {
    draggable,
  },

  props: {
    reports: {
      type: Array,
      default: () => [],
    },

    parentId: {
      type: String,
      default: null,
    },
  },

  setup(props, { emit }) {
    let items = ref(props.reports);

    const saveOrder = () => emit("save-order", items.value, props.parentId);

    return {
      saveOrder,
      items,
    };
  },
});
</script>

<style lang="scss" scoped>
.item {
  margin: 10px;
  border-left: 4px solid rgba(239, 239, 239, 0);
  padding: 10px;
  font-size: 16px;
  display: flex;
  cursor: pointer;
  transition: 1s;

  &:hover {
    border-left: 4px solid #0077ff;
  }
}

.preview-item {
  width: 30%;
  display: flex;
}

.draggable {
  margin-bottom: 20px;
}
</style>
