import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import RoundedBtn from "./Common/RoundedBtn";
import { messagesData } from "../data/conversation";
import { MdSearch, MdSend } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { BiHappy } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { chat9, cs2 } from "../assets/conversation";
import { getTime } from "../logic/conversation";
import { LuSendHorizonal } from "react-icons/lu";

function ChatDetail() {
    const [messages, setMessages] = useState(messagesData);
    const [typing, setTyping] = useState(false);

    const inputRef = useRef(null);
    const bottomRef = useRef(null);

    // Functions

    const addMessage = (msg) => {
        const newMessages = [...messages, msg];
        setMessages(newMessages);
    };

    const handleEmojiClick = () => {
        inputRef.current.value += "🔥";
        inputRef.current.focus();
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

    return (
        // ChatDetail main container
        <div className="flex flex-col h-screen">
            {/* Contact nav */}
            <div className="flex justify-between bg-[#069DAE] h-[60px] p-3">
                {/* Contact info */}
                <div className="flex items-center justify-center">
                    {/* Profile picture */}
                    <img
                        src={chat9}
                        alt="profile_picture"
                        className="rounded-full w-[45px] h-[45px] mr-5"
                    />

                    {/* Info */}
                    <div>
                        {/* Contact */}
                        <h1 className="text-white text-lg font-medium mt-2">Sarah</h1>

                    </div>
                </div>

                {/* Buttons
                <div className="flex justify-end items-center w-[85px]">

                    <RoundedBtn icon={<HiDotsVertical />} />
                </div> */}
            </div>

            {/* Messages section */}
            <div
                className="bg-[#DEF9F1] bg-contain overflow-y-scroll h-100"
                style={{ padding: "12px 7%" }}
            >
                {messages.map((msg) => (
                    <Message
                        msg={msg.msg}
                        time={msg.time}
                        isLink={msg.isLink}
                        img={msg.img}
                        sent={msg.sent}
                    />
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Bottom section */}
            <div className="flex items-center bg-[#002845] w-100 h-[70px] p-2">


                {/* Upload btn */}
                <span className="mr-2">
                    <RoundedBtn icon={<AiOutlinePaperClip />} onClick={handleImgUpload} />
                </span>

                {/* Input bar */}
                <input
                    type="text"
                    placeholder="Type a message"
                    className="bg-[#069DAE] rounded-lg outline-none text-sm text-neutral-200 w-100 h-100 px-3 placeholder:text-sm placeholder:text-[#ffffff]"
                    onChange={handleInputChange}
                    ref={inputRef}
                />
                <span className="mr-2">
                    <RoundedBtn icon={<LuSendHorizonal />} />
                </span>

            </div>
        </div>
    );
}

export default ChatDetail;
