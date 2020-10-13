// 商品的结构
export module ModuleGoods {
  export interface IGoodList {
    category: string;
    consumers_id: number;
    created_at: string;
    epc_url: Epcurl[];
    goods_url: string;
    id: number;
    kg: string;
    main_url: string;
    name: string;
    name_simple: string;
    pc_url: string;
    phone_url: string;
    qr_url: string;
    shop_id: number;
    shopkeeper: string;
    status: number;
    updated_at?: any;
  }

  export interface Epcurl {
    url: string;
    pc: boolean;
    phone: boolean;
  }
}

export const DEFAULT_GOODLIST =  {
    category: "",
    consumers_id: 0,
    created_at: "",
    epc_url: [],
    goods_url: "",
    id: 0,
    kg: "",
    main_url: "",
    name: "",
    name_simple: "",
    pc_url: "",
    phone_url: "",
    qr_url: "",
    shop_id: 0,
    shopkeeper: "",
    status: 0,
    updated_at: ""
  }
