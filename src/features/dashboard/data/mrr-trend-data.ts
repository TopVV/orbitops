export interface MrrTrendItem {
  month: string;
  value: number;
}

export const MRR_TREND_DATA = [
  { month: "Feb", value: 142_000 },
  { month: "Mar", value: 149_500 },
  { month: "Apr", value: 157_200 },
  { month: "May", value: 166_400 },
  { month: "Jun", value: 175_100 },
  { month: "Jul", value: 184_600 },
] satisfies ReadonlyArray<MrrTrendItem>;
