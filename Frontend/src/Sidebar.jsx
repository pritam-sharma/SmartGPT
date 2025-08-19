import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
const Sidebar = () => {
  const { allThreads, setAllThreads, currThreadId } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const data = await response.json();
      const filteredData = data.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      console.log(data);
      setAllThreads(filteredData); // Set all threads in state
      //threadId and title
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);
  return (
    <div>
      <section className="sidebar">
        {/* new chat button */}
        <button>
          <img
            src="src/assets/blacklogo.png"
            alt="gpt logo"
            className="logo"
          ></img>
          <span>
            {" "}
            <i className="fa-solid fa-pen-to-square"></i>{" "}
          </span>
        </button>
        {/* history */}
        <ul className="history">
          {allThreads?.map((thread, idx) => (
            <li key={idx}>{thread.title}</li>
          ))}
        </ul>
        {/* sign */}
        <div className="sign">
          <p>By Pritam Sharma &hearts;</p>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
