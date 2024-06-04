import React, { useState , useEffect} from 'react';
import "./Contact.css";
import Footer from "../common-components/Footer";
import Navbar from "../common-components/Navbar";
import Logo from "../common-components/logoB.png";
import Forum from "./Forum";
import Cookies from 'js-cookie';

function Contact() {

  const [userId, setUserId] = useState('');
    const emailFromCookie = Cookies.get("user_email");
    const passwordFromCookie = Cookies.get("user_pass");
    const authorisation = btoa(`${emailFromCookie}:${passwordFromCookie}`);

    //obtinut id user
    useEffect(() =>{
      const fetchuserId = async () => {
          try{
              const response = await fetch(`http://localhost:7264/medbuddy/getuserid/${emailFromCookie}`, {
                  method: 'GET',
                  headers: {
                      'Authorization': `Basic ${authorisation}`
                  }
              });
              console.log("Email: ", emailFromCookie);
              console.log("Parola: ", passwordFromCookie);
              if(response.status !== 200){
                  if(response.status === 418 || response.status === 500){
                      throw new Error('Internal backend error');
                  }
                  else if(response.status === 401){
                      throw new Error('Wrong email and password in the header');
                  }
                  else if(response.status === 400){
                      throw new Error('Typo in the URL or not the right path variable type');
                  }
                  else if(response.status === 404){
                      throw new Error('No user was found');
                  }
                  else{
                      throw new Error('Unknown error');
                  }
              }
              else{
                  console.log('Retrieved ID successfully');
              }

              const data = await response.json();
              setUserId(data.id);
          } catch (error) {
              console.error('Error:', error);
          }
      };
      fetchuserId();
  }, [emailFromCookie]);

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
  