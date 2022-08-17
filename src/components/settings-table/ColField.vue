<template>
  <div class="col-field">
    <div class="col-field__head">
      <div>
        <span>Колонка №{{ index }}.</span>
      </div>
      <div @click="deleteCol(col.id)">
        <img class="delete-icon" src="@/assets/icon/svg/trash.svg" alt="" />
      </div>
    </div>
    <div class="col-field__body">
      <div class="col-field-input">
        <custom-input
          label="Название колонки"
          @change-input="onInputTitle"
          :value="col.title"
        />
      </div>
      <div class="col-field-input">
        <custom-input
          label="Имя поля"
          :value="col.name"
          @change-input="onInputName"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CustomInput from "@/components/ui/CustomInput.vue";

export default {
  name: "ColField",
  components: {
    CustomInput,
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

  setup(
    props: { col: Record<string, string | number> },
    context: any
  ): Record<string, any> {
    const deleteCol = () => {
      context.emit("delete-col", props.col.id);
    };

    const onInputTitle = (title: string) => {
      context.emit("change-col-title", props.col.id, title);
    };

    const onInputName = (name: string) => {
      context.emit("change-col-name", props.col.id, name);
    };

    return {
      deleteCol,
      onInputTitle,
      onInputName,
    };
  },
};
</script>

<style lang="scss" scoped>
.col-field {
  width: 444px;
  padding: 10px;
  opacity: 1;
  animation: delayShow 0.2s;
  overflow: hidden;
  background: deepskyblue;

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
