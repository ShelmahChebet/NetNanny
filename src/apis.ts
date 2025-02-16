import { MiddlewareConfigFn } from "wasp/server";
import { Request, Response } from "express";
import { HandleData } from "wasp/server/api";
import { prisma } from 'wasp/server'

export const handleData: HandleData = async (req: Request, res: Response, context) => {
  try {
    console.log("Received data:", req.body);
    const data  = req.body;
    console.log("Data:", data);
    // Process the data (modify this based on your use case)
    const processedData = postMessage(data.text, data.user_id, data.analysis, data.suspicious_name);
    console.log("Processed data:", processedData);
    res.status(200).json({ message: "Data processed successfully", processedData });
  } catch (error) {
    console.error("Error handling data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


async function postMessage(
  text: string,
  user_id: number,
  analysis: string,
  suspicious_name: string,
) {
  await prisma.message.create({
    data: {
      text,
      user_id,
      analysis,
      suspicious_name,
    },
  });
}


export const processApiMiddleware: MiddlewareConfigFn = (config) => {
  (config as any).cors = { origin: "*", methods: ["POST"] }; // Allow all origins, only POST method
  return config;
};
