import "./ChatWindow.css";
import Chat from "./Chat";
const ChatWindow = () => {
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          SmartGPT &nbsp; <i class="fa-solid fa-chevron-down"></i>{" "}
        </span>

        <div className="userIconDiv">
          <span className="userIcon">
            <i class="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      <Chat></Chat>
      <div className="chatInput">
        <div className="inputBox">
          <input placeholder="Ask anything..."></input>
          <div id="submit">
            <i class="fa-solid fa-paper-plane"></i>
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
