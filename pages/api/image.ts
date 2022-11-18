import { Configuration, ImagesResponse, OpenAIApi } from "openai";
import type { NextApiRequest, NextApiResponse } from 'next'


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

type errorResponse = {
    error: string
}

export default async (req: NextApiRequest, res: NextApiResponse<ImagesResponse | errorResponse>) => {
    if (req.method === "POST") {
        //Create Image
        const { prompt } = req.body;
        const response = await openai.createImage({
          prompt,
          n: 3,
          size: "256x256",
        });
        // console.log(response.data.data);
    res.status(200).json(response.data);
      } else {
        res.status(404).json({ error:"Not found" });
      }
  }