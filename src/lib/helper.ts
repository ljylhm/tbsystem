import { TB_DOMAIN } from './http'
export const completeImgUrl = (url: string) => {
  return TB_DOMAIN + url
}

// 计算时间的方法
export const transformTimeStampToDays = (time: string) => {
  const diff = Date.now() - new Date(time).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

// 返回平台类型
export const getPlatFormByType = (type: number | string) => {
  return type == 1 ? "淘宝" : type == 2 ? "京东" : "拼多多"
}

// 返回平台类型
export const getFlowTypes = (id: string) => {

  const flowTypes = [
    {
      value: "1",
      label: "APP自然搜索",
    },
    {
      value: "2",
      label: "PC自然搜索",
    },
    {
      value: "3",
      label: "APP淘口令",
    },
    {
      value: "4",
      label: "APP直通车",
    },
    {
      value: "5",
      label: "PC直通车",
    },
    {
      value: "6",
      label: "抖音任务",
    },
  ];

  const data = flowTypes.filter((item) => item.value == id);
  if (data.length > 0) return data[0].label;
}

// 返回排序方式
export const missionSort = (id: any) => {
  const order_type = [
    {
      value: 1,
      label: "综合",
    },
    {
      value: 2,
      label: "销量",
    },
    {
      value: 3,
      label: "价格从高到低",
    },
    {
      value: 4,
      label: "价格从低到高",
    },
  ];

  const data = order_type.filter((item) => item.value == id);
  if (data.length > 0) return data[0].label;
}

// 返回任务状态
export const getMissionStatus = (index: number) => {
  const statusArr = [
    "待接手",
    "进行中",
    "待发货",
    "待评价",
    "已完成",
    "待完成",
    "已取消",
    "待收货"
  ];
  return statusArr[index]
}

/**
* @description 获取url中的search
* @returns {String} search值
*/
export const getSearchParam = (url: string) => {

  let _splitArr_ = url.split("?")[1];
  if (_splitArr_) {
    let index = _splitArr_.indexOf("#"), // 判断有没有#号
      _splitArr_sub_ = index !== -1 ? _splitArr_.substring(0, index).split("&") : _splitArr_.split("&");

    return _splitArr_sub_;

  } else return null
}

export const getUrlParam = (url: string, search: string | number) => {
  let parse = (url: string, search: string | number) => {
    let para = getSearchParam(url)
    if (para) {
      for (let i of para) {
        let searchInfo = i.split("=");
        if (search === searchInfo[0]) return searchInfo[1];
      }
      return null;
    } else return null;
  };
 return parse(url, search);
}
