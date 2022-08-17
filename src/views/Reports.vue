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
        <reports-table :reports="reports" :options="tableOptions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ReportsTable from "@/components/ReportsTable.vue";

export default {
  components: {
    ReportsTable,
  },

  setup(): Record<string, any> {
    const reports = [
      {
        id: 1,
        title: "Разиваем недоразвитость",
        description:
          "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
        childs: null,
        status: "Принято",
      },
      {
        id: 2,
        title: "Я родительский компонент",
        description:
          "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
        childs: [
          {
            id: 3,
            title: "Я дочерний компонент",
            description:
              "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
            childs: [
              {
                id: 4,
                title: "Разиваем недоразвитость",
                description:
                  "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                childs: [
                  {
                    id: 5,
                    title: "Разиваем недоразвитость",
                    description:
                      "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                    childs: null,
                  },
                  {
                    id: 6,
                    title: "Разиваем недоразвитость",
                    description:
                      "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                    childs: [
                      {
                        id: 7,
                        title: "Разиваем недоразвитость",
                        description:
                          "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                        childs: null,
                      },
                      {
                        id: 8,
                        title: "Разиваем недоразвитость",
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
                title: "Разиваем недоразвитость",
                description:
                  "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
                childs: null,
              },
            ],
          },
        ],
      },

      {
        id: 10,
        title: "Разиваем недоразвитость",
        description:
          "Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).Опция setup должна быть функцией, которая принимает аргументами props и context (о которых подробнее поговорим дальше).",
        childs: null,
      },
    ];

    const tableOptions = {
      cols: [
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
      ],
    };

    return {
      reports,
      tableOptions,
    };
  },
};
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
