import styles from "./page.module.scss";
import Send from "../../images/send-msg.svg";
import Choose from "../../images/add-files.svg";
import Robo_icon from "../../images/robo_icon.svg";
import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
//import { useHistory } from 'react-router-dom';

export default function ChatPage() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isNewMessage, setIsNewMessage] = useState(false); 
    const messageContainerRef = useRef(null);
    // const history = useHistory();

    // const handleBackToHomepage = () => {
    //     history.push('/'); // Navigate to the homepage
    // };
    
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            handleSend(); // Trimite mesajul
        }
    };

    const handleSend = () => {
        if (message.trim() !== '') {
            const newMessage = { id: Date.now(), text: message };
            setMessages([...messages, newMessage]); // Adaugă noul mesaj în array-ul de mesaje
            setMessage(''); // Resetează caseta de text după trimitere

            setIsNewMessage(true);
            setTimeout(() => {
                setIsNewMessage(false);
            }, 2000);

            if (messageContainerRef.current) {
                messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
            }
        }
    };

    const handleNewConvo = () => {
      
    };
    return(
        <>
            <div className={`${styles.page__message_area}`}>
                <div className={styles.page__main_container} >
                    <div className={styles.page__message_header}>
                        <img 
                            className={`${styles.page__message_header__img}`} 
                            src={Robo_icon}
                            alt="robot icon"
                        />
                        <div className={styles.page__message_header__status}>
                            <h3>MedBuddy</h3>
                            <div className={styles.header__status}>
                                <FontAwesomeIcon icon={faCircle} className={styles.status__icon}/>
                                <p>Online</p>
                            </div>
                        </div>
                    </div>
                    <div ref={messageContainerRef} className={`${styles.page__message_container} `}>
                            {messages.map((msg) => (
                                    <div key={msg.id}  className={styles.page__message}>{msg.text}</div>
                            ))}
                    </div>
                </div>
                
                <div className={`${styles.page__message_buttons}`}>
                    <button className={`${styles.page__message_buttons_action}`} >
                        Back to Homepage
                    </button>
                    <button className={`${styles.page__message_buttons_action}`} onClick={handleNewConvo}>
                        New Discussion
                    </button>
                </div>
                <div className={`${styles.page__message_input}`}>
                    <textarea 
                        className={`${styles.page__message_area_question}`} 
                        placeholder="Ask your question" value={message}
                        onChange={handleMessageChange} onKeyPress={handleKeyPress} />
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