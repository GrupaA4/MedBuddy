import React from "react"
import './Forum.css';


 function Forum() {
    return (
        <div className="forum--container">
           <p class="title">We would love to hear from you! Let's get in touch! </p>

             <div className="full-name">
            <label>Full name</label>
              <input
                 type="text"/>

             </div>
           <div className="email">
            <label>Email</label>
              <input
                 type="text"/>

             </div>
           <div className="message">
            <label>Your Message</label>
              <input
                 type="text"/>

             </div>
           

           <button className="submit--button">Submit message</button>

           


        </div>

    )
}
export default Forum;