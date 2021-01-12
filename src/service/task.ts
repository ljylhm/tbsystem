import { getToken } from './../lib/cache';
import { httpGet, httpPost,httpGetCommon } from "@/lib/http";
import { ModuleGoods } from "@/constance/goods";
import { IShopKeeper } from '@/constance/shop';

// 发布商品任务
export const publishNormalTask = (form:any) => {
    console.log("publishNormalTask publishNormalTask")
    return httpPost("/api/task/add",form)
} 


// 计算商品的佣金和价格
export const getShopPrice = (form:any,task_type = 0) => {
    return httpPost("/api/task/stat",{
        ...form,
        task_type
    })
}

// 导出任务列表
export const orderExport = (status:any = "",dtstart:any = "",dtend:any = "") => {
    const token = getToken()
    location.href = `http://124.71.182.201/api/task/order_export?status=${status}&dtstart=${dtstart}&dtend=${dtend}&token=${token}`
    // location.href = `http://129.211.87.79/api/task/order_export?status=${status}&dtstart=${dtstart}&dtend=${dtend}&token=${token}`
    // return httpGet("/api/task/order_export",form)
}