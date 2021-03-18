import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'




const OrderListScreen = ({history}) => {
  const dispatch = useDispatch()

const orderList = useSelector(state=>state.orderList)
const{ orders, error, loading } =  orderList

const userLogin = useSelector(state=>state.userLogin)
const{userInfo} =  userLogin



    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        }else{
            history.push('/login')
        }



  }, [dispatch, history])

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>AMOUNT</th>
              <th>DATE</th>
              <th>USER</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user._id}</td>
                <td>Ksh.{order.totalPrice}</td>
                <td>{order.createdAt}</td>
                <td>{order.user.name}</td>

                  <td>
                  {order.isPaid? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                  {order.isDelivered? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                  </td>
                  <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                       Details 
                       </Button>
                  </LinkContainer>
                </td>



            
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderListScreen
