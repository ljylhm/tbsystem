// 调整单量的接口
import { IUnitList } from '@/constance/unit';
import { httpGet, httpPost,httpGetCommon } from "@/lib/http";
export const getUnitList = ()=>{
    return httpPost<IUnitList[]>("/api/unit/list")
}

export const addUnitList = (num:number | string,publish_time:number,shop_id:number)=>{
    return httpPost<IUnitList[]>("/api/unit/add",{
        num,
        publish_time,
        shop_id
    })
}