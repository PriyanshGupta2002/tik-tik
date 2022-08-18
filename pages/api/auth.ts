
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.body;
 try {
   await client.createIfNotExists(user)
 } catch (error) {
  res.status(422).json({message:"Some Error Occured"})
  return
 }
 res.status(201).json({message:"Login Successfull"})

}