// 资金管理的接口
import { httpPost } from '@/lib/http'

// 上传交易流水
export const sendPaySeries = (series:string,amount:number | string)=>{
    return httpPost("/api/charge/add",{
        series,
        amount
    })
}