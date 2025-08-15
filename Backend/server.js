import express from "express";
import cors from "cors"; // Add this line

import "dotenv/config";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

app.post("/test", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPEN_API_KEY}`, // Use your API key here
    },
    body: JSON.stringify({
      model: "gpt-40-mini",
      messages: [
        {
          role: "user",
          content: req.body.message,
        },
      ],
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    console.log(data);
    res.json(data.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
