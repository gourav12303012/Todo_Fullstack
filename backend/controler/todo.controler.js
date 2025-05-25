import { Todo } from "../model/todo.model.js"

export const addTodo = async(req,res)=>{
    try {
        const{ title,description,priority,date
        }=req.body

        if(!title||
!description||
!priority||
!date){
    return res.status(403).json({
        message:"required fields is missing",
        success: false
    })
}
const newTask = await Todo.create({title,
description,
priority,
date})

return res.status(200).json({
    message:"successfully add new todo",
    success: true,
    task:newTask
})
    } catch (error) {
        console.log("server is not working"+error)
    }
}


export const allTask = async(req,res)=>{
    try {
       const allData = await Todo.find()

       return res.status(200).json({
        message:"successfully fetech data",
        success: true,
        data: allData
       })
       
       
    } catch (error) {
        
    }
}