import "./ChatWindow.css";
import Chat from "./Chat";
import { useState } from "react";
import { MyContext } from "./MyContext";
import { useContext } from "react";
import { ScaleLoader } from "react-spinners";
const ChatWindow = () => {
  const { prompt, setPrompt, reply, setReply, currThreadId } =
    useContext(MyContext);

  const [loading, setLoading] = useState(false);

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

  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          SmartGPT &nbsp; <i className="fa-solid fa-chevron-down"></i>{" "}
        </span>

        <div className="userIconDiv">
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
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
