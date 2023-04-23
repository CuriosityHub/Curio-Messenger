import { createContext, useState } from "react";
export const StyleContext = createContext()

export const StyleContextProvider = ({ children }) => {
    const [chatRes, setChatRes] = useState(false);

    const handleChatRes = () => {
        setChatRes(true);
    }

    const handleChatResPrev = () => {
        setChatRes(false);
    }

    return (
        <StyleContext.Provider value={{ chatRes, handleChatRes, handleChatResPrev }}>
            {children}
        </StyleContext.Provider>
    )
}