import express from 'express'
import path from "path";
import dotenv from 'dotenv'
import morgan from 'morgan';
import colors from 'colors'
import connectDB from './config/db.js'
import productsRoutes from './routes/productsRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())
 if ( process.env.NODE_ENV == 'development'){
     app.use(morgan('dev'))
 }

app.use('/api/products', productsRoutes)
app.use('/api/users', userRoutes) 
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)


app.get('/api/config/paypal', (req, res)=>res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler) 

app.get('/', (req, res)=>{
    res.send('we are here')
})


const PORT = process.env.PORT||4000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow )) 