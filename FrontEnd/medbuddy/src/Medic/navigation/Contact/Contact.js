import React, { useState , useEffect} from 'react';
import "./Contact.css";
import Footer from "../common-components/Footer";
import Navbar from "../common-components/Navbar";
import Logo from "../common-components/logoB.png";
import Forum from "./Forum";
import Cookies from 'js-cookie';

function Contact() {

  
    return (
  
      <div className="Contact">
        <div className="body-contact">
        <div className='navbar-container-contact'>
          <Navbar/>
        </div>
  
          <div className="content-contact">
            <div className="left-container-contact">
            <h1>Contact&Support</h1>
            <h3>Having some problems?</h3>
                <p class="paragraph-contact"> The MedBuddy team is eager to listen to you and provide a better experience to everyone.<br/>
                 </p>
                <ul class="para-contact">
                    <li>Contact us:</li>
                    <li>Email: support@MedBuddy.com</li>
                    <li>Phone: 123-456-7890</li>
                </ul>
      
            </div>
            
            <div className="forum-container-contact">
                <Forum/>
            
            </div>
          </div>
          
          <div className="footer-container-contact"><Footer/></div>
          
          </div>
  
  
  
      </div>
    );
  }
  
  export default Contact;
  