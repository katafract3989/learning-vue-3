import { defineStore } from "pinia";
import { uniqueId } from "lodash";
import { TableCol, Reports, Report, ParentId } from "@/domain/types/Table";

export const useStore = defineStore("main", {
  state: () => ({
    table: {
      cols: [
        {
          id: "col_nesting_level",
          title: "#",
          name: "index",
          fixed: true,
        },
        {
          id: "report-1",
          title: "Название",
          name: "title",
          fixed: false,
        },
        {
          id: "report-2",
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
        id: uniqueId("report-"),
        children: [] as Reports,
        parentId: null as ParentId,
      };

      if (parentId === null) {
        this.reports.push(newReport);
      } else {
        const findParent = (reports: Reports) => {
          reports.forEach((parent: Report) => {
            if (parent.id === parentId) {
              newReport.parentId = parentId;
              parent.children.push(newReport);
              return;
            } else if (parent?.children?.length > 0) {
              findParent(parent.children);
            }
          });
        };
        findParent(this.reports);
      }
    },

    deleteReport(id: string | number) {
      const findReport = (reports: Reports) => {
        reports.forEach((report, index: number) => {
          if (report && report.id === id) {
            reports.splice(index, 1);
            return;
          } else if (report?.children?.length > 0) {
            findReport(report.children);
          }
        });
      };
      findReport(this.reports);
    },

    editReport(newReport: Report, id: string | number) {
      const findReport = (reports: Reports) => {
        reports.forEach((report, index) => {
          if (report.id === id) {
            reports[index] = newReport;
          } else if (report?.children?.length > 0) {
            findReport(report.children);
          }
        });
      };
      findReport(this.reports);
    },

    async saveOrder(items: Reports, parentId: string | null) {
      if (parentId === null) {
        this.reports = items;
      } else {
        const findReport = (reports: Reports) => {
          reports.forEach((report) => {
            if (report?.id === parentId) {
              report.children = items;
              return;
            } else if (report?.children?.length > 0) {
              findReport(report.children);
            }
          });
        };
        await findReport(this.reports);
      }
    },
  },
});
