import { createContext, useContext, useState } from "react";
import CommentData from "../../../data.json"

const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children}) {
    const [currentUser, setCurrentUser] = useState(CommentData.currentUser);
    return (
        <CurrentUserContext.Provider value={currentUser}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export function useCurrentUser() {
    return useContext(CurrentUserContext);
}