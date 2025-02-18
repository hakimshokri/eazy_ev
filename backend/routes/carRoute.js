import express from 'express'
import { carList } from '../controllers/carController.js'

const carRouter = express.Router()

carRouter.get('/list', carList)

export default carRouter