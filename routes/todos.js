const express = require('express');
const {todos} =require('../data/todos.json');

const router =express.Router();
/**
 * Route : /todos
 * Method : GET
 * Description : Get the list of todos in the system
 * Access : public
 * Parameter : None
 */
router.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        data:todos
    })
})
/**
 * Route : /todos/complete
 * Method : GET
 * Description : Get completed todos
 * Access : public
 * Parameter : none
 */
router.get('/complete',(req,res)=>{
    const complete = todos.filter((each)=> each.completed === true);
    if(complete.length === 0){
        return res.status(404).json({
            success:false,
            message:"No completed todos found"
        })
    }
    res.status(200).json({
        success:true,
        data:complete
    })
})
/**
 * Route : /todos/:id
 * Method : GET
 * Description :  Get the todo by id
 * Access : public
 * Parameter : id
 */
router.get('/:id',(req,res)=>{
    const {id} = req.params;
    const todo = todos.find((each)=> each.id === id);
    if(!todo){
        return res.status(404).json({
            success:false,
            message:`Todo not found ${id}`
        })
    }
    res.status(200).json({
        success:true,
        data: todo
    })
})
/**
 * Route : /todos/
 * Method : POST
 * Description :  Create a new todos
 * Access : public
 * Parameter : None
 */
router.post('/',(req,res)=>{
    const {id,task,description,date,completed} = req.body;
    if(!id || !task || !description || !date || completed){
        return  res.status(400).json({
            success:false,
            message:`Please provide all the required fields`
        })
    }
    const todo= todos.find((each) => each.id === id);
     if(todo){
        return res.status(409).json({
            success:false,
            message: `Todo already Exists with id :${id}`
        })
    }
    todos.push({
        id,
        task,
        description,
        date,
        completed
    })
    res.status(200).json({
        success:true,
        message:"Todo created successfully"
    })
})
/**
 * Route : /todos/
 * Method : PUT
 * Description :  Updating a todo by their id
 * Access : public
 * Parameter : id
 */
router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    const todo = todos.find((each)=> each.id === id);
    if(!todo){
          return res.status(404).json({
            success:false,
            message:`Todo not found ${id}`
        })
    }
    const updatedTodo = todos.map((each)=>{
        if(each.id === id){
           return { ...each,
            ...data
           }
        }
        return each
    })
      res.status(200).json({
            success:true,
            data: updatedTodo,
            message: `Todo Updated successfully`
        })
})
/**
 * Route : /todos/:id
 * Method : DELETE
 * Description : Deleting todo by their id
 * Access : public
 * Parameter : id
 */
router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    const todo = todos.find((each)=> each.id === id);
    if(!todo){
        return res.status(404).json({
            success:false,
            message:`Todo not found for id : ${id}`
        })
    }
    const deletedTodo = todos.filter((each) => each.id !== id);
    res.status(200).json({
        success:true,
        data:deletedTodo,
        message:"Todo deleted successfully"
    })
})

module.exports = router;