<template>
  <div class="container">
    <div class="settings-table">
      <h2>Настройки таблицы отчётов</h2>
      <div class="settings-body">
        <configuration-table />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ConfigurationTable from "@/components/settings-table/ConfigurationTable.vue";
export default {
  name: "SettingsReport",
  components: {
    ConfigurationTable,
  },

  setup(): Record<string, any> {
    const tableCols = [
      {
        title: "Название",
        name: "title",
      },
      {
        title: "Описание",
        name: "description",
      },
      {
        title: "Статус отчёта",
        name: "status",
      },
    ];

    return {};
  },
};
</script>

<style lang="scss" scoped>
.settings-table {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.settings-body {
  border: 1px solid grey;
  width: 80%;
  padding: 20px;
}
</style>
