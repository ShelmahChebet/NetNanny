import { MiddlewareConfigFn } from "wasp/server";
import { Request, Response } from "express";
import { HandleData } from "wasp/server/api";

export const handleData: HandleData = async (req: Request, res: Response, context) => {
  try {
    console.log("Received data:", req.body);
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: "Missing required data." });
    }

    // Process the data (modify this based on your use case)
    const processedData = data.toUpperCase();

    res.status(200).json({ message: "Data processed successfully", processedData });
  } catch (error) {
    console.error("Error handling data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


export const processApiMiddleware: MiddlewareConfigFn = (config) => {
  (config as any).cors = { origin: "*", methods: ["POST"] }; // Allow all origins, only POST method
  return config;
};
