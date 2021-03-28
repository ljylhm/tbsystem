import { IUser } from '@/constance/user';
import { httpGet, httpPost } from '@/lib/http';

// 获取用户信息的一些服务
export const getUserInfo = () => httpGet<IUser>("/api/current")

// 修改用户信息的一些接口
export const editUserInfo = (editInfo:any) => httpPost("/api/update",editInfo)

// 获取支付宝收款人的一些信息
export const getAliPayUserInfo = () => httpPost('/api/config/get',{
    key: "transfer"
})
