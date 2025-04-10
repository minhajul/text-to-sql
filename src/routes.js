import express from 'express';
import model from "./aiModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log("Sending request to Hugging Face...");
        const userPrompt = `Generate a SQL query for: "${prompt}". Respond only with JSON format like: { "query": "YOUR_SQL_QUERY" }.`
        const response = await model.invoke(userPrompt);

        const sanitized = response.replace(/\\_/g, '_');

        const data = JSON.parse(sanitized);

        res.status(200).json({
            status: 'ok',
            data: data.query
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message || err
        });
    }
})

export default router;