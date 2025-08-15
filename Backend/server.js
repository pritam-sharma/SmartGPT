import express from "express";
import cors from "cors"; // Add this line
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

import "dotenv/config";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
  connectDb();
});

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${process.env.OPEN_API_KEY}`, // Use your API key here
//     },
//     body: JSON.stringify({
//       model: "gpt-40-mini",
//       messages: [
//         {
//           role: "user",
//           content: req.body.message,
//         },
//       ],
//     }),
//   };
//   try {
//     const response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       options
//     );
//     const data = await response.json();
//     console.log(data);
//     res.json(data.choices[0].message.content);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
