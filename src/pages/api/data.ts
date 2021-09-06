import { NextApiRequest, NextApiResponse } from "next";

import { promises } from 'fs'

export default async function (req: NextApiRequest, res: NextApiResponse){

  if(req.method === 'POST'){
    try{
      await promises.writeFile('./src/pages/api/graphData.json', JSON.stringify(req.body.data));
      return res.send('pegue as medições')
    } catch{ return }
  } 
  
  else {
    const data = await promises.readFile('./src/pages/api/graphData.json', 'utf-8');
    return res.json({data: JSON.parse(data)})
  }
}