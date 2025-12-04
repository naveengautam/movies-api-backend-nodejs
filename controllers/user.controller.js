const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const JWTtoken = require('../middleware/jwt.middleware');

// Controller to create a new user

exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        console.log('Received user data:', userData);
        const password = userData.password || 'defaultPassword123';
        const hashedPassword = await bcrypt.hash(password, 10);
        userData.password = hashedPassword;
        
        const newUser = await User.create(userData);
        res.status(201).json({
            message: 'User created successfully',
            success: true,
            data: newUser,
            error: {}
        });
    } catch(error) {
        console.log('Received user data:', req.body);
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: {},
            error: error.message
        })
    }
}

// Controller to login user

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
                data: {},
                error: 'No user with the given email'
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid password',
                success: false,
                data: {},
                error: 'Password does not match'
            });
        }
        if(user.status !== 'active') {
            return res.status(500).json({
                message: 'User is not active',
                success: false,
                data: {},
                error: 'User is not active anymore.'
            });
        }
        const token = JWTtoken.generateToken(user._id);
        //save token in the user document
        user.token = token;
        await user.save();

        res.status(200).json({
            message: 'Login successful',
            success: true,
            data: { token },
            error: {}
        });
    } catch(error) {
        res.status(500).json({
            message: 'Something went wrong',
            success: false,
            data: {},
            error: error.message
        })
    }
}