import { createContext, useContext, useReducer, useState } from "react";
import Data from '../../../data.json';

const CommentsContext = createContext(null);
const CommentLengthContext = createContext(0);
// const CommentsDispatchContext = createContext(null);

export function CommentsProvider({ children }) {
    // const [comments, dispatchComments] = useReducer(commentsReducer, Data.comments);
    // return (
    //     <CommentsContext.Provider value={comments}>
    //         <CommentsDispatchContext.Provider value={dispatchComments}>
    //             {children}
    //         </CommentsDispatchContext.Provider>
    //     </CommentsContext.Provider>
    // )

    const [comments, setComments] = useState(Data.comments);
    const [commentsLength, setCommentsLength] = useState(5);
    return (
        <CommentsContext.Provider value={{ comments, setComments }}>
            <CommentLengthContext.Provider value={{ commentsLength, setCommentsLength }}>
                {children}
            </CommentLengthContext.Provider>
        </CommentsContext.Provider>
    )
}

export function useComments() {
    return useContext(CommentsContext);
}

export function useCommentsLength() {
    return useContext(CommentLengthContext);
}

// export function useCommentsDispatch() {
//     return useContext(CommentsDispatchContext);
// }

function commentsReducer(comments, action) {
    // switch (action.type) {
    //     case ''
    // }
}