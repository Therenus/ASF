import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BookFinder from '../Apis/BookFinder';

const UpdateBook = (props) => {
    const {isbn} = useParams()
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [year, setYear] = useState("")
    const [publisher, setPublisher] = useState("")
    const [language, setLanguage] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const fetchdata = async () => {
          try {
            const response = await BookFinder.get(`/${isbn}`);
            setTitle(response.data.data.books.title);
            setAuthor(response.data.data.books.author);
            setYear(response.data.data.books.year);
            setPublisher(response.data.data.books.publisher);
            setLanguage(response.data.data.books.language);
          } catch (err) {
            console.log(err);
          }
        }
        fetchdata();
      },[isbn])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await BookFinder.put(`/${isbn}`, {
                title,
                author,
                year,
                publisher,
                language,
            })
        } catch (err) {
            console.log(err);            
        }
        navigate(-1)
        
    }

    return (
        <div>
            <h4>{isbn}</h4>
            <form >

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input className="form-control" type="text"
                    id="title"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}  
                    required
                    />
                </div>
  
                <div className="mb-3">
                    <label htmlFor="author" className="form-label">Author</label>
                    <input className="form-control" type="text"
                    id="author"
                    value={author} 
                    onChange={(e) => {setAuthor(e.target.value)}}
                    required
                    />
                </div>
          
                <div className="mb-3">
                    <label htmlFor="year" className="form-label">Year</label>
                    <input className="form-control" type="text"
                    id="year"
                    value={year}
                    onChange={(e) => {setYear(e.target.value)}}
                    placeholder="YYYY"
                    required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="publisher" className="form-label">Publisher</label>
                    <input className="form-control" type="text"
                    id="publisher"
                    value={publisher} 
                    onChange={(e) => {setPublisher(e.target.value)}}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="language" className="form-label">Language</label>
                    <input className="form-control" type="text"
                    id="language"
                    value={language}
                    onChange={(e) => {setLanguage(e.target.value)}}
                    required
                    />
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" onClick={(e) => {e.stopPropagation(); navigate(-1) } } className="btn btn-primary">Back</button>
                <button type="submit" onClick={handleSubmit} className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateBook
