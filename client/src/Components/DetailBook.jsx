import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BookContext } from '../cAPI'
import BookFinder from '../Apis/BookFinder'

const BookDetail = (props) => {
  const {isbn} = useParams()
  console.log ("params", useParams)
  console.log ("isbn:", isbn)
  const {selectedBook, setSelectedBook} = useContext(BookContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await BookFinder.get(`/${isbn}`);
            setSelectedBook(response.data.data.books)
        } catch (err) {
            console.log(err);
        }
    }
    fetchData();
},[setSelectedBook, isbn])

    if (selectedBook){
        const handleDelete = async (e, isbn) => {
            e.stopPropagation();
            try {
                const response = await BookFinder.delete(`/${isbn}`);
                navigate(`/`)
            } catch (err) {
                console.log(err);
            }
        }

        return (
            <div className="list-group">                
                <form>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="isbn">ISBN</label>
                        <input className="form-control" type="text" value={selectedBook.isbn} disabled readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input className="form-control" type="text" value={selectedBook.title} disabled readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="author">Author</label>
                        <input className="form-control" type="text" value={selectedBook.author} disabled readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="year">Year</label>
                        <input className="form-control" type="text" value={selectedBook.year} disabled readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="publisher">Publisher</label>
                        <input className="form-control" type="text" value={selectedBook.publisher} disabled readOnly />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="language">Langueage</label>
                        <input className="form-control" type="text" value={selectedBook.language} disabled readOnly />
                        </div>

                </form>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" onClick={(e) => {e.stopPropagation(); navigate(`/`) } } className="btn btn-primary">Back</button>
                    <button type="button" onClick={(e) => {e.stopPropagation(); navigate(`/${selectedBook.isbn}/update`) } } className="btn btn-warning">Update</button>
                    <button type="button" onClick={(e) => handleDelete(e, selectedBook.isbn)} className="btn btn-danger">Delete</button>
                </div>            
            </div>
    )
    }else{
        navigate(`/`)  
    }
}

export default BookDetail