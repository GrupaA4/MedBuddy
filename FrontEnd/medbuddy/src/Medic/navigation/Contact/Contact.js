import './Contact.css';
import Footer from '../common-components/Footer' ;
import Navbar from '../common-components/Navbar' ;
import Logo from '../common-components/logoB.png';
import Forum from './Forum';

function Contact() {
    return (
  
      <div className="Contact">
        <div className="body-contat">
        <div className='navbar-container-contat'>
          <Navbar/>
        </div>
  
          <div className="content-contat">
            <div className="left-container-contat">
            <h1>Contact&Support</h1>
            <h3>Having some problems?</h3>
                <p class="paragraph-contat"> The MedBuddy team is eager to listen to you and provide a better experience to everyone.<br/>
                 </p>
                <ul class="para-contat">
                    <li>Contact us:</li>
                    <li>Email: support@MedBuddy.com</li>
                    <li>Phone: 123-456-7890</li>
                </ul>
      
            </div>
            
            <div className="forum-container-contat">
                <Forum/>
            
            </div>
          </div>
          
          <div className="footer-container-contat"><Footer/></div>
          
          </div>
  
  
  
      </div>
    );
  }
  
  export default Contact;
  