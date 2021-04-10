import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Image, Row, Col, ListGroup, Card, ListGroupItem, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import { listProductDetails, createProductReview } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({match, history}) => {

const [qty, setQty] = useState(1)
const [rating, setRating] = useState(0)
const [comment, setComment] = useState('')





const dispatch = useDispatch()

//Import from productDetails reducer
const productDetails =  useSelector  (state=>state.productDetails)
const {loading, error, product } = productDetails


const productReviewCreate =  useSelector  (state=>state.productReviewCreate)
const {error:errorReview, success:successReview} = productReviewCreate

const userLogin =  useSelector  (state=>state.userLogin)
const {userInfo } = userLogin


 
    useEffect(()=>{
        if(successReview){
            alert('Review submitted')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails (match.params.id))
    }, [dispatch, match, successReview]);



    const addToCartHandler = ()=>{
          history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch (createProductReview(match.params.id, {
            rating,
            comment
        }))

    }


    return (
        <> 
        <Link className = 'btn btn-dark my-3' to='/'>Go Back </Link>
        {loading? <Loader /> :error? <Message variant='danger'>{error}</Message>:(
            <> <Row>
         <Col md ={6}>
             <Image src={ product.image} alt = {product.name} fluid  /></Col>
         <Col md = {3}>
             <ListGroup variant ='flush'> 
             <ListGroup.Item> <h3>{product.name}</h3></ListGroup.Item>
             <ListGroup.Item><Rating value={product.rating} text = {`${product.numReviews}reviews`}/></ListGroup.Item>
             <ListGroup.Item> Price: Kes.{product.price}</ListGroup.Item>
             <ListGroup.Item> Description:{product.description}</ListGroup.Item>


               
             </ListGroup>
            
         </Col>
         <Col md={3}>
             <Card>
                 <ListGroup variant='flush'>
                     <ListGroupItem>
                         <Row>
                             <Col>Price:</Col>
                             <Col><strong>Kes. {product.price}</strong></Col>

                         </Row>
                     </ListGroupItem>
                     <ListGroupItem>
                         <Row>
                             <Col>Status:</Col>
                             <Col><strong>{product.countInStock> 0 ? 'In Stock': 'Out of Stock '}</strong></Col>

                         </Row>
                     </ListGroupItem>
                     {product.countInStock > 0 && (
                         <ListGroup.Item>
                             <Row>
                                 <Col>
                                 <Form.Control
                                 as ='select'
                                 value = {qty}
                                 onChange = {(e) =>setQty(e.target.value)}
                                 >
                                     {
                                         [
                                             ...Array(product.countInStock).keys()].map(
                                                 x=>(
                                                     <option key = {x+1} value = {x+1}>
                                                         {x+1}

                                                     </option>
                                                 )
                                             )
                                     }


                                 </Form.Control>
                                 </Col>
                             </Row>

                         </ListGroup.Item>
                     )}
                     <ListGroupItem>
                         <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock==0}>
                            Add to cart
                         </Button>
                     </ListGroupItem>
                 </ListGroup>
             </Card>
         </Col>

     </Row>
     <Row>
         <Col md={6}>

             <h2> Reviews</h2>
            {errorReview && <Message variant='danger'>{errorReview}</Message>}
             {product.reviews.length===0 && <Message> No Reviews </Message>}
             <ListGroup variant= 'flush'>
                 {product.reviews.map( review =>(
                     <ListGroup.Item key = {review._id}>
                         <strong> {review.name}</strong>
                         <Rating value= {review.rating} />
                         <p>Reviewed on: {review.createdAt.substring(0, 10)}</p>
                         <p><stong>Comment:</stong> {review.comment}</p>
                     </ListGroup.Item>
                     )
                 )}
                 <ListGroup.Item><h2>Customer Review</h2>
                 {userInfo? (
                      <Form onSubmit = {submitHandler}>
                          <Form.Label >Rating </Form.Label>
                          <Form.Group controlId = 'rating'>
                              <Form.Control as = 'select' value = {rating} onChange={(e)=>setRating(e.target.value)}>
                                  <option value = '1'>1</option>
                                  <option value = '2'>2</option>
                                  <option value = '3'>3</option>
                                  <option value = '4'>4</option>
                                  <option value = '5'>5</option>
                              </Form.Control>
                          </Form.Group>
                          <Form.Group controlId = 'comment'>
                              <Form.Label>Comment</Form.Label>
                              <Form.Control as = 'textarea' row='3' value = {comment} onChange={(e)=>setComment(e.target.value)}>

                              </Form.Control>
                          </Form.Group>
                          <Button variant= 'primary' type = 'submit'>Submit</Button>
                 </Form>):
                 (<Message> Please <Link to = '/login'>Sign In</Link> to write a review </Message>)}
                 </ListGroup.Item>
             </ListGroup>
         </Col>

     </Row>
     </>
       )
         }
        </>    )
}

export default ProductScreen
