import "../assets/styles/navBar.css";
import Logo from "../assets/logo.png";
import Home from "../assets/home1.png";
import Search from "../assets/search.png";
import Bin from "../assets/bin.png";
const NavBar = () => {
  return (
    <div className="navbar-container">
      <nav>
        <ul className="navbar-left">
          <li>
            <img className="logo" src={Logo} alt="" />
          </li>
          <li>
            <button className="nav-btns">
              <img className="btn-image" src={Home} alt="" />
            </button>
          </li>
          <li>
            <form action="">
              <button style={{ marginTop: "3px" }} className="nav-btns">
                <img className="btn-image" src={Search} alt="" />
              </button>
              <input
                type="text"
                name=""
                id=""
                placeholder="What do u want to play?"
              />
              <button className="nav-btns">
                <img className="btn-image" src={Bin} alt="" />
              </button>
            </form>
          </li>
        </ul>
        <ul className="navbar-right">
          <li>
            <button className="nav-redirects">Premium</button>
          </li>
          <li>
            <button className="nav-redirects">Support</button>
          </li>
          <li>
            <button style={{width:"150px",borderRight:"1px solid white"}} className="nav-redirects">Download</button>
          </li>
          <li>
            <button style={{width:"100px", marginLeft:"30px"}} className="nav-redirects">Install App</button>
          </li>
          <li>
            <button className="nav-redirects">Sign up</button>
          </li>
          <li>
            <button className="login-btn">Login</button>
          </li>

        </ul>
      </nav>
    </div>
  );
};
export default NavBar;
