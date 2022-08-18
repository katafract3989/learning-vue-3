<template>
  <div>
    <button class="custom-button">{{ text }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CustomButton",
  props: {
    text: {
      type: String,
      default: "Кнопка",
    },
  },

});
</script>

<style lang="scss" scoped>
.custom-button {
  border: none;
  height: 50px;
  padding: 0 15px;
  font-size: 16px;
  background: deepskyblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
</style>
