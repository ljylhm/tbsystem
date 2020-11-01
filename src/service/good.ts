// 封装的商品的一些接口
import { httpGet, httpPost,httpGetCommon } from "@/lib/http";
import { ModuleGoods } from "@/constance/goods";
import { IShopKeeper } from '@/constance/shop';

interface IGetGoodListForm{
    start?:number
    length?:number
    name?:string
    shop_id?:number
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
export const getShopDetailByQTK = (keyword:string) => {
    const url = "http://openapi.qingtaoke.com/search"
    const APP_KEY = "9D7iA77i"
    return httpGetCommon(url,{
        v:"1.0",
        s_type: 1,
        app_key:APP_KEY,
        key_word:keyword
    })
}

