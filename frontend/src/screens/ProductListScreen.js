import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct, createProduct, updateProduct}  from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'




const ProductListScreen  = ({history, match}) => {
  const dispatch = useDispatch()

const productList = useSelector(state=>state.productList)
const{ products, error, loading } =  productList

const userLogin = useSelector(state=>state.userLogin)
const{userInfo} =  userLogin

const productDelete = useSelector((state)=>state.productDelete)
const{error:errorDelete, success:successDelete, loading:loadingDelete} = productDelete

const productCreate = useSelector((state)=>state.productCreate)
const{loading:loadingCreate,
      success:successCreate,
      product:createdProduct,
      error:errorCreate} = productCreate





  useEffect(()=>{
    dispatch({type: PRODUCT_CREATE_RESET})

      if(!userInfo.isAdmin){
        history.push('/login')
      }
      if(successCreate){
        history.push(`/admin/product/${createdProduct._id}/edit`)
      }
      else{
       dispatch(listProducts())

      }



  }, [dispatch, history, successDelete, successCreate, createdProduct])

  const deleteHandler=(id)=>{

    if (window.confirm('Are you sure?')){
          dispatch(deleteProduct(id))
          dispatch(listProducts())


    }


  }

  const createProductHandler = (product)=>{
      dispatch(createProduct())
  }

  return (
    <>
    <Row>
       <Col> <h1> Products</h1></Col>
       <Col className = 'text-right'>
           <Button onClick = {createProductHandler}>
               <i className='fas fa-plus'></i> Create Product
           </Button>
       </Col>
    </Row>
    {loadingDelete && <Loader />}
    {errorDelete && <Message>{errorDelete}</Message>}
    {loadingCreate && <Loader />}
    {errorCreate && <Message>{errorCreate}</Message>}
     
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>Kshs.{product.price} </td>
                <td>{product.category}</td>
                <td>{product.brand}</td>

                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen 
