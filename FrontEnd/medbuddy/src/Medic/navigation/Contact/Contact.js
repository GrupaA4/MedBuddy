import './Contact.css';
import Footer from '../common-components/Footer' ;
import Navbar from '../common-components/Navbar' ;
import Logo from '../common-components/logoB.png';
import Forum from './Forum';

function Contact() {
    return (
  
      <div className="Contact">
        <div className="body">
        <div className='navbar-container'>
          <Navbar/>
        </div>
  
          <div className="content">
            <div className="left-container">
            <h3>Contact&Support</h3>
                <p class="paragraph">Having some problems?
                The MedBuddy team is eager to listen to you and provide a better experience to everyone.
                Contact us: </p>
                <ul class="para">
                    <li>Email: support@MedBuddy.com</li>
                    <li>Phone: 123-456-7890</li>
                </ul>
      
            </div>
            
            <div className="forum-container">
                <Forum/>
            
            </div>
          </div>
          
          <div className="footer-container"><Footer/></div>
          
          </div>
  
  
  
      </div>
    );
  }
  
  export default Contact;
  