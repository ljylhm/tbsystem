// 获取商品
import { httpGet, httpPost } from '@/lib/http';
import { IShopList } from "@/constance/shop"
export const getMyShopList = ()=>{
    return httpPost<{
        total:number,
        list:IShopList[]
    }>("/api/shop/list")
}


export const getShopCount = (shop_id:any) => {
    return httpPost("/api/unit/publish_num",{
        shop_id
    })
}