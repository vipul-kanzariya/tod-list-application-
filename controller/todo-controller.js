const {TodoModel} = require('../models');

// router.get('/',(req,res)=>{
//     res.status(200).json({
//         success:true,
//         data:todos
//     })
// })
exports.getAllTodos = async(req,res)=>{
    const todos = await TodoModel.find();
    if(todos.length === 0){
        return res.status(404).json({
            success:true,
            message:"No todos in the system"
        })
    }
    res.status(200).json({
        success:true,
        data:todos
    })
}
// router.get('/complete',(req,res)=>{
//     const complete = todos.filter((each)=> each.completed === true);
//     if(complete.length === 0){
//         return res.status(404).json({
//             success:false,
//             message:"No completed todos found"
//         })
//     }
//     res.status(200).json({
//         success:true,
//         data:complete
//     })
// })
exports.getCompletedTodos = async(req,res)=>{
    const complete = await TodoModel.find({completed:true});
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
}
exports.getTodoById = async(req,res) =>{
    const {id} = req.params;
    const todo = await TodoModel.findById(id);
    if(!todo){
        return res.status(404).json({
            success:false,
            message:`Todo not found ${id}`
        })
    }
    res.status(200).json({
        success:true,
        data:todo
    })
}

exports.createTodo = async(req,res)=>{
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success:false,
            message:"Please Provide data to create a todo"
        })
    }
    await TodoModel.create(data);
    res.status(201).json({
        success:true,
        message:"Todo created successfully"
    })
}
exports.updateTodoById = async(req,res) =>{
    const {id} = req.params;
    const {data} = req.body;
    const updatedTodo = await TodoModel.findByIdAndUpdate(id,data,{new:true});
    if(!updatedTodo){
        return res.status(404).json({
            success:false,
            message:`Todo not found for id: ${id}`
        })
    }
    res.status(200).json({
        success:true,
        message:"Todo updated successfully",
        data:updatedTodo
    })
}
exports.deleteTodoById = async(req,res) => {
    const {id} = req.params;
    const todo = await TodoModel.findById(id);
    if(!todo){
        return res.status(404).json({
            success:false,
            message:`Todo not found for id: ${id}`
        })
    }
    await TodoModel.findByIdAndDelete(id);
    res.status(200).json({
        success:true,
        message:"Todo deleted successfully"
    })
}
    

