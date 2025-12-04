const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: false },
    password: { type: String, required: true},
    token: { type: String, required: false },
    role: { 
        type: String, 
        required: true,
        enum: ['superadmin','admin','seller', 'user'],
         default: 'user'
    },
    status: { 
        type: String, 
        required: true,
        default: 'active',
        enum: ['active', 'inactive', 'blocked']
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;