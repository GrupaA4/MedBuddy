import React, { useState, useEffect } from "react";
import Chat from "./Chat";

const Chats = ({ filter, email, onSelectConversation }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                // Fetch userId cu email primit prin parametru
                const userIdResponse = await fetch(`/medbuddy/getuserid/${email}`);
                const userIdData = await userIdResponse.json();
                const userId = userIdData.id;

                // Fetch conversations using userId
                const conversationsResponse = await fetch(`/medbuddy/userconversations/${userId}`);
                const conversationsData = await conversationsResponse.json();

                // Fetch informatii (poza profil, nume, prenume pentru fiecare user cu care medicul are conversatie) folosind talksToUserId
                const fetchedChats = await Promise.all(conversationsData.conversations.map(async conv => {
                    const userInfoResponse = await fetch(`/medbuddy/getbasicinfo/${conv.talksToUserId}`);
                    const userInfoData = await userInfoResponse.json();

                    return {
                        id: conv.conversationId, // ID-ul conversatiei
                        pp: userInfoData.profileImage, // Imagine de profil
                        contact: `${userInfoData.firstName} ${userInfoData.lastName}`, // Nume complet
                        msg: conv.lastMessage,
                        time: conv.sentAt,
                        unreadMsgs: conv.hasUnreadMessages
                    };
                }));

                const filteredChats = filter
                    ? fetchedChats.filter((chat) => chat.unreadMsgs)
                    : fetchedChats;

                setChats(filteredChats);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        // Primul fetch la montare componenta
        fetchChats();

        // Setarea intervalului pentru a refetch-ui datele la fiecare 5 secunde
        const intervalId = setInterval(fetchChats, 5000);

        // Cleanup interval la demontare componenta
        return () => clearInterval(intervalId);

    }, [filter, email]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        // Chats main container
        <div className="flex flex-col overflow-y-scroll cursor-pointer h-100">
            {/* Chats */}
            {chats.map((chat, i) => (
                <Chat
                    key={i}
                    pp={chat.pp}
                    contact={chat.contact}
                    msg={chat.msg}
                    time={chat.time}
                    unreadMsgs={chat.unreadMsgs}
                    active={i === 0}
                    onClick={() => onSelectConversation(chat.id)}
                />
            ))}
        </div>
    );
}

export default Chats;
