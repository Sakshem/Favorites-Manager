const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 5,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Teacher', teacherSchema);