import express from 'express';
import z from 'zod';
import model from "./aiModel.js";

const router = express.Router();

const promptSchema = z.object({
    prompt: z.string().min(1, "A valid prompt is required."),
});

router.post("/", async (req, res) => {
    try {
        const {prompt} = promptSchema.parse(req.body);

        const userPrompt = `Generate a SQL query for: "${prompt}". Respond only with JSON format like: { "query": "YOUR_SQL_QUERY" }.`

        const response = await model.invoke(userPrompt);

        const sanitized = response.replace(/\\_/g, '_');

        const data = JSON.parse(sanitized);

        res.status(200).json({
            status: 'ok',
            query: data.query
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: 'error',
                message: error.errors?.[0]?.message || 'Invalid input.',
            });
        }

        res.status(500).json({
            status: 'error',
            message: error.message || error
        });
    }
})

export default router;