const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    username: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    finish: {type: Date, required: true},
    check: {type: Date, required: true},
    status: {type: Number, required: true},
}, {
    timestamps: true,
})

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;