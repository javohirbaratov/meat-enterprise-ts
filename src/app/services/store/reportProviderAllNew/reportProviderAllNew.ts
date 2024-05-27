import { store_api } from "../../../../constants/api";
import { IApiRes, IDate } from "../../../../types/api";
import { api } from "../../api";

const STORE_REPORT_PROVIDER_ALL_NEW_TAG = "STORE_REPORT_PROVIDER_ALL_NEW_TAG";

// index
interface IStoreReportProviderAllNewResParams {
  date: IDate;
}

export interface IStoreReportProviderAllNewResListItem {
    debit: number,
    eski_qarz: number,
    fio: string,
    jamikredit: number,
    saldo: number,
}

interface IStoreReportProviderAllNewRes extends IApiRes {
  data: {
    jami_eski_qarz: number,
    jami_qarzdorlik: number,
    jamidebit: number,
    jamikredit: number,
    akt: IStoreReportProviderAllNewResListItem[]
  }
}


export const storeDebtApi = api
  .enhanceEndpoints({ addTagTypes: [STORE_REPORT_PROVIDER_ALL_NEW_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getReportProviderAllNew: build.query<IStoreReportProviderAllNewRes, IStoreReportProviderAllNewResParams>({
        query: ({ date }) => store_api.report_provider_all_new(date),
        providesTags: [STORE_REPORT_PROVIDER_ALL_NEW_TAG],
      }),
     
    }),
  });

export const { useGetReportProviderAllNewQuery } = storeDebtApi;
