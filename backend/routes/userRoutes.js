import express from 'express'
import  {authUser, getUserProfile, getUsers, registerUser, updateUserProfile, deleteUser, getUserById, updateUser}  from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

const router = express.Router()


router.route('/').get(protect, admin, getUsers)
router.route('/:id').delete(protect, admin, deleteUser ).get(protect, admin, getUserById).put(protect, updateUserProfile).put(protect,admin, updateUser)
router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)




 export default router
