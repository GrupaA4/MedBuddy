import "./Conversations.css";
import List from "./List";
import Footer from "../common-components/Footer";
import Navbar from "../common-components/Navbar";
import Logo from "../common-components/logoB.png";

function Conversations() {
    return (
  
      <div className="Conversations">
        <div className="body-mainpage-medic">
        <div className='navbar-container-mainpage-medic'>
          <Navbar/>
        </div>

       <div className='conversations-container-mainpage-medic'>
        <div className='list-container-mainpage-medic'>
        <List/>
        </div>
        </div>
      

          
          </div>
          <div className="footer-container-mainpage-medic"><Footer/></div>
      </div>
    );
  }
  
  export default Conversations;
  