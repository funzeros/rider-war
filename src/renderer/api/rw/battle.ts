import r from "@renderer/utils/request";

const prefix = "rw/battle";

export const battleRecordsPageReq = (params: GObj) =>
  r.request<R<GObj>>({
    url: `${prefix}/records/page`,
    method: "get",
    params,
  });
