import r from "@renderer/utils/request";

const prefix = "rw/card";

export const cardItemAddReq = (cardId: string) =>
  r.request<R<boolean>>({
    url: `${prefix}/item/add`,
    method: "post",
    data: {
      cardId,
    },
  });

export const cardItemListReq = () =>
  r.request<R<{ cardId: string; userId: number }[]>>({
    url: `${prefix}/item/list`,
    method: "get",
  });
