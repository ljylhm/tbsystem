import { httpGet, httpPost,httpGetCommon } from "@/lib/http";
import { ModuleGoods } from "@/constance/goods";
import { IShopKeeper } from '@/constance/shop';

// 发布商品任务
export const publishNormalTask = (form:any) => {
    return httpPost("/api/task/add",form)
} 


// 计算商品的佣金和价格
export const getShopPrice = (form:any,task_type = 0) => {
    return httpPost("/api/task/stat",{
        ...form,
        task_type
    })
}