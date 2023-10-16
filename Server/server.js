// import .ENV values
//require('dotenv').config();
import {} from 'dotenv/config' ;

// import and define express instance ********************************* 
import express from 'express' ;

import cors from 'cors' ;

import {query} from './db.js' ;

import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.static('public'))
app.use(express.json());

// define listener port from .ENV or default
const PORT = process.env.PORT || 3000;

app.use(express.json());

// connect to openAI API

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// openAI API filtering

// get Category List from DB 

//async function getCategoryList() {
//    try {
//        const categories = await query('SELECT category_name FROM categories');
//        console.log(categories);
//        return categories;
//      } catch (error) {
//          console.error('Chyba při získávání kategorií z databáze:', error);
//          throw error;
//        }
//  }
  

async function assignCategoriesToText(text) {
// get Category List from DB 
    try{
        const categoriesResult = await query('SELECT category_name FROM categories');
        const categories = categoriesResult.rows.map((row) => row.category_name);

        // Call AI api for asssign user input to categories
        
        const response = await openai.completions.create({
            model: "text-davinci-003",
            //prompt: "Say this is a test.",
            //prompt: `Kategorie pro text: "${text}" Kategorie: ${categories}`,
            prompt: `Categorize the following text: "${text}" into one of the following categories: ${categories.join(', ')}., you can suggest more category, if its fits. \n \n`,
            temperature: 0,

        });
  
        // Extract best category
        const bestCategory = response.choices[0].text;
  
        // Extract other suggested category, currently doesnt work, future tune of AI prompt needed, return empty array
        const offeredCategories = response.choices.slice(1).map((choice) => choice.text);
        console.log('Nejvýstižnější kategorie:', bestCategory);
        console.log('Nabídnuté kategorie:', offeredCategories);
        return { bestCategory, offeredCategories };
    } catch (error) {
      console.error('Chyba:', error);
      return { bestCategory: null, offeredCategories: [] };
    }
}

// get text to api Filter
app.get("/filterapiv1.0.0/:text", async (req, res) => {
    try{
        console.log("text to filter", req.params.text) 
        var category = await assignCategoriesToText(req.params.text) 
        console.log ("category:", category.bestCategory) 
        res.status(201).json({
            status: "OK",
            result: "1",
            data: {
            category:category.bestCategory
            } 
        })
        
    } catch(err) {
            console.log(err);
        };
})

// get list of books
app.get('/apiv1.0.0/', async (req, res) => { 
    if (req.query.category) {
        try{
            const result = await query('SELECT * FROM books where $1 = ANY(categories)', [req.query.category]);
            console.log(result)
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

    } else {
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

    }
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
        [req.body.isbn, req.body.author, req.body.title ,req.body.publisher, req.body.year, req.body.language, req.body.translations, req.body.categories]
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
        const result = await query("UPDATE public.books SET author = $2, title = $3, publisher = $4, year = $5, language = $6, translations = $7, categories = $8 WHERE isbn = $1 RETURNING *", 
        [req.params.isbn, req.body.author, req.body.title ,req.body.publisher, req.body.year, req.body.language, req.body.translations, req.body.categories]
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

