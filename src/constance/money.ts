export interface IFundRes {
    amount: string;
    charge_no: string;
    consumers_id: number;
    created_at: string;
    description: string;
    id: number;
    next_amount: string;
    pre_amount: string;
    task_id: number;
    type: number;
    updated_at: string;
}

export interface IFundParam{
    step?: number
    start?: number
    task_id?: number | string
    type?: number | string
    dtstart?: string
    dtend?: string
    time?: any[]
}