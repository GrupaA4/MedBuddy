import React, { useState, useEffect } from "react";
import LeftMenu from "../components/LeftMenu";
import ChatDetail from "../components/ChatDetail";
import './Conversation.css';

function Conversation() {

    return (
        <>
            <div className="w-screen h-screen overflow-hidden">
                {/* 2 components cointainer */}
                <div className="flex justify-start whatsapp-bp:justify-center items-center bg-[#002845] h-screen">
                    {/* LeftMenu */}
                    <div className="bg-[#002845] min-w-[340px] max-w-[500px] w-100 h-100">
                        <LeftMenu />
                    </div>

                    {/* ChatDetail */}
                    <div className="bg-[#069dae] min-w-[415px] max-w-[1120px] w-100 h-100">
                        <ChatDetail />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Conversation;
