const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//   "task": "mern stack",
//         "description":"complete the mern stack course",
//         "date" : "5/16/2026",
//         "completed" : false
const todoSchema =new Schema({
    task:{
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        required:true
    }
},{timestamps:true})
module.exports =mongoose.model('Todo',todoSchema);