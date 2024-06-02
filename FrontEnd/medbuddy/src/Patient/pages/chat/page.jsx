import React, { useState, useRef, useEffect } from "react";
import styles from "./page.module.scss";
import Send from "../../images/send-msg.svg";
import Choose from "../../images/add-files.svg";
import Robo_icon from "../../images/robo_icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const userId = "c6028efa-d76c-4bc5-aa3f-c12f2b9dce9c"; 
const conversationId = "2"; 

export default function ChatPage() {
    const [message, setMessage] = useState('');
    const [userMessages, setUserMessages] = useState([]);
    const [responseMessages, setResponseMessages] = useState([]);
    const messageContainerRef = useRef(null);
    const [image, setImage] = useState(null);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            handleSend(); 
        }
    };

    const handleSend = async () => {
        if (message.trim() !== '' || image) {
            const newMessage = {
                id: Date.now(),
                sender: 'user',
                text: message,
                image: image,
                repliesTo: null 
            };
            
            setUserMessages([...userMessages, newMessage]);
            setMessage('');
            setImage(null);

            try {
                const formData = new FormData();
                formData.append('message', message);
                if (image) {
                    formData.append('image', image);
                }
                formData.append('repliesTo', null); 
                const response = await fetch(`https://2e0181e9-dcc6-4113-a5fa-4d90638f077c.mock.pstmn.io/medbuddy/chat/send`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                simulateResponse();
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    const simulateResponse = async () => {
        try {
            const response = await fetch('https://2e0181e9-dcc6-4113-a5fa-4d90638f077c.mock.pstmn.io/medbuddy/chat/receive', {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const newMessages = data.map(msg => ({
                id: msg.id,
                sender: 'medbuddy',
                text: msg.text,
            }));
            setResponseMessages([...responseMessages, ...newMessages]);
        } catch (error) {
            console.error("Error fetching response messages:", error);
        }
    };
    

    const simulateResponseWithFile = () => {
        setTimeout(() => {
            setResponseMessages([...responseMessages, { id: Date.now(), sender: 'medbuddy', text: "I added the file!" }]);
        }, 1500); 
    };

    useEffect(() => {
        scrollToBottom();
    }, [userMessages, responseMessages]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.onload = () => {
            const fileData = reader.result; 
            const fileName = file.name;
            const messageWithFile = { id: Date.now(), sender: 'user', text: message, file: fileData, fileName: fileName };
            setUserMessages([...userMessages, messageWithFile]);
            setMessage('');

            simulateResponseWithFile();
        };
        reader.readAsDataURL(file);
    };

    const handleNewConvo = () => {
        setUserMessages([]); 
        setResponseMessages([]);
    };
    
    const combinedMessages = [];
    const totalMessages = Math.max(userMessages.length, responseMessages.length);
    for (let i = 0; i < totalMessages; i++) {
        if (userMessages[i]) {
            combinedMessages.push(userMessages[i]);
        }
        if (responseMessages[i]) {
            combinedMessages.push(responseMessages[i]);
        }
    }

    return(
        <div className={styles.page__message_area}>
            <div className={styles.page__main_container}>
                <div className={styles.page__message_header}>
                    <img 
                        className={styles.page__message_header__img} 
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
                <div ref={messageContainerRef} className={styles.page__message_container}>
                    {combinedMessages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`${styles.page__msg} ${msg.sender === 'user' ? styles.page__message : styles.page__response}`}
                        >
                            {msg.file ? (
                                <div>
                                    <a href={msg.file} download>{msg.fileName}</a>
                                    <div>{msg.text}</div>
                                </div>
                            ) : (
                                <div>{msg.text}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.page__message_buttons}>
                <button className={styles.page__message_buttons_action} onClick={() => window.location.href = '/'}>
                    Back to Homepage
                </button>
                <button className={styles.page__message_buttons_action} onClick={() => window.location.href = '/diagnoses'}>
                    See Diagnoses
                </button>
                <button className={styles.page__message_buttons_action} onClick={handleNewConvo}>
                    New Discussion
                </button>
            </div>
            <div className={styles.page__message_input}>
                <textarea 
                    className={styles.page__message_area_question} 
                    placeholder="Ask your question" 
                    value={message}
                    onChange={handleMessageChange} 
                    onKeyPress={handleKeyPress} 
                />
                <div className={styles.page__message_area_actions}>
                    <label className={styles.page__message_area_file}>
                        <img 
                            className={styles.page__message_area_file_img} 
                            src={Choose}
                            alt="choose file"
                        />
                        <input 
                            type="file" 
                            className={styles.page__message_area_file_in} 
                            onChange={handleFileChange} 
                        />
                    </label>
                    <button 
                        onClick={handleSend}
                        className={styles.page__message_area_button}
                    >
                        <img className={styles.page__message_area_send} alt="Send" src={Send}/>
                    </button>
                </div>
            </div>
        </div>
    )
}
