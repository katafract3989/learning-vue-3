<template>
  <div class="custom-input">
    <span class="custom-input__label" :style="{ color: color }">{{
      label
    }}</span>
    <input
      class="custom-input__input"
      type="text"
      :value="value"
      @input="$emit('change-input', $event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CustomInput",
  props: {
    label: {
      type: String,
      default: "Название поля",
    },

    value: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "black",
    },
  },
});
</script>

<style lang="scss" scoped>
.custom-input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__label {
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
  }

  &__input {
    border: 1px solid rgba(47, 47, 47, 0.56);
    outline: none;
    height: 30px;
    border-radius: 10px;
    padding: 0 10px;
    font-size: 16px;
    margin-top: 5px;
  }
}
</style>
