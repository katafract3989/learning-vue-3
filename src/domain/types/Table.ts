export type TableCol = {
  id: number | string;
  title: string;
  name: string;
  fixed?: boolean;
};

export type Reports = Array<Report>;

export type Report = Record<string, any>; // Todo расширить

export type ParentId = number | string | null;
