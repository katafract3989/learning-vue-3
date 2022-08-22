import { defineStore } from "pinia";
import _ from "lodash";
import { TableCol } from "@/domain/types/Table";
import reports from "@/mock/reports.json";

export const useStore = defineStore("main", {
  state: () => ({
    table: {
      cols: [
        {
          id: 1 as string | number,
          title: "Название",
          name: "title",
        },
        {
          id: 2 as string | number,
          title: "Описание",
          name: "description",
        },
      ],
    },
    reports: [] as Array<Record<string, any>>,
  }),

  getters: {
    getCols: (state) => state.table.cols,

    getReports: (state) => state.reports,

    getColsTitles: (state) =>
      state.table.cols.map((col: TableCol) => col.title),

    getColsNames: (state) => state.table.cols.map((col: TableCol) => col.name),
  },

  actions: {
    addCol() {
      const col: TableCol = {
        id: _.uniqueId("new_col_"),
        title: "Новое поле",
        name: _.uniqueId("col_name_"),
      };
      this.table.cols.push(col);
    },

    deleteCol(id: string | number) {
      this.table.cols = _.filter(
        this.table.cols,
        (col: TableCol) => col.id !== id
      );
    },

    changeColTitle(id: string | number, title: string) {
      const col = _.find(this.table.cols, (col: TableCol) => col.id === id);
      if (col) {
        col.title = title;
      }
    },

    changeColName(id: string | number, name: string) {
      const col = _.find(this.table.cols, (col: TableCol) => col.id === id);
      if (col) {
        col.name = name;
      }
    },

    addReport(report: Record<string, any>, parentId: number | string | null) {
      if (parentId === null) {
        this.reports.push({
          ...report.value,
          id: _.uniqueId("new_report_"),
          childs: [],
          parentId: null,
        });
      } else {
        // реализация поиска родителя и добавление отчёта как дочернего
      }
    },
  },
});
