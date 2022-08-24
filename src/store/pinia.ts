import { defineStore } from "pinia";
import _ from "lodash";
import { TableCol, Reports, Report, ParentId } from "@/domain/types/Table";

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
    reports: [] as Array<Report>,
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

    addReport(report: Report, parentId: ParentId) {
      const newReport = {
        ...report.value,
        id: _.uniqueId("new_report_"),
        childs: [] as Reports,
        parentId: null as ParentId,
      };

      if (parentId === null) {
        this.reports.push(newReport);
      } else {
        const findParent = (reports: Reports) => {
          _.forEach(reports, (parent: Report) => {
            if (parent.id === parentId) {
              newReport.parentId = parentId;
              parent.childs.push(newReport);
            } else if (parent.childs.length > 0) {
              findParent(parent.childs);
            }
          });
        };
        findParent(this.reports);
      }
    },

    deleteReport(id: string | number) {
      const findReport = (reports: Reports) => {
        reports.forEach((report) => {
          if (report.id === id) {
            reports = reports.filter((item) => item.id !== id);
          } else if (report.childs.length > 0) {
            findReport(report.childs);
          }
        });
      };
      findReport(this.reports);
    },

    editReport() {
      // реализация изменение полей репорта
    },
  },
});
