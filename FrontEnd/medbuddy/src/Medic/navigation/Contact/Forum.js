import React from "react"
import './Forum.css';


 function Forum() {
    return (
        <div className="forum--container">
           <p class="title-forum">We would love to hear from you! Let's get in touch! </p>

             <div className="full-name-forum">
            <label>Full name</label>
              <input
                 type="text"/>

             </div>
           <div className="email-forum">
            <label>Email</label>
              <input
                 type="text"/>

             </div>
           <div className="message-forum">
            <label>Your Message</label>
              {/* <input */}
                 {/* type="text"/> */}
                 <textarea id="message" name="message" rows="7" cols="50"></textarea>

             </div>
           

           <button className="submit--button-forum">Submit message</button>

           


        </div>

    )
}
export default Forum;