
import React, { useState , useEffect} from 'react';
import './Forum.css';
import Cookies from 'js-cookie';

 function Forum() {
  const [userId, setUserId] = useState('');
  const [repUserId, setRepUserId] = useState('');
  const [reportedUserEmail, setReportedUserEmail] = useState('');
  const [reportMess, setReportMess] = useState('');

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

  const fetchReportedUserId = async () => {
    
    try{
      console.log(reportedUserEmail);
        const response = await fetch(`http://localhost:7264/medbuddy/getuserid/${reportedUserEmail}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${authorisation}`
            }
        });
        
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

        const dataRep = await response.json();
        setRepUserId(dataRep.id);
    } catch (error) {
        console.error('Error:', error);
    }
  };

  
  const handleSubmitReport = async () => {

    const reportData = {
      reportMessage:reportMess
  };
    try{
      fetchReportedUserId();
        const response= await fetch(`http://localhost:7264/medbuddy/reportuser/${repUserId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${authorisation}`
          },
          body: JSON.stringify(reportData)
        });
  
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
            console.log('Report submited successfully');
        }
  
    } catch (error) {
        console.error('Error submiting report:', error);
        window.alert('An error occured.Please try again later.');
    } 
  };
    return (

        <div className="forum--container">
           <p class="title-forum">We would love to hear from you! Let's get in touch! </p>

             <div className="full-name-forum">
            <label>Full name</label>
              <input
                 type="text"/>

             </div>
           <div className="email-forum">
            <label>Email of Reported Person</label>
              <input
                 type="email" value={reportedUserEmail}
                 onChange={(e) => setReportedUserEmail(e.target.value)}/>

             </div>
           <div className="message-forum">
            <label>Your Message</label>
              {/* <input */}
                 {/* type="text"/> */}
                 <textarea id="message" name="message" rows="7" cols="50" value={reportMess} 
                 onChange={(e) => setReportMess(e.target.value)}></textarea>

             </div>
           

           <button className="submit--button-forum" onClick={handleSubmitReport}>Submit message</button>

           


        </div>

    )
}
export default Forum;