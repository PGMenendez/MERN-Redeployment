// console.log("model.js");
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "This Project needs a Name"],
        minLength: [3, "Name must be at least 3 letters."]
    },     
    
    dueDate: {
        type: Date,
        required: [true, "Each Project needs a due date"],
    },   
    backlog:{
        type: Boolean,
        default: true,
    },
    inProgress:{
        type: Boolean,
        default: false,
    },
    completed:{
        type: Boolean,
        default: false,
    },
    


}, {timestamps: true});

module.exports = mongoose.model('Project', ProjectSchema);