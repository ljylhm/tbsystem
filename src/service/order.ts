import { httpGet, httpPost,httpGetCommon } from "@/lib/http";

// 获取任务管理列表
export const getMissionMangerList = (form:any) => {
    return httpPost("/api/task/list",{
        task_type: 0,
        ...form
    })
}

// 获取流量任务列表
export const getFlowList = (form:any) => {
    return httpPost("/api/task/list",{
        task_type: 1,
        ...form
    }) 
}

// 获取日志列表
export const getDailyNote = (order_id:any) => {
    return httpPost("/api/order/flow",{
        id:order_id
    })
}

// 获取模板列表
export const getTemplateList = () => {
    return httpPost("/api/task/template_list")
}

// 删除单条模板
export const delTemplateList = (id:number) => {
    return httpPost("/api/task/template_delete",{
        id
    })
}

// 获取模板详情
export const getTemplateInfo = (id:any) => {
    return httpPost("/api/task/template_one",{
        id
    })
}

// 修改模板
export const upDateTemplate = (form:any) => {
    return httpPost("/api/task/template_update",form)
}

// 核对
export const verifyOrder = (id:any,confirm:any) => {
    return httpPost("/api/order/verify_shop",{
        id,
        confirm
    })
}

// 发货接口
export const expressOrder = (id:any,express_no:any) => {
    return httpPost("/api/order/modify_express",{
        id,
        express_no
    })
}

// 获取评论列表
export const getCommentList = (form:any) => {
    return httpPost("/api/task/evaluate_list",form)
}

// 设置评价内容(
export const setCommentAlive = (id:any,is_evaluate:any) => {
    return httpPost("/api/task/evaluate_modify",{
        is_evaluate,
        evaluate_comment:"",
        id
    })
}

export const setCommentContent = (id:any,evaluate_comment:any) => {
    return httpPost("/api/task/evaluate_modify",{
        evaluate_comment,
        is_evaluate: 1,
        id
    })
}


// 获取工单列表
export const getWorkList = (form:any) => {
    return httpPost("/api/work/list",form)
}


// 新建工单
export const addWorkItem = (form:any) => {
    return httpPost("/api/work/add",form)
}

// 查询转账管理
export const getTransFer = (form:any = {}) => {
    return httpPost("/api/transfer/list",form)
}


// 更新状态
export const upDateTransFer = (id:any,status:any) =>{
    return httpPost("/api/transfer/update",{
        id,
        status
    })  
}

// 反馈
export const upDateTransFer2 = (id:any,feedback:any,status:any) =>{
    return httpPost("/api/transfer/update",{
        id,
        feedback,
        status
    })  
}


// 批量取消
export const groupCancel = (group:any) => {
    return httpPost("/api/order/shop_cancel",{
        id:group
    })
}
