// 获取商品
import { httpGet, httpPost } from '@/lib/http';
import { IShopList } from "@/constance/shop"
export const getMyShopList = ()=>{
    return httpPost<{
        total:number,
        list:IShopList[]
    }>("/api/shop/list")
}
