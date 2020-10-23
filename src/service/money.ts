// 资金管理的接口
import { httpPost } from '@/lib/http'
import { IFundRes,IFundParam } from "@/constance/money"

// 上传交易流水
export const sendPaySeries = (series:string,amount:number | string)=>{
    return httpPost("/api/charge/add",{
        series,
        amount
    })
}


// 获取收支流水明细
export const getFundChareList = (para:IFundParam) => {
    return httpPost<{
        list: IFundRes[]
        total: number
    }>("/api/charge/list",para)
}