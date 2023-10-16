import React, {useContext, useEffect} from 'react'
import BookFinder from '../Apis/BookFinder';
import { BookContext } from '../cAPI';
import { useNavigate } from 'react-router-dom'

const BookList = (props) => {
  const {books, setBooks, selectedCategory} = useContext(BookContext)
  
  const navigate = useNavigate()

  useEffect(() => {
    const fetchdata = async () => {
      if (selectedCategory) {
        try {
          const response = await BookFinder.get("/", { params: {category: selectedCategory}})
          console.log (response)
          setBooks(response.data.data.books);
        } catch (err) {
          console.log(err);
        }
      }else{
        try {
          const response = await BookFinder.get("/");
          setBooks(response.data.data.books);
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchdata();
  },[setBooks, selectedCategory])

  return (
      <div className="mb-3">
        <div>
        <label></label>  
        <input className="form-control" type="text" value={selectedCategory} disabled readOnly /> </div>
        <table className="table table-striped-columns">
          <thead>
            <tr className="table-dark">
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Year</th>
              <th scope="col">Publisher</th>
              <th scope="col">ISBN</th>
              <th scope="col">Category</th>
            </tr>
          </thead>
          <tbody>
            {books && books.map((books) => {
              return (
                <tr onClick={(e) => navigate(`/${books.isbn}`)} key={books.isbn}>
                  <td>{books.title}</td>
                 <td>{books.author}</td>
                  <td>{books.year}</td>
                  <td>{books.publisher}</td>
                  <td>{books.isbn}</td>
                  <td>{books.category}</td> 
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>      
  )
};

export default BookList
