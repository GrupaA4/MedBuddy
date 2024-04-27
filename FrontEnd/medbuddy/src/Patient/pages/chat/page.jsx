import React from "react";
import styles from "./page.module.scss";
import Send from "../../images/send-msg.svg";
import Choose from "../../images/add-files.svg";
import { useState } from "react";
export default function ChatPage(){
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);

    const handleSend = () => {
        // handle sending the message and file here
    };

    const handleNewConvo = () => {
        // handle sending the message and file here
    };
    return(
        <>
            <div className={`${styles.page__message_area}`}>
                <div className={`${styles.page__message_container}`}>

                </div>
                <div className={`${styles.page__message_buttons}`}>
                    <button className={`${styles.page__message_buttons_action}`} to="/">
                        Back to Welcome
                    </button>
                    <button className={`${styles.page__message_buttons_action}`} onClick={handleNewConvo}>
                        New Discution
                    </button>
                </div>
                <div className={`${styles.page__message_input}`}>
                    <textarea 
                        className={`${styles.page__message_area_question}`} 
                        placeholder="Ask your question" />
                    <div className={`${styles.page__message_area_actions}`}>
                        <label className={`${styles.page__message_area_file}`}>
                            <img 
                                className={`${styles.page__message_area_file_img}`} 
                                src={Choose}
                                alt="choose file"
                            />
                            <input 
                                type="file" 
                                className={`${styles.page__message_area_file_in}`} 
                                >
                            </input>
                        </label>
                        <button 
                            onClick={handleSend}
                            className={`${styles.page__message_area_button}`}
                        >
                            <img className={`${styles.page__message_area_send}`} alt="Send" src={Send}/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}