const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    from:String,
    to:String,
    messages:Array
});

module.exports = mongoose.model('chat', ChatSchema, 'chats');