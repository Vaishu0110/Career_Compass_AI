// api/index.js (Vercel Serverless Function Handler with Error Boundary)
import app from "../server/server.js";

export default async function handler(req, res) {
  try {
    return app(req, res);
  } catch (err) {
    console.error("Vercel Serverless Invocation Error:", err);
    return res.status(500).json({
      error: err.message || "Serverless Function Execution Failed",
      stack: err.stack,
    });
  }
}
