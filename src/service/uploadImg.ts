import { getToken } from '@/lib/cache';
import { httpGet,httpPost } from '@/lib/http'

// 上传图片的借口
const token = getToken()
export const upLoadImage = (file:any,img_type = "",options:any = {}) =>{
   const formData = new FormData();
   formData.append("type","image")
   formData.append("img_type",img_type)
   if(options.otype)  formData.append("otype", "1")
   // formData.append("token",token || "")
   formData.append("file",file)
   return httpPost<{
      src:string
      qr_url: string
   }>(`/api/upload`,formData,{
        "content-type": "multipart/form-data"
   })
}