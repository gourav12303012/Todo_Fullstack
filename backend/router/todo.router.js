import express from 'express'
import { addTodo, allTask } from '../controler/todo.controler.js'

const router = express.Router()

router.route("/addtask").post(addTodo)
router.route("/allTask").get(allTask)

export default router