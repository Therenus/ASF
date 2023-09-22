import React, {useState, createContext} from "react";

export const BookContext = createContext()

export const BookContextProvider = props =>{
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectetBook] = useState("");
    
    return(
        <BookContext.Provider 
            value={{
                books, 
                setBooks,
                selectedBook,
                setSelectetBook
            }}
        >
            {props.children}
        </BookContext.Provider>
    )

}