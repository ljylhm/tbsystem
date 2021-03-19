// 关于工单的一些接口
import { IUser } from '@/constance/user';
import { getToken } from '@/lib/cache';
import { getEnv, isDev } from '@/lib/env';
import { httpGet, httpPost } from '@/lib/http';
// 工单评论的接口
export const workOrderComment = (form:any) => {
    return httpPost("/api/work/comment",form)
}

// 获取工单评论的接口
export const getWorkComment = (id:number) => {
    return httpPost("/api/work/comment_list",{
        id
    })
}

// 获取工单详情
export const getWorkOrderDetailInfo = (id:number) => {
    return httpPost("/api/work/get",{
        id
    })
}

// 修改工单状态
export const upDateWorkOrderStatus = (id:number,status:any) => {
    return httpPost("/api/work/update",{
        id,
        status
    })
}


// 导出数据
export const dcTransferData = (ids:any[] = [],export_type:any = "") => {
    const token = getToken()
    return isDev() ? `http://129.211.87.79/api/transfer/export?ids=${ids.join(",")}&export_type=${export_type}&token=${token}` : `http://124.71.182.201/api/transfer/export?ids=${ids.join(",")}&export_type=${export_type}&token=${token}`
}

