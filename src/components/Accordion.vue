<template>
  <div class="accordion">
    <div class="accordion__body" :class="!isShow ? 'hidden' : ''">
      <slot />
    </div>
    <div class="accordion__footer" @click="toggleAccordion">
      <span class="accordion-button">{{ isShow ? "Свернуть" : title }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "Accordion",

  props: {
    title: {
      type: String,
      default: "Развернуть",
    },
  },

  setup() {
    let isShow = ref(false);
    const toggleAccordion = () => {
      isShow.value = !isShow.value;
    };

    return {
      isShow,
      toggleAccordion,
    };
  },
});
</script>

<style lang="scss" scoped>
.accordion {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 35px;
  width: 100%;

  &__footer {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
    margin-left: 5px;
  }

  &__body {
    padding-left: 5px;
  }
}

.accordion-button {
  background: deepskyblue;
  color: white;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
}

.hidden {
  display: none;
}
</style>
