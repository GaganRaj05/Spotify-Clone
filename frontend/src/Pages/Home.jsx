import NavBar from "../Components/navBar";
import "../assets/styles/home.css"
import SideBar from "../Components/SideBar";
import MainContent from "../Components/MainCont";
function Home() {
  return (
    <div>   
        <NavBar/>
        <div className="main-content">
          <SideBar/>
          <MainContent/>
        </div>
    </div>
  );
}
export default Home;
