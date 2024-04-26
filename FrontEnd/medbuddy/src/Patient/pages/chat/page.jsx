import React from "react";
import styles from "./page.module.scss";
export default function ChatPage(){

    return(
        <>
            <div className={`${styles.page__messages_navbar}`}>
                <nav className={`${styles.page__message_area_navbar}`}>

                </nav>
            </div>
            <div className={`${styles.page__message_area}`}>
                <div className={`${styles.page__message_container}`}>

                </div>
                <div className={`${styles.page__message_input}`}>
                    <input type="text" className={`${styles.page__message_area_question}`} placeholder="Ask your question">

                    </input>
                    <input type="text" className={`${styles.page__message_area_file}`} placeholder="Ask your question">

                    </input>
                    <input type="submit" className={`${styles.page__message_area_send_button}`}>
                        
                    </input>
                </div>
            </div>
        </>
    )
}