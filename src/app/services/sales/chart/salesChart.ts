import { sales_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

export interface IChartListItem {
  id: number;
  article: string;
  barcode: string;
  name: string;
  soni: number;
  foiz: number;
}

interface IChartRes extends IApiRes {
  data: {
    jami: number;
    list: IChartListItem[];
  };
}

const SALES_CHART_TAG = "SALES_CHART_TAG";

export const salesChartApi = api
  .enhanceEndpoints({ addTagTypes: [SALES_CHART_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getSalesChart: build.query<IChartRes, void>({
        query: () => sales_api.chart_get,
      }),
    }),
  });

export const { useGetSalesChartQuery } = salesChartApi;
