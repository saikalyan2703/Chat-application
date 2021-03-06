const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Chat = require('../models/chat');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const db = "mongodb://saikalyan2703:saikalyan2703@ds133627.mlab.com:33627/strangerchatapplication";
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
    if(err){
        console.error("Error! " + err);
    }
    else{
        console.log("Connection successful");
    }
});

router.post('/login', function(req, res){
    console.log('Get a user');
    var newUser = new User();
    newUser.email = req.body.email;
    newUser.password = req.body.pwd;

    User.find({"email":newUser.email})
    .exec(function(err, user){
        if (user.length==0){
            console.log("Entered email is not registered");
            res.json({flag:"error email"});
        }
        else {
            if(user[0].password==newUser.password){
                User.findOneAndUpdate({"email":newUser.email},{ $set: { "firstname": "acde","lastname":user[0].lastname, "email":user[0].email,"password": user[0].password,"status":"1" }}, function(err,updatedUser){
                    res.json({flag:"success",user:updatedUser});
                });
            }
            else{
                res.json({flag:"error password"});
            }
            
        }
    });

});

router.post('/register', function(req, res){
    console.log('Post a user');
    var newUser = new User();
    newUser.firstname = req.body.firstName;
    newUser.lastname = req.body.lastName;
    newUser.email = req.body.email;
    newUser.password = req.body.password.pwd;
    newUser.status = "0";

    User.find({"email":newUser.email})
    .exec(function(err, user){
        if (user.length==0){
            console.log("User does not exist");
            newUser.save(function(err, insertedUser){
                if (err){
                    console.log('Error saving user');
                }else{
                    res.json({flag:"success"});
                }
            });
        }
        else {
            res.json({flag:"error"});
        }
    });

});

router.post('/logout', function(req, res){
    console.log('Logout');
    var newUser = new User();
    newUser.email = req.body.email;
    User.findOneAndUpdate({"email":newUser.email},{ $set: { "status":"0" }}, function(err,updatedUser){
        res.json({flag:"success"});
    });
});

router.post('/chat', function(req, res){
    console.log('Get chat');
    var newChat = new Chat();
    newChat.from = req.body.from;
    newChat.to = req.body.to;
    console.log(newChat.from);
    console.log(newChat.to);
    Chat.find({$or: [{$and:[{"from":newChat.from},{"to":newChat.to}]}, {$and:[{"from":newChat.to},{"to":newChat.from}]}]})
    .exec(function(err, chat){
        // console.log(chat);
        res.json(chat);
    })

});

router.post('/message', function(req, res){
    console.log('Send message');
    var newChat = new Chat();
    newChat.from = req.body.from;
    newChat.to = req.body.to;
    newChat.message = req.body.msg;
    Chat.find({$and:[{"from":newChat.from},{"to":newChat.to}]},{"messages":1,_id:0})
    .exec(function(err, chat){
        chat[0].messages.push(newChat.message);
        Chat.findOneAndUpdate({$and:[{"from":newChat.from},{"to":newChat.to}]},{ $set: { "messages":chat[0].messages }}, function(err,updatedChat){
            res.json({flag:"success"});
        });
    });

});

module.exports = router;