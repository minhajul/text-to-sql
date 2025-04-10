# Text-to-SQL Node.js App

This is a simple Node.js application that converts natural language queries into SQL using an AI model via the Hugging Face API.

## 🚀 Getting Started

Follow these steps to run the app locally.

### 1. Clone the Repository

```
git clone https://github.com/minhajul/text-to-sql.git
cd text-to-sql
```

### 2. Install Dependencies
```npm install```


### 3. Create a ```.env``` File
Create a ```.env``` file in the root directory and add the following environment variables:

```
AI_MODEL=your-model-name
HUGGINGFACE_API_KEY=your-huggingface-api-key
```

### 4. Run the App

```npm run start```

### Example Usage

Send a POST request to ```api/generate-query``` endpoint with a natural language query:

```json
{
  "prompt": "Show me the top 10 users by total order amount."
}
```

Response:

```json
{
    "status": "ok",
    "query": "SELECT u.*, o.total_amount FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.id HAVING COUNT(o.id) >= 1 ORDER BY o.total_amount DESC LIMIT 10;"
}
```

### Made with ❤️ by [[minhajul](https://github.com/minhajul)]