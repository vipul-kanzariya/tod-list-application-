const express = require('express');
const todosRouter = require('./routes/todos');
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        message: "This is Home page"
    })
})
app.use('/todos',todosRouter);
const PORT = 4000;

app.listen(PORT,()=>{
    console.log("Server is Running PORT http://localhost:"+PORT);
    
})