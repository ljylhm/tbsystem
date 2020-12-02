// 封装的商品的一些接口
import { httpGet, httpPost,httpGetCommon } from "@/lib/http";
import { ModuleGoods } from "@/constance/goods";
import { IShopKeeper } from '@/constance/shop';

interface IGetGoodListForm{
    page?:number
    limit?:number
    name?:string
    shop_id?:number | string
}

export const getGoodsList = (form:IGetGoodListForm = {}) => {
    return httpPost<{
        total: number,
        list: ModuleGoods.IGoodList[]
    }>("/api/goods/list",form)
}

export const getShopKeeperList = () => {
    return httpPost<IShopKeeper[]>("/api/shop/shopkeeper_list")
}

// 通过轻淘客获取商品信息
export const getShopDetailByQTK = (id:string) => {
    return httpPost("/api/goods_info",{
        id
    })
}

// 通过商品id获取商品详情
export const getGoodsDetail = (id:any) => {
    return httpPost<any>("/api/goods/get",{
        id
    })
}

