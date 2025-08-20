import "./ChatWindow.css";
import Chat from "./Chat";
import { MyContext } from "./MyContext";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
const ChatWindow = () => {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setPrevChats,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt, // make sure "prompt" is defined
        threadId: currThreadId, // make sure "currThreadId" is defined
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // parse JSON response
      console.log("Server response:", data);
      setReply(data.reply); // set the reply state with the response data
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  //Append new chat to previous chats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats((prev) => [
        ...prev,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: reply,
        },
      ]);
      setPrompt(""); // Clear the input after sending
    }
  }, [reply]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          SmartGPT &nbsp; <i className="fa-solid fa-chevron-down"></i>{" "}
        </span>

        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i class="fa-solid fa-cloud-arrow-up"></i>&nbsp; Upgrade Plan
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-gear">&nbsp; </i>Settings
          </div>
          <div className="dropDownItem">
            <i class="fa-brands fa-yelp">&nbsp; </i>Help
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-right-from-bracket">&nbsp; </i>Logout
          </div>
        </div>
      )}
      <Chat></Chat>
      <ScaleLoader color="#fff" loading={loading}></ScaleLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          ></input>
          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          SmartGPT can make mistakes. Check important info. See Cookie
          Preferences.
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
