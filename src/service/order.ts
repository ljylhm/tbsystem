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

// 获取评价列表日志
export const getCommentDailyNote = (id:any) => {
    return httpPost("/api/order/order_evaluate_flow",{
        id
    })
}

// 获取模板列表
export const getTemplateList = (form?:any) => {
    return httpPost("/api/task/template_list",form)
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
// export const verifyOrder = (id:any,confirm:any) => {
//     return httpPost("/api/order/verify_shop",{
//         id,
//         confirm,
//         check_type: 1
//     })
// }

// 核对
export const verifyOrder = (form:any) => {
    return httpPost("/api/order/verify_shop",form)
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

// 忽略设置
export const ignoreComment = (id:any) => {
    return httpPost("/api/task/evaluate_ignore",{
        id
    })
}

export const cancelComment = (id:any,is_evaluate:any) => {
    return httpPost("/api/task/evaluate_cancel",{
        id,
        is_evaluate
    })
}

export const setCommentContent = (form:any) => {
    return httpPost("/api/task/evaluate_modify",form)
}

export const setCommentContentGo = (form:any) => {
    return httpPost("/api/task/evaluate_modify_go",form)
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

// 批量更新
export const upDateTransFerBatch = (ids:any) => {
    return httpPost("/api/transfer/status_batch",{
        ids
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


// 转账评论
export const transferComment = (form:any) => {
    return httpPost("/api/transfer/comment",form)
}

export const getTransferComment = (id:any) => {
    return httpPost("/api/transfer/comment_list",{
        id
    })
}


// 批量取消
export const groupCancel = (group:any) => {
    return httpPost("/api/order/shop_cancel",{
        id:group
    })
}

// 换人取消
export const cancelNew =  (id:any) => {
    return httpPost("/api/order/cancel",{
        id,
        type: 1
    })
}

// 评价任务审核
export const verifyCommentMission = (form:any) => {
    return httpPost("/api/task/evaluate_check",form)
}

export const verifyCommentMissionGo = (form:any) => {
    return httpPost("/api/task/evaluate_check_go",form)
}

// 评价任务审核是否通过
export const checkCommentMission = (id:any,is_evaluate:any) => {
    return httpPost("/api/task/evaluate_status",{
        id,
        is_evaluate
    })
}

// 新增银行卡的操作
export const addBank = (form:any) => {
    return httpPost("/api/charge/bank_add",form)
}

// 获取绑定银行卡的信息
export const getBank = () => {
    return httpPost("/api/charge/bank_get")
}

// 删除银行卡
export const deleteBank = (id:any) => {
    return httpPost("/api/charge/bank_delete",{
        id
    })
}

// 修改备注
export const editRemark = (form:any) => {
    return httpPost("/api/order/update_description",form)
}