import express from "express";
import Thread from "../models/Thread.js";

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
router.get("/thread:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }
    res.json(thread.messages);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to fetch thread" });
  }
});

//delete thread
router.delete("/thread:threadId", async (req, res) => {
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
