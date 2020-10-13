export const DEFAULT_NOTICELIST = {
    content:"",
    created_at: "", 
    id: 0,
    title: "",
    type: "",
    updated_at: "",
    user_id: 0
}

export interface INoticeList{
    content:string
    created_at: string 
    id: number
    title: string
    type: string
    updated_at: string
    user_id: number
}