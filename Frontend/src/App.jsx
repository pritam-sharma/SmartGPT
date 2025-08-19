import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./MyContext";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); // Initialize prevChats state
  const [newChat, setNewChat] = useState(true); // State to track new chat button click
  const [allThreads, setAllThreads] = useState([]); // State to store all threads
  const providerValue = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    newChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
  }; //passing values
  return (
    <div className="app">
      <MyContext.Provider value={providerValue}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;
