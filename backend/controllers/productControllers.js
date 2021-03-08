import asyncHandler from 'express-async-handler'

import Product from '../models/productModels.js'





//@desc---fetch all products
//@route--- GET /api/products
//@ access --- Public

const getProducts = asyncHandler( async(req, res)=>{
    const products = await Product.find({})
    res.json(products) 

})


//@desc---fetch all product by ID
//@route--- GET /api/products/id
//@ access --- Public
const getProductById =asyncHandler( async(req, res)=>{
    const product = await Product.findById(req.params.id)
    if (product){
        res.json(product)
    }else{
        res.status(404).json({message:'product not found'})
    }
})


export {getProductById, getProducts}