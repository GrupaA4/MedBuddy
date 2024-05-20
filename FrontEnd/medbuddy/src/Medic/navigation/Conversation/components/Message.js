import React from "react";

function Message({ msg, time, img, isRead, sent }) {
    return (
        // Message container
        <div
            className={`flex justify-start items-start rounded-md text-left w-fit my-1 ${sent ? " bg-[#069DAE] ml-auto" : "bg-[#002846] mr-auto"
                }`}
        >

            <div
                className="flex justify-between items-end max-w-[410px] p-2"
                style={{ wordBreak: "break-word" }}
            >

                <p className="text-white text-sm mr-2">{msg}</p>

                <p className="text-[#8796a1] text-[10px] min-w-[50px]">{time}</p>
            </div>

        </div>
    );
}

export default Message;
