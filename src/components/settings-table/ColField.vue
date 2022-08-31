<template>
  <div
    class="col-field"
    :class="col.fixed ? 'col-field--fixed' : ''"
    :style="{ borderLeft: `5px solid ${isSort ? 'yellow' : 'deepskyblue'}` }"
  >
    <el-form-item label="Название колонки" class="col-field__input">
      <el-input
        :disabled="isSort"
        label-width="150px"
        v-model="title"
        @input="onInputTitle"
      />
    </el-form-item>
    <el-form-item label="Имя поля" class="col-field__input">
      <el-input :disabled="isSort" v-model="name" @input="onInputName" />
      <small class="error-message">{{ errorNameMessage }}</small>
    </el-form-item>
    <div class="sort-icon" v-if="isSort">
      <el-icon>
        <Grid />
      </el-icon>
    </div>
    <el-button v-else type="danger" circle @click="$emit('delete-col', col.id)">
      <el-icon style="vertical-align: middle">
        <Delete />
      </el-icon>
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Delete, Grid } from "@element-plus/icons-vue";

export default defineComponent({
  name: "ColField",
  components: {
    Delete,
    Grid,
  },

  props: {
    isSort: {
      type: Boolean,
      default: false,
    },

    col: {
      type: Object,
      required: true,
    },

    reservedWords: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const title = ref(props.col.title);
    const name = ref(props.col.name);
    let errorNameMessage = ref("");

    const onInputTitle = (title: string) => {
      if (title) {
        emit("change-col-title", props.col.id, title);
      }
    };

    const onInputName = (name: string) => {
      if (errorNameMessage.value.length === 0) {
        emit("change-col-name", props.col.id, name);
      }
    };

    watch(name, () => isNameValid());

    const isNameValid = () => {
      if (props.reservedWords.includes(name.value)) {
        errorNameMessage.value = "Имя поля зарезервированно";
      } else {
        errorNameMessage.value = "";
      }
    };

    return {
      onInputTitle,
      onInputName,
      name,
      title,
      errorNameMessage,
    };
  },
});
</script>

<style lang="scss" scoped>
.error-message {
  color: red;
  width: 200px;
}

.col-field {
  opacity: 1;
  margin-bottom: 7px;
  margin-right: 25px;
  display: flex;
  background: white;
  animation: delayShow 0.2s;
  padding: 5px 10px;
  border: 1px solid rgba(191, 191, 191, 0.2);

  &--fixed {
    pointer-events: none;
    opacity: 0.3;
  }

  &__input {
    margin: 5px 10px;
    height: 50px;
    display: flex;
    align-items: flex-start;
    width: 50%;
  }
}

.delete-icon {
  cursor: pointer;
  width: 18px;
}

.sort-icon {
  margin-right: 10px;
  cursor: pointer;
  opacity: 0.3;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
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
