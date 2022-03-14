import {ResponseBody} from "../request";
import {BasicDetail} from "./basic-detail";

export const RequestDataCache: Record<string, ResponseBody> = {
  ...BasicDetail
}
