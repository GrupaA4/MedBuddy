// import React, { useState, useEffect, useRef } from "react";
// import Message from "./Message";
// import RoundedBtn from "./Common/RoundedBtn";
// import { messagesData } from "../data/conversation";
// import { MdSearch, MdSend } from "react-icons/md";
// import { HiDotsVertical } from "react-icons/hi";
// import { BiHappy } from "react-icons/bi";
// import { AiOutlinePaperClip } from "react-icons/ai";
// import { BsFillMicFill } from "react-icons/bs";
// import { chat4, cs2 } from "../assets/conversation";
// import { getTime } from "../logic/conversation";
// import { LuSendHorizonal } from "react-icons/lu";
// function ChatDetail({ conversationId }) {
//     const [messages, setMessages] = useState(messagesData);
//     const [typing, setTyping] = useState(false);

//     const inputRef = useRef(null);
//     const bottomRef = useRef(null);

//     useEffect(() => {
//         if (conversationId) {
//             const fetchMessages = async () => {
//                 try {
//                     // Fetch messages using conversationId
//                     const response = await fetch(`/medbuddy/conversation/${conversationId}/messages`);
//                     const data = await response.json();
//                     setMessages(data.messages);
//                 } catch (error) {
//                     console.error('Error fetching messages:', error);
//                 }
//             };

//             fetchMessages();
//         }
//     }, [conversationId]);

//     // Functions

//     const addMessage = (msg) => {
//         const newMessages = [...messages, msg];
//         setMessages(newMessages);
//     };


//     const handleImgUpload = () => {
//         addMessage({
//             img: cs2,
//             time: getTime(),
//             sent: true,
//         });
//     };

//     const handleInputChange = () => {
//         inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
//     };

//     const handleInputSubmit = () => {
//         if (inputRef.current.value.length > 0) {
//             addMessage({
//                 msg: inputRef.current.value,
//                 time: getTime(),
//                 sent: true,
//             });
//             inputRef.current.value = "";
//             inputRef.current.focus();
//             setTyping(false);
//         }
//     };

//     useEffect(() => {
//         bottomRef.current?.scrollIntoView({
//             behavior: "smooth",
//         });
//     }, [messages]);

//     useEffect(() => {
//         const listener = (e) => {
//             if (e.code === "Enter") handleInputSubmit();
//         };

//         document.addEventListener("keydown", listener);
//         return () => document.removeEventListener("keydown", listener);
//     });

//     if (!conversationId) {
//         return <div>Select a conversation to start chatting</div>;
//     }

//     return (
//         // ChatDetail main container
//         <div className="flex flex-col h-screen">
//             {/* Contact nav */}
//             <div className="flex justify-between bg-[#069DAE] h-[60px] p-3">
//                 {/* Contact info */}
//                 <div className="flex items-center justify-center">
//                     {/* Profile picture */}
//                     <img
//                         src={chat4}
//                         alt="profile_picture"
//                         className="rounded-full w-[45px] h-[45px] mr-5"
//                     />

//                     {/* Info */}
//                     <div>
//                         {/* Contact */}
//                         <h1 className="text-white text-lg font-medium mt-2">Sarah</h1>

//                     </div>
//                 </div>

//                 {/* Buttons
//                 <div className="flex justify-end items-center w-[85px]">

//                     <RoundedBtn icon={<HiDotsVertical />} />
//                 </div> */}
//             </div>

//             {/* Messages section */}
//             <div
//                 className="bg-[#DEF9F1] bg-contain overflow-y-scroll h-100"
//                 style={{ padding: "12px 7%" }}
//             >
//                 {messages.map((msg) => (
//                     <Message
//                         key={i}
//                         msg={msg.msg}
//                         time={msg.time}
//                         isLink={msg.isLink}
//                         img={msg.img}
//                         sent={msg.sent}
//                     />
//                 ))}
//                 <div ref={bottomRef} />
//             </div>

//             {/* Bottom section */}
//             <div className="flex items-center bg-[#002845] w-100 h-[70px] p-2">


//                 {/* Upload btn */}
//                 <span className="mr-2">
//                     <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} />
//                 </span>

//                 {/* Input bar */}
//                 <input
//                     type="text"
//                     placeholder="Type a message"
//                     className="bg-[#069DAE] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#ffffff]"
//                     onChange={handleInputChange}
//                     ref={inputRef}
//                 />
//                 <span className="mr-2">
//                     <RoundedBtn icon={<LuSendHorizonal />} />
//                 </span>

//             </div>
//         </div>
//     );
// }

// export default ChatDetail;


import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import RoundedBtn from "./Common/RoundedBtn";
import { cs2 } from "../assets/conversation";
import { getTime } from "../logic/conversation";
import { LuSendHorizonal } from "react-icons/lu";
import { AiOutlinePaperClip } from "react-icons/ai";

function ChatDetail({ conversationId }) {
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [senderInfo, setSenderInfo] = useState(null);

    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {

        const fetchSenderInfo = async (senderId) => {
            try {
                const response = await fetch(`/medbuddy/getbasicinfo/${senderId}`);
                const data = await response.json();
                setSenderInfo(data);
            } catch (error) {
                console.error('Error fetching sender info:', error);
            }
        };


        if (conversationId) {
            const fetchInitialMessages = async () => {
                setLoading(true); //
                try {

                    const response = await fetch(`/medbuddy/conversation/${conversationId}/0/10`);
                    const data = await response.json();
                    setMessages(data.messages);
                    setStartIndex(data.messages.length);
                    setHasMore(data.numberOfMessagesReturned === 10);
                    if (data.messages.length > 0) {
                        fetchSenderInfo(data.messages[0].senderId);
                    }
                } catch (error) {
                    console.error('Error fetching messages:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchInitialMessages();
        }
    }, [conversationId]);


    const fetchMoreMessages = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {

            const response = await fetch(`/medbuddy/conversation/${conversationId}/${startIndex}/${startIndex + 10}`);
            const data = await response.json();

            setMessages((prevMessages) => [...prevMessages, ...data.messages]);
            setStartIndex(startIndex + data.numberOfMessagesReturned);
            setHasMore(data.numberOfMessagesReturned === 10);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };


    const addMessage = (msg) => {
        const newMessages = [...messages, msg];
        setMessages(newMessages);
    };


    const handleImgUpload = () => {
        addMessage({
            img: cs2,
            time: getTime(),
            sent: true,
        });
    };


    const handleInputChange = () => {
        inputRef.current.value.length === 0 ? setTyping(false) : setTyping(true);
    };


    const handleInputSubmit = () => {
        if (inputRef.current.value.length > 0) {
            addMessage({
                msg: inputRef.current.value,
                time: getTime(),
                sent: true,
            });
            inputRef.current.value = "";
            inputRef.current.focus();
            setTyping(false);
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);


    useEffect(() => {
        const listener = (e) => {
            if (e.code === "Enter") handleInputSubmit();
        };

        document.addEventListener("keydown", listener);
        return () => document.removeEventListener("keydown", listener);
    });


    const handleScroll = () => {
        if (chatContainerRef.current) {
            const { scrollTop } = chatContainerRef.current;
            if (scrollTop === 0) {
                fetchMoreMessages();
            }
        }
    };

    if (!conversationId) {
        return <div>Select a conversation to start chatting</div>;
    }

    return (
        // Container principal pentru ChatDetail
        <div className="flex flex-col h-screen">
            {/* Nav pentru informațiile despre contact */}
            <div className="flex justify-between bg-[#069DAE] h-[60px] p-3">
                {/* Informații despre contact */}
                <div className="flex items-center justify-center">
                    {/* Poza de profil */}
                    {senderInfo && (
                        <img
                            src={senderInfo.profileImage}
                            alt="profile_picture"
                            className="rounded-full w-[45px] h-[45px] mr-5"
                        />
                    )}
                    {/* Info despre contact */}
                    <div>
                        {/* Numele contactului */}
                        {senderInfo && (
                            <h1 className="text-white text-lg font-medium mt-2">
                                {senderInfo.firstName} {senderInfo.lastName}
                            </h1>
                        )}
                    </div>
                </div>
            </div>

            {/* Secțiunea de mesaje */}
            <div
                className="bg-[#DEF9F1] bg-contain overflow-y-scroll h-100"
                style={{ padding: "12px 7%" }}
                ref={chatContainerRef}
                onScroll={handleScroll}
            >
                {messages.map((msg, i) => (
                    <Message
                        key={msg.messageId}
                        msg={msg.message}
                        time={msg.sentAt}
                        img={msg.image}
                        isRead={msg.isRead}
                        sent={msg.isFromMedBuddy}
                    />
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Secțiunea de input */}
            <div className="flex items-center bg-[#002845] w-100 h-[70px] p-2">
                {/* Buton pentru încărcarea unei imagini */}
                <span className="mr-2">
                    <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} />
                </span>

                {/* Bara de input */}
                <input
                    type="text"
                    placeholder="Type a message"
                    className="bg-[#069DAE] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#ffffff]"
                    onChange={handleInputChange}
                    ref={inputRef}
                />
                {/* Buton pentru trimiterea mesajului */}
                <span className="mr-2">
                    <RoundedBtn icon={<LuSendHorizonal />} onClick={handleInputSubmit} />
                </span>
            </div>
        </div>
    );
}

export default ChatDetail;
