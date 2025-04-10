import {HuggingFaceInference} from "@langchain/community/llms/hf";

const model = new HuggingFaceInference({
    model: process.env.AI_MODEL,
    apiKey: process.env.HUGGINGFACE_API_KEY,
    temperature: 0.7,
    maxTokens: 250,
});

export default model;
