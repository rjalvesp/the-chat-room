import { Message, MessageBody } from "@sellia/types/messages";
import { PaginateParams } from "@sellia/types/pagination";
import { api } from "@sellia/utils/api";
import { mergeDeepRight } from "ramda";

const entity = "messages";

export const MessagesService = {
  Send: (message: MessageBody) => api.post(`${entity}`, message),
  GetPrevious: (params: PaginateParams): Promise<Message[]> =>
    api
      .post(`/${entity}/search`, mergeDeepRight(params, { limit: 10 }))
      .then((response) => response.data),
};
