import React, {useContext, useEffect} from 'react'
import BookFinder from '../Apis/BookFinder';
import { BookContext } from '../cAPI';
import { useNavigate } from 'react-router-dom'

//let navigate = useNavigate

const BookList = (props) => {
  const {books, setBooks} = useContext(BookContext)
  
  const navigate = useNavigate()

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await BookFinder.get("/");
        setBooks(response.data.data.books);
      } catch (err) {
        console.log(err);
      }
    }
    fetchdata();
  },[])

  return (
    <div>
      <div className="mb-3 d-grid gap-2 d-md-flex justify-content-md-end">
        <button onClick={(e) => navigate(`/addbook`)} className="btn btn-danger">Add Book</button>
      </div>
      <div className="mb-3">
        <table className="table table-striped-columns">
          <thead>
            <tr className="table-dark">
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Year</th>
              <th scope="col">Publisher</th>
              <th scope="col">ISBN</th>
            </tr>
          </thead>

          <tbody>
            {books && books.map((books) => {
              return (
                <tr onClick={() => navigate(`/${books.isbn}`)} key={books.isbn}>
                  <td>{books.title}</td>
                 <td>{books.author}</td>
                  <td>{books.year}</td>
                  <td>{books.publisher}</td>
                  <td>{books.isbn}</td> 
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>      
  )
};

export default BookList
