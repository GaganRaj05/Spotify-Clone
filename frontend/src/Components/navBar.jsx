import "../assets/styles/navBar.css";
import { ImSpotify } from "react-icons/im";
import { HiMiniHome } from "react-icons/hi2";
import { MdStorage } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineDownload } from "react-icons/ai";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../Context/AuthContext";
import { Logout } from "../services/auth";
const NavBar = () => {
  const navigate = useNavigate();
  const handleSignUpClick = (e)=> {
    navigate("/sign-up")
  }
  const handleLoginClick = (e)=> {
    navigate("/login")
  }
  
  const handleLogoutClick = async (e) => {
    e.preventDefault();
    const response = await Logout();
    if(response.error) {
      alert(response.error === "Failed to fetch" ? "Some error occured please try again later":response.error);
      return;
    }
    setUser(null);
    alert(response);
    return;

  }
  const {user,setUser} = useAuth();
  return (
    <div className="navbar-container">
      <nav>
        <ul className="navbar-left">
          <li>
            <button className="logo-btn">
              <ImSpotify className="nav-logo"/>
            </button>
          </li>
          <li>
            <button>
              <HiMiniHome className="nav-btns"/>
            </button>
          </li>
          <li>
            <form action="" className="search-form">
              <button>
                <IoIosSearch className="nav-btns"/>
              </button>
              <input type="text" placeholder="What do you want to listen ?" />
              <button>
                <MdStorage className="nav-btns"/>
              </button>
            </form>
            
          </li>
        </ul>
        <ul className="navbar-right">
          <li>
            <button>
              Premium
            </button>
          </li>
          <li>
            <button>
              Support
            </button>
          </li>
          <li>
            <button id="dwn-btn">
              Download
            </button>
          </li>
          <li>
            <button id="instapp">
              <AiOutlineDownload className="instapp-icon"/>
              Install App
            </button>
          </li>
          {!user && (<>
            <li>
            <button onClick={handleSignUpClick}>Sign up</button>
          </li>
          <li>
            <button id="login-btn" onClick={handleLoginClick}>
              Login
            </button>
          </li>
          </>)}
          {user && 
            <li>
              <button  id="logout-btn" onClick={handleLogoutClick}> Logout</button>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
}
export default NavBar;