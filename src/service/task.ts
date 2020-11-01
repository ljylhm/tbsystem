import { httpGet, httpPost,httpGetCommon } from "@/lib/http";
import { ModuleGoods } from "@/constance/goods";
import { IShopKeeper } from '@/constance/shop';

// 发布商品任务
export const publishNormalTask = (form:any) => {
    return httpPost("/api/task/add",form)
} 