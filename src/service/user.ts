import { IUser } from '@/constance/user';
import { httpGet, httpPost } from '@/lib/http';

// 获取用户信息的一些服务
export const getUserInfo = () => httpGet<IUser>("/api/current")

// 修改用户信息的一些接口
export const editUserInfo = (editInfo:any) => httpPost("/api/update",editInfo)
