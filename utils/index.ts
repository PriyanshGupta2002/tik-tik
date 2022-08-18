

import axios from 'axios';
import jwtDecode from 'jwt-decode';
export const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL
export const createOrGetUser = async (response: any,addUser:any) => {
  const decoded:{name:string,picture:string,sub:string}=jwtDecode(response.credential)
  const {name,picture,sub}=decoded
  const userData= {
     _id:sub,
     _type:'user',
     userName:name,
     image:picture
      
  }
  const res=await axios.post(`${BASE_URL}/api/auth`,userData)
  addUser(userData)
  console.log(res)
}