const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true},
    uid: { type: String, required: true},
    displayname: { type: String, required: true},
    position: { type: String},
    gdrive: { type: String},
} , {
    timestamps: true,
});

const User = mongoose.model('Users', userSchema);

module.exports = User;