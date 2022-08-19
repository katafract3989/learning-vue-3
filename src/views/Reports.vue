<template>
  <div class="container">
    <div class="reports">
      <div class="reports__header">
        <h1>Ваши отчёты</h1>
        <router-link to="/settings-report">
          <img
            class="settings-icon"
            src="@/assets/icon/svg/options.svg"
            alt=""
          />
        </router-link>
      </div>

      <div class="report-table">
        <reports-table :reports="reports" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import ReportsTable from "@/components/ReportsTable.vue";
import useStore from "@/store";
export default defineComponent({
  components: {
    ReportsTable,
  },

  setup() {

    const pinia = useStore();

    const reports = [

      {
        id: 2,
        title: "Я родительский компонент",
        description:
          "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
        childs: [
          {
            id: 3,
            title: "Я дочерний компонент 1",
            description:
              "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
            childs: [
              {
                id: 4,
                title: "Разиваем недоразвитость 2",
                description:
                  "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                childs: [
                  {
                    id: 5,
                    title: "Разиваем недоразвитость 3",
                    description:
                      "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                    childs: null,
                  },
                  {
                    id: 6,
                    title: "Разиваем недоразвитость 4",
                    description:
                      "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                    childs: [
                      {
                        id: 7,
                        title: "Разиваем недоразвитость 5",
                        description:
                          "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                        childs: null,
                      },
                      {
                        id: 8,
                        title: "Разиваем недоразвитость 6",
                        description:
                          "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                        childs: null,
                        actions: "Пёс бездомный",
                      },
                    ],
                  },
                ],
              },
              {
                id: 9,
                title: "Разиваем недоразвитость 8",
                description:
                  "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                childs: null,
              },
            ],
          },
        ],
      },

    ];

    return {
      reports: computed(() => reports),
    };
  },
});
</script>

<style lang="scss" scoped>
.reports {
  &__header {
    display: flex;
    align-items: center;
  }
}

.settings-icon {
  margin-left: 10px;
  width: 26px;
  opacity: 0.5;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}
</style>
