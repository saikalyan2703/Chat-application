const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');

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
                    console.log(user);
                    console.log(updatedUser);
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

router.get('/users', function(req, res){
    console.log('Extracting online users');
    User.find({$and:[{"status":"1"},{"email":{$ne:"saikalyan2703@gmail.com"}}]},{password: false, _id: false, status: false})
    .exec(function(err, users){
        console.log(users);
        res.json(users);
    });
});

router.post('/logout', function(req, res){
    console.log('Logout');
    var newUser = new User();
    newUser.email = req.body.email;
    User.findOneAndUpdate({"email":newUser.email},{ $set: { "status":"0" }}, function(err,updatedUser){
        console.log(updatedUser);
        res.json({flag:"success"});
    });
});

module.exports = router;