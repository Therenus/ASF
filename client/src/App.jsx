import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Routes/Home";
import BookDetail from "./Routes/BookDetail";
import BookUpdate from "./Routes/BookUpdate";
import BookAdd from "./Routes/BookAdd";
import { BookContextProvider } from "./cAPI";

const App = () => {
    return (
        <BookContextProvider>
            <div className="container">
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/addbook' element={<BookAdd/>} />
                        <Route path="/:isbn" element={<BookDetail />} />
                        <Route path="/:isbn/update" element={<BookUpdate />} /> 
                    </Routes>
                </Router>
            </div>
        </BookContextProvider>
    );
};

export default App; 