import { TB_DOMAIN } from './http'
export const completeImgUrl = (url:string) => {
    return TB_DOMAIN + url
}

// 计算时间的方法
export const transformTimeStampToDays = (time:string) => {
    const diff = Date.now() - new Date(time).getTime()
    return Math.floor(diff / (1000 * 60 * 60 * 24)) 
}