// Import Dependencies
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB URL from the docker-compose file
const dbHost = 'mongodb://database/mean-docker';

// Connect to mongodb
mongoose.connect(dbHost);

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const User = mongoose.model('User', userSchema);

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

// GET all users
router.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if(err) res.status(500).send(error)
        res.status(200).json(users);
    });
});

// GET a user
router.get('/users/:id', (req, res) => {
    User.findById(req.param.id, (err, users) => {
        if(err) res.status(500).send(error);
        res.status(200).json(users);
    });
});

/* CREATE a user. */
router.post('/users', (req, res) => {
    let user = new User({
        name: req.body.name,
        age: req.body.age
    });

    user.save(error => {
        if (error) res.status(500).send(error);

        res.status(201).json({
            message: 'User created successfully'
        });
    });
});



module.exports = router;