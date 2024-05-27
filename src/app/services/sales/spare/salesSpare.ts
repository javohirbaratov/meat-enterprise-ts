import { sales_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

const AGENT_PURCHASE_TAG = "AGENT_PURCHASE_TAG";

interface ISaleSpareItem {
  id: string;
  article: string;
  barcode: string;
  name: string;
  soni: number;
  price: string;
  category_id: string;
}

interface ISaleSpareRes extends IApiRes {
  data: ISaleSpareItem[];
}

export const salesSpare = api
  .enhanceEndpoints({ addTagTypes: [AGENT_PURCHASE_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getSalesSpare: build.query<ISaleSpareRes, void>({
        query: () => sales_api.spare_get,
        providesTags: [AGENT_PURCHASE_TAG],
      }),
    }),
  });

export const { useGetSalesSpareQuery } = salesSpare;
