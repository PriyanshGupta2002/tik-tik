
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { allPostsQuery } from '../../../utils/queries'
export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    if (req.method==="GET") {
        const query  = allPostsQuery()
        const data = await client.fetch(query)
        res.status(201).json(data)
        return
    }
    const document=req.body
   try {
       await client.create(document)
   } catch (error) {
       res.status(403).json({"Message":"Error Occured"})
       return
   }
   res.status(201).json({"Message":"Video Created Successfully"})

    
}
