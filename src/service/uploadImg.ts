import { httpGet,httpPost } from '@/lib/http'

// 上传图片的借口
export const upLoadImage = (file:File) =>{
   const formData = new FormData();
   formData.append("type","image")
   formData.append("token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjkuMjExLjg3Ljc5XC9hcGlcL3JlZ2lzdGVyIiwiaWF0IjoxNjAxMTA3ODkzLCJleHAiOjE2MDExMTE0OTMsIm5iZiI6MTYwMTEwNzg5MywianRpIjoicVRzU2FxSmI2ZjRCM0JMRCIsInN1YiI6NCwicHJ2IjoiYzFiNjViMWYwZDY4YTY5YTBiMWNmMjk2NzNkMjg1NGJjMGYyOTkzZCJ9.FqG1qQEb8jsjOROaVuQ5NKfAOAIO-Z9XmK0blj-m9SY")
   formData.append("file",file)
   return httpPost("/api/upload",formData,{
        "content-type": "multipart/form-data"
   })
}