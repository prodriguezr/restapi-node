const User = require('../models/user');
const { registerValidation, loginValidation } = require('../models/validators');
const bcryptjs = require('bcryptjs');
const authCtrl = {};
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

authCtrl.registerUser = async (req, res) => {
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).json({ 'status': 'ERROR', 'error': error });

    const userExists = await User.findOne({
        username: req.body.username,
        email: req.body.email,
    });

    if (userExists) return res.status(400).json({ 'status': 'ERROR', 'message': 'User already exists' });
    
    var thisName = '';
    if (req.body.name)
        thisName = req.body.name;
    else
        thisName = req.body.username;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(req.body.password, salt);

    const user = new User ({
        name: thisName,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        await user.save();

        res.status(200).json(`User '${req.body.username}' successfully created`);
    }
    catch(err) {
        res.status(400).json(err['message']);
    }
}

authCtrl.loginUser = async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).json({ 'status': 'ERROR', 'message': error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ 'status': 'ERROR', 'message': 'User not exists'});
    
    const validPassword = await bcryptjs.compare(req.body.password, user.password);

    if (!validPassword) return res.status(400).json({ 'status': 'ERROR', 'message': 'Invalid password' });

    const dotenv = require('dotenv');

    dotenv.config();

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    res.header('suth-token', token).json({ 'status': 'OK', 'message': 'Token successfully created', 'token': token});
}

module.exports = authCtrl;