<template>
  <div class="modal-wrapper">
    <div class="modal">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <div class="card-header__title">
              <h3>{{ title }}</h3>
            </div>

            <el-button circle @click="$emit('hide-modal')">
              <el-icon style="vertical-align: middle">
                <Close />
              </el-icon>
            </el-button>
          </div>
        </template>
        <slot />
      </el-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Modal",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.modal-wrapper {
  position: fixed;
  background: rgba(59, 59, 59, 0.2);
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100 !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  max-width: 500px;
}

.card-header {
  display: flex;
  justify-content: space-between;

  &__title {
    max-width: 700px;
    margin-right: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
