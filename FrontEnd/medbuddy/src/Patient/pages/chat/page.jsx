import styles from "./page.module.scss";
import Send from "../../images/send-msg.svg";
import Choose from "../../images/add-files.svg";
import React, { useState, useEffect } from "react";

export default function ChatPage() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isNewMessage, setIsNewMessage] = useState(false); 

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Evită comportamentul implicit al apăsării tastei Enter (de a face un newline)
            handleSend(); // Trimite mesajul
        }
    };

    const handleSend = () => {
        if (message.trim() !== '') {
            const newMessage = { id: Date.now(), text: message };
            setMessages([...messages, newMessage]); // Adaugă noul mesaj în array-ul de mesaje
            setMessage(''); // Resetează caseta de text după trimitere

            setIsNewMessage(true);
            // Resetarea state-ului isNewMessage după 2 secunde
            setTimeout(() => {
                setIsNewMessage(false);
            }, 2000);
        }
    };

    const handleNewConvo = () => {
        // handle sending the message and file here
    };
    return(
        <>
            <div className={`${styles.page__message_area}`}>
            <div className={`${styles.page__message_container} `}>
                    {messages.map((msg) => (
                            <div key={msg.id}  className={styles.page__message}>{msg.text}</div>
                    ))}
                </div>
                <div className={`${styles.page__message_buttons}`}>
                    <button className={`${styles.page__message_buttons_action}`} to="/">
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