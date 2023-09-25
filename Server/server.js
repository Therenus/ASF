// import .ENV values
//require('dotenv').config();
import {} from 'dotenv/config' ;

// import and define express instance ********************************* 
import express from 'express' ;

import cors from 'cors' ;

import {query} from './db.js' ;
import * as path from 'path';


const app = express();
app.use(cors());
app.use(express.static('public'))
app.use(express.json());

// define listener port from .ENV or default
const PORT = process.env.PORT || 3000;

app.use(express.json());

// get list of books
app.get('/apiv1.0.0/', async (req, res) => { 
    try{
    const result = await query('SELECT * FROM books');
    res.status(200).json({
        status: "succes",
        result: result.rows.length,
        data: {
            books: result.rows,
        },    
    });
    } catch(err) {
        console.log(err);
    };
})

// get detail view of book
app.get("/apiv1.0.0/:isbn", async (req, res) => {
    try{
        const result = await query("SELECT * FROM books WHERE isbn = $1", [req.params.isbn]);
        res.status(200).json({
            status: "succes",
            data: {
                books: result.rows[0],
            },    
        });
        } catch(err) {
            console.log(err);
        };
})

// create new book entry
app.post("/apiv1.0.0/", async (req, res) => {
    try{
        const result = await query("INSERT INTO public.books VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
        [req.body.isbn, req.body.author, req.body.title ,req.body.publisher, req.body.year, req.body.language, req.body.translation, req.body.tags]
        );
        console.log(result)
        res.status(200).json({
            status: "succes",
            data: {
                books: result.rows[0],
            },    
        });
        } catch(err) {
            console.log(err);
        };
})

// update book entry
app.put("/apiv1.0.0/:isbn", async (req, res) => {
    try{
        const result = await query("UPDATE public.books SET author = $2, title = $3, publisher = $4, year = $5, language = $6, translation = $7, tags = $8 WHERE isbn = $1 RETURNING *", 
        [req.params.isbn, req.body.author, req.body.title ,req.body.publisher, req.body.year, req.body.language, req.body.translation, req.body.tags]
        );
        res.status(200).json({
            status: "succes",
            data: {
                books: result.rows[0],
            },    
        });
        } catch(err) {
            console.log(err);
        };
})

// delete book entry
app.delete("/apiv1.0.0/:isbn", async (req, res) => {
    try{
    const result = await query("DELETE FROM public.books WHERE isbn = $1 RETURNING *", [req.params.isbn]
    );
    res.status(200).json({
        status: "succes",
        data: {
            books: result.rows[0],
        },    
    });
    //res.send(rows)
    } catch(err) {
        console.log(err);
    };
})

// create listener
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})

