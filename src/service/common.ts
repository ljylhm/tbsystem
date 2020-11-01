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


export interface IPriceRulesItem {
    created_at: string;
    extra?: any;
    fee: string;
    id: number;
    left: string;
    replace: string;
    right: string;
    type: string;
    updated_at: string;
}


// 获取收费规则的接口
export const getPriceRules = () => {
    return httpPost<IPriceRulesItem[][]>("/api/charge/rule")
}

