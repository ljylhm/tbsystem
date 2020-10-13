export interface IShopList{
    address: string;
    consumers_id: number;
    created_at: any;
    desctription: any;
    id: number;
    img_url: string;
    name: string;
    nature: string;
    province: string;
    sender: string;
    sender_phone: string;
    shopkeeper: string;
    status: number;
    type: string;
    updated_at: any;
}

export interface IShopKeeper{
    id:number,
    shopkeeper: string
}

export interface IShopKeeperSelect{
    label: string,
    value: number
}
