// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    //Create Image
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt,
      n: 3,
      size: "256x256",
    });

    res.status(200).json({ image: response.data });
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
