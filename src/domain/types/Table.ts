export type TableCol = {
  id: number | string;
  title: string;
  name: string;
  fixed?: boolean;
};

export type Reports = Report[];

export type Report = Record<string, any>;

export type ParentId = number | string | null;
