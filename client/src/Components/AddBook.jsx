import React, { useState } from 'react'
import BookFinder from '../Apis/BookFinder'
import { useNavigate } from 'react-router-dom'

const AddBook = (props) => {

    const [isbn, setIsbn] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [year, setYear] = useState("")
    const [publisher, setPublisher] = useState("")
    const [language, setLanguage] = useState("")

    const navigate = useNavigate()

    const [form, setForm] = useState("[]")
    const [errors, setErrors] = useState("[]")
    
    const setField = (field, value) => {
        setForm({
           ...form,
           [field]:value 
        })

        if(!!errors[field]){
            setErrors({
                ...errors,
                [field]:null
            })
        }
    }

    const validateForm = () => {
        const {isbn, title, author, year, publisher, language} = form
        const newErrors = {}

        if(!isbn || isbn === ''){
            newErrors.isbn = 'Please add ISBN'
            }else{
                if (isbn.length > 17 || isbn.endsWith('-')){
                    newErrors.isbn = 'Invalid format'
                }else{
                    if (!(/^(\d+-)*(\d+)$/.test(isbn))){
                        newErrors.isbn = 'Can contain only digits and -' 
                    }else{     
                        console.log("gut")
                }}
        }

        if(!title || title === ''){ 
            newErrors.title = 'Please add Title'
        }

        if(!author || author === ''){
            newErrors.author = 'Please add Author'
        }

        if(!year || year === ''){
            newErrors.year = 'Please add year'
            }else{
                if(!(/^[0-9]+$/.test(year))){
                    newErrors.year = 'Can contain only digits'
                }else{
                    if(year.length !== 4){
                        newErrors.year = 'Invalid format'
                    }else{
        }}}
        
        if(!publisher || publisher === ''){
            newErrors.publisher = 'Please add Publisher'
        }

        if(!language || language === ''){
            newErrors.language = 'Please add Language'
        }

        return newErrors
    } 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0){
            setErrors(formErrors)
        }else{
            try{
                await BookFinder.post(`/`, {
                    isbn,
                    title,
                    author,
                    year,
                    publisher,
                    language,
                });
            } catch (err) {
                console.log(err);
            }
            navigate("/")
        }
    };

    return (
        <div>
            <h4>Add New Book Entry</h4>
            <form >

                <div className="mb-3">
                    <label  htmlFor="isbn" className="form-label">ISBN</label>
                    <input className="form-control" type="text" 
                    id="isbn"
                    value={isbn}
                    onChange={(e) => {setIsbn(e.target.value); setField('isbn', e.target.value)}}
                    placeholder="XXX-XX-XX-XXXXX-X" 
                    required
                    />
                    <div>{errors.isbn}</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input className="form-control" type="text"
                    id="title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value); setField('title', e.target.value)}}  
                    required
                    />
                    <div>{errors.title}</div>
                </div>
  
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input className="form-control" type="text"
                    id="author"
                    value={author} 
                    onChange={(e) => {setAuthor(e.target.value); setField('author', e.target.value)}}
                    required
                    />
                    <div>{errors.author}</div>
                </div>
          
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input className="form-control" type="text"
                    id="year"
                    value={year}
                    onChange={(e) => {setYear(e.target.value); setField('year', e.target.value)}}
                    placeholder="YYYY"
                    required
                    />
                    <div>{errors.year}</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label">Publisher</label>
                    <input className="form-control" type="text"
                    id="publisher"
                    value={publisher} 
                    onChange={(e) => {setPublisher(e.target.value); setField('publisher', e.target.value)}}
                    required
                    />
                    <div>{errors.publisher}</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="language" className="form-label">Language</label>
                    <input className="form-control" type="text"
                    id="language"
                    value={language}
                    onChange={(e) => {setLanguage(e.target.value); setField('language', e.target.value)}}
                    required
                    />
                    <div>{errors.language}</div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" onClick={(e) => {e.stopPropagation(); navigate(`/`)}} className="btn btn-primary">Back</button>
                <button type="submit" onClick={handleSubmit} className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddBook
