const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    // validating the data before saving the user
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('User already exists');

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        // save the user
        const savedUser = await user.save();
        // res.send({ user: user._id});
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    // validating the data before logging in the user
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if (!user)return res.status(400).send("Email doesn't exists");
    
    // checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    // create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
    // res.send('logged in');


});
module.exports = router;