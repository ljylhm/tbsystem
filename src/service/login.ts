import { httpGet, httpPost } from '@/lib/http';
import { ILogin, IRegister } from '@/constance/login';

// 登录的方法
export const login = (phone: string, password: string) => {
    return httpPost<ILogin>("/api/login", {
        phone,
        password,
        type: 1
    })
}

// 登出的方法
export const logout = (token:string) => {
    return httpGet("/api/logout", {
        token
    })
}

// 注册的方法
export const register = (form:any) => { 
    return httpPost<IRegister>("/api/register",form)
}

// 获取用户信息的方法
export const getUserInfo = (token:string) => { 
    return httpGet("/api/current",{
        token
    })
}

// 发送短信的方法
export const sendMessage = (phone:string) => {
    return httpGet("/api/sms",{
        phone,
        type:1
    })
}

// 发送短信的方法
export const sendMessageV2 = (phone:string) => {
    return httpGet("/api/sms_back",{
        phone,
        type:1
    })
}

export const resetPassword = (form:any) => {
    return httpPost("/api/reset_password",{
        ...form,
        type: 1
    })
}

