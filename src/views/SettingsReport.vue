<template>
  <div class="container">
    <div class="settings-table">
      <div class="settings-table__head">
        <h2>Настройки таблицы отчётов</h2>
      </div>
      <div class="settings-body">
        <configuration-table />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ConfigurationTable from "@/components/settings-table/ConfigurationTable.vue";
export default defineComponent({
  name: "SettingsReport",
  components: {
    ConfigurationTable,
  },
});
</script>

<style lang="scss" scoped>
.settings-table {
  display: flex;
  align-items: center;
  flex-direction: column;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
}

.settings-body {
  border-radius: 4px;
  width: 100%;
  padding: 20px;
}
</style>
