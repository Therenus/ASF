import React, {useState, createContext} from "react";

export const BookContext = createContext()

export const BookContextProvider = props =>{
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    
    return(
        <BookContext.Provider 
            value={{
                books, 
                setBooks,
                selectedBook,
                setSelectedBook,
                selectedCategory,
                setSelectedCategory
            }}
        >
            {props.children}
        </BookContext.Provider>
    )

}
