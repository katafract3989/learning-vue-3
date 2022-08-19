<template>
  <div class="col-field">
    <el-card class="box-card">
      <template #header>
        <div class="card-header col-field__head">
          <span>Колонка №{{ index }}.</span>
          <el-button type="danger" circle @click="$emit('delete-col', col.id)">
            <el-icon style="vertical-align: middle">
              <Delete />
            </el-icon>
          </el-button>
        </div>
      </template>

      <el-form inline>
        <el-form-item label="Название колонки">
          <el-input label-width="150px" v-model="title" @input="onInputTitle" />
        </el-form-item>
        <el-form-item label="Имя поля">
          <el-input v-model="name" @input="onInputName" />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Delete } from "@element-plus/icons-vue";
export default defineComponent({
  name: "ColField",
  components: {
    Delete,
  },

  props: {
    col: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  setup(props, { emit }) {
    let title = ref(props.col.title);
    let name = ref(props.col.name);

    const onInputTitle = (title: string) =>
      emit("change-col-title", props.col.id, title);

    const onInputName = (name: string) =>
      emit("change-col-name", props.col.id, name);

    return {
      onInputTitle,
      onInputName,
      name,
      title,
    };
  },
});
</script>

<style lang="scss" scoped>
.col-field {
  width: 444px;
  padding: 10px;
  opacity: 1;
  animation: delayShow 0.2s;

  &__body {
    display: flex;
  }

  &__head {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    width: 100%;
  }
}

.col-field-input {
  margin-right: 10px;
}

.delete-icon {
  cursor: pointer;
  width: 18px;
}

@keyframes delayShow {
  0% {
    opacity: 0;
    margin-left: -300px;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    margin-left: 0;
  }
}
</style>
