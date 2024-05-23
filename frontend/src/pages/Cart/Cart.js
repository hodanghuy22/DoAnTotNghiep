import React from 'react'
import { Container } from 'react-bootstrap'
import CartList from './CartList'
import Payment from './Payment'
import './../../assets/css/cart.css'

const Cart = () => {
    return (
        <Container className=' w-75 border'>
           <CartList/>
           <Payment/>
        </Container>
    )
}

export default Cart