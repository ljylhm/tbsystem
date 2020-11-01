import { MessageBox,Message,Loading } from 'element-ui';

// 常用的删除
export const confirmMessageOne = (title:string,msg:string) => MessageBox.confirm(msg,title,{
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
})  


// 常用的一些alert
// 1. 弹出错误信息

export const openAlertError = (msg:string) => {
    return MessageBox.alert(msg,"提示",{
        confirmButtonText:"确定",
        type: "error"
    })
}

export const openAlertWarn = (msg:string) => {
    return MessageBox.alert(msg,"提示",{
        confirmButtonText:"确定",
        type: "warning"
    })
}

// loading效果
export const showLoading = (msg:string = "加载中") => {
    return Loading.service({
        text: msg,
        // spinner: 'el-icon-loading'
    })
}


// 常用的一些Message
export const openSuccessMsg = (message:string,onClose?:()=>void,duration:number = 2000) => {
    Message.success({
        message,
        onClose,
        duration
    })
}

export const openWarnMsg = (message:string,onClose?:()=>void,duration:number = 2000) => {
    Message.warning({
        message,
        onClose,
        duration
    })
}