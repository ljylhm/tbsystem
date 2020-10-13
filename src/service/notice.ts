import { INoticeList } from '@/constance/notice'
import { httpPost } from '@/lib/http'

// 获取公告的一些接口
export const getNoticeList = (start:number = 0,length:number = 20)=>{
    return  httpPost<{
        list:INoticeList[]
        total: number
    }>("/api/notcie/list",{
        start,
        length
    })
}

// 获取公告详情
export const getDetailNotice = (id:any) =>{
    return httpPost<INoticeList[]>("/api/notcie/get",{
        id
    })
}