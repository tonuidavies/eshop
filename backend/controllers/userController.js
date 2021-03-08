import asyncHandler from 'express-async-handler'
// import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {


  const { email, password } = req.body
const user = await User.findOne({ email: email})

if (user && (await user.matchPasswords(password))){
  res.json({
    _id: user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token:generateToken(user._id)
  })

}else{
  res.status(401)
  throw new Error('Invalid email or password')
}

})

// @desc    register user
// @route   POST /api/user
// @access  Public
const registerUser = asyncHandler(async (req, res) => {


const { email, password, name } = req.body
const userExists = await User.findOne({ email})
 

if (userExists){
  res.status(400)
  throw new Error('User already exists!')
}
   const user = await User.create({ 
     name,
     email,
     password
   })
  
  if (user){
    res.status(201).json({
      _id: user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      token:generateToken(user._id)

    })
  }else{
    res.status(400)
    throw new Error('invalid user data')
  }

})


//Get user profile  
const getUserProfile =  asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)

  if (user){
    res.json({
      _id: user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
    })

  }else{
    res.status(404)
    throw new Error('User not found')

  }
})


//Update user profile
const updateUserProfile =  asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)

  if (user){    
      user.name = req.body.name || user.name
      user.email = req.user.email || user.email

  if(req.body.password){
    user.password = req.body.password
  }
  const updatedUser= await user.save()
  res.json({
    _id: updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email,
    isAdmin:updatedUser.isAdmin,
    token:generateToken(user._id)
  })


  }else{
    res.status(404)
    throw new Error('User not found')

  }
})


//@desc get all users 
//route GET/api/users
//access private - Admin
const getUsers =  asyncHandler(async(req, res) => {
  const users = await User.find({})
  res.json(users)
})

//@desc delete user
//route DELETE api/users/:id
//access private - Admin
const deleteUser=  asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id)
  if(user){
    await user.remove()
    res.json('User Deleted')
  }else{
    res.status(400)
    throw new Error('User not found')
  }
})


const getUserById =  asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id)

  if (user){
    res.json(user)  
  }else{
    res.status(400)
    throw new Error('User not found')
  }

})

//Admin update users
//route PUT/api/users/:id
const updateUser =  asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id)

  if (user){    
      user.name = req.body.name || user.name
      user.email = req.user.email || user.email
      user.isAdmin = req.user.isAdmin

  const updatedUser= await user.save()
  res.json({
    _id: updatedUser._id,
    name:updatedUser.name,
    email:updatedUser.email,
    isAdmin:updatedUser.isAdmin,
  })


  }else{
    res.status(404)
    throw new Error('User not found')

  }
})


export {getUsers, authUser, getUserProfile, registerUser, updateUserProfile, deleteUser, getUserById, updateUser }