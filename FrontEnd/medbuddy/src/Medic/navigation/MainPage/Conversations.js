import './Conversations.css';
import List from './List';
import Footer from '../../common-components/Footer' ;
import Navbar from '../../common-components/Navbar' ;
import Logo from '../../common-components/logoB.png';
import Notifications from './Notifications';

function Conversations() {
    return (
  
      <div className="Conversations">
        <div className="body">
        <div className='navbar-container'>
          <Navbar/>
        </div>

        <div className='conversations-container'>

        <div className='notifications-container'>
        <Notifications/>
        </div> 
      
        <div className='list-container'>
        <List/>
        </div>
        </div>

          <div className="footer-container"><Footer/></div>
          </div>
          
      </div>
    );
  }
  
  export default Conversations;
  