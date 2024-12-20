import express from 'express'
import {CounterCollecion} from '../Controller/DashboardController.js'

const counterroutes=express.Router();

counterroutes.get("/countercollection",CounterCollecion)

export {counterroutes}