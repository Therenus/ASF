import React, { useState, useContext} from 'react'
import { BookContext } from '../cAPI';
import CategoryFilter from '../Apis/CategoryFilter'

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


const BookFilter = (props) => {
    const { selectedCategory, setSelectedCategory } = useContext(BookContext);
    const [filter, setFilter] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (filter) {
            try {
                const response = await CategoryFilter.get(`/${filter}`);
                setSelectedCategory(response.data.data.category)
            } catch (err) {
                console.log(err);
        }
        }else{
            setSelectedCategory(false)
        }
      };
    
return (
    <Form onSubmit={handleSubmit}>
        <Form.Label>Try AI filter assitant</Form.Label>
        <Row>
            <Col>
                <Form.Control className="me-auto" placeholder="What do you search for?" type="text" name="filter" value={filter} onChange={(e) => setFilter(e.target.value)}/>
            </Col>
            <Col xs="auto">
                <Button variant="danger" size="lg" type="submit">Try AI</Button>
            </Col>
            <Col xs="auto">
                <Button variant="secondary" size="lg" disabled>Old way</Button>   
            </Col>
        </Row>
    </Form>
    )
}

export default BookFilter