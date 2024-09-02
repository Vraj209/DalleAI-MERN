import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

router.route("/").get((req, res) => {
  res.send("Hello from DAlle");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    // console.log(prompt);
    const response = await client.images.generate({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      model: "dall-e-3",
    });
    // console.log(response)
    let image = response.data[0].url;
    // console.log(image);
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});
export default router;
