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
          fixed: false,
        },
        {
          id: 2 as string | number,
          title: "Описание",
          name: "description",
          fixed: false,
        },
      ] as TableCol[],
    },
    reports: [] as Report[],
  }),

  getters: {
    getCols: (state) => state.table.cols,

    getReports: (state) => state.reports,

    getColsTitles: (state) =>
      state.table.cols.map((col: TableCol) => col.title),

    getColsNames: (state) => state.table.cols.map((col: TableCol) => col.name),
  },

  actions: {
    saveCols(cols: Array<TableCol>) {
      this.table.cols = cols;
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
              return;
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
        _.forEach(reports, (report, index: number) => {
          if (report && report.id === id) {
            reports.splice(index, 1);
            return;
          } else if (report && report.childs.length > 0) {
            findReport(report.childs);
          }
        });
      };
      findReport(this.reports);
    },

    editReport(newReport: Report, id: string | number) {
      const findReport = (reports: Reports) => {
        _.forEach(reports, (report, index) => {
          if (report.id === id) {
            reports[index] = newReport;
          } else if (report.childs.length > 0) {
            findReport(report.childs);
          }
        });
      };
      findReport(this.reports);
    },
  },
});
