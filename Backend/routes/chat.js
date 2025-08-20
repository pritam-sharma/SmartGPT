import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIResponse from "../utils/openai.js";
const router = express.Router();

//test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "abc",
      title: "Test Thread",
    });
    const response = await thread.save();
    res.send(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to create thread" });
  }
});

// Get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});

//get thread by id
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    // Find thread by threadId
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    // Assuming your thread model has messages as JSON
    res.json(thread.messages);
  } catch (error) {
    console.error("Error fetching thread:", error);
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

//delete thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedtThread = await Thread.findOneAndDelete({ threadId });
    if (!deletedtThread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});
export default router;

//post chat route
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;
  if (!threadId || !message) {
    return res
      .status(400)
      .json({ error: "Thread ID and message are required" });
  }
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      //Create new thread in db
      thread = new Thread({
        threadId,
        title: message,
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      });
    } else {
      thread.messages.push({
        role: "user",
        content: message,
      });
    }
    const assistantResponse = await getOpenAIResponse(message);
    thread.messages.push({
      role: "assistant",
      content: assistantResponse,
    });
    thread.updatedAt = new Date();
    await thread.save();
    res.json({
      reply: assistantResponse,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "Failed to process chat" });
  }
});
