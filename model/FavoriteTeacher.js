const mongoose = require('mongoose');
const FavoriteTeacherSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Teacher'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FavoriteTeacher', FavoriteTeacherSchema);