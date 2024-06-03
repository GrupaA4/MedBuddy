import React, { useState, useRef, useEffect } from "react";
import styles from "./page.module.scss";
import Send from "../../images/send-msg.svg";
import Robo_icon from "../../images/robo_icon.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export default function ChatPage() {
    const [message, setMessage] = useState('');
    const [userMessages, setUserMessages] = useState([]);
    const [responseMessages, setResponseMessages] = useState([]);
    const [emailList, setEmailList] = useState([]);
    const [startNewConvo, setStartNewConvo] = useState(false);
    const messageContainerRef = useRef(null);
    const [image, setImage] = useState(null);
    const [disableInput, setDisableInput] = useState(false);

    const getCookieValue = (name) => {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        for(const cookie of cookies) {
            if(cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }
    const emailFromCookie = getCookieValue('user_email');
    const passwordFromCookie = getCookieValue('user_pass');
    const authorisation = btoa(`${emailFromCookie}:${passwordFromCookie}`);

    const sendCloseConversation = async () => {
        try {
            await fetch(`http://localhost:7264/medbuddy/chat/closeconversation`, {
                method: 'HEAD',
                headers: {
                    'Authorization': `Basic ${authorisation}`
                }
            });
        } catch (error) {
            console.error("Error closing conversation:", error);
        }
    };

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
                const messageData = {
                    message: message
                };

                const response = await fetch(`http://localhost:7264/medbuddy/chat/send`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Basic ${authorisation}`
                    },
                    body: JSON.stringify(messageData),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                receiveResponse(0);
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    const receiveResponse = async (flag) => {
        try {
            const response = await fetch(`http://localhost:7264/medbuddy/chat/receive/${flag}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${authorisation}`
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.text();
            const jsonData = JSON.parse(data);

            const newMessage = {
                id: Date.now(),
                sender: "medbuddy",
                text: jsonData.message,
            };

            setResponseMessages((prev) => [...prev, newMessage]);
            checkForEmails(newMessage);
        } catch (error) {
            console.error("Error fetching response messages:", error);
        }
    };

    const checkForEmails = (msg) => {
        const foundEmails = [];

        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
        const emailsFound = msg.text.match(emailRegex);
        if (emailsFound) {
            foundEmails.push(...emailsFound);
            setDisableInput(true);
            sendCloseConversation();
        }

        setEmailList(foundEmails);
    };

    useEffect(() => {
        if (startNewConvo) {
            const startNewConversation = async () => {
                await receiveResponse(1);
                setStartNewConvo(false);
            };

            startNewConversation();
        }
    }, [startNewConvo]);

    useEffect(() => {
        handleNewConvo();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [userMessages, responseMessages]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    const handleBackToHomepage = async () => {
        await sendCloseConversation();
        window.location.href = '/';
    };

    const handleSeeDiagnoses = async () => {
        await sendCloseConversation();
        window.location.href = '/diagnoses';
    };

    const handleNewConvo = async () => {
        setUserMessages([]);
        setResponseMessages([]);
        setEmailList([]);
        setDisableInput(false);

        await new Promise(resolve => setTimeout(resolve, 0));

        setStartNewConvo(true); 
    };

    
    const combinedMessages = [];
    const totalMessages = Math.max(responseMessages.length, userMessages.length);
    for (let i = 0; i < totalMessages; i++) {
        if (responseMessages[i]) {
            combinedMessages.push(responseMessages[i]);
        }

        if (userMessages[i]) {
            combinedMessages.push(userMessages[i]);
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
                            <div>{msg.text}</div>
                        </div>
                    ))}
                    {emailList.length > 0 && (
                        <div className={styles.page__emails}>
                            <div>Discuss your diagnosis with a doctor:</div>
                            <ul>
                                {emailList.map((email, index) => (
                                    <li key={index}>
                                                <a href={`mailto:${email}?subject=${encodeURIComponent('Diagnosis discussion')}`}>{email}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.page__message_buttons}>
                <button className={styles.page__message_buttons_action} onClick={handleBackToHomepage}>
                    Back to Homepage
                </button>
                <button className={styles.page__message_buttons_action} onClick={handleSeeDiagnoses}>
                    See Diagnoses
                </button>
                <button className={styles.page__message_buttons_action} onClick={handleNewConvo}>
                    New Conversation
                </button>
            </div>
            <div className={styles.page__message_input}>
                <textarea 
                    className={styles.page__message_area_question} 
                    placeholder="Ask your question" 
                    value={message}
                    onChange={handleMessageChange} 
                    onKeyPress={handleKeyPress} 
                    disabled={disableInput}
                />
                <div className={styles.page__message_area_actions}> 
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
