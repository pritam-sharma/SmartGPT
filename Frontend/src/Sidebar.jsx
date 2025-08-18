import "./Sidebar.css";
const Sidebar = () => {
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
            <i class="fa-solid fa-pen-to-square"></i>{" "}
          </span>
        </button>
        {/* history */}
        <ul className="history">
          <li>history1</li>
          <li>history2</li>
          <li>history3</li>
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
