import { store_api } from "../../../../constants/api";
import { IApiRes, IDate } from "../../../../types/api";
import { api } from "../../api";

const STORE_REPORT_PROVIDER_NEW_TAG = "STORE_REPORT_PROVIDER_NEW_TAG";

// index
interface IStoreReportProviderNewResParams {
  date: IDate;
  provider_id: string
}

export interface IStoreReportProviderNewResListItem {
    debit: number,
    dona: number,
    kredit: number,
    summa: string,
    key: number,
    vaqt: string,
}

interface IStoreReportProviderNewRes extends IApiRes {
  data: {
    jamidebit: number,
    jamidona: number,
    jamikredit: number,
    saldo: number,
    eski_balans: number,
    akt: IStoreReportProviderNewResListItem[]
  }
}


export const storeDebtApi = api
  .enhanceEndpoints({ addTagTypes: [STORE_REPORT_PROVIDER_NEW_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getReportProviderNew: build.query<IStoreReportProviderNewRes, IStoreReportProviderNewResParams>({
        query: ({ date, provider_id }) => store_api.report_provider_new(date, provider_id),
        providesTags: [STORE_REPORT_PROVIDER_NEW_TAG],
      }),
     
    }),
  });

export const { useGetReportProviderNewQuery } = storeDebtApi;
