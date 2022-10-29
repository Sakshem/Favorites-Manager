const router = require('express').Router();
const verify = require('./verifyToken');
const teacher = require('../model/Teacher');
const {teacherValidation} = require('../validation');
const FavoriteTeacher = require('../model/FavoriteTeacher');
const jwt = require('jsonwebtoken');


// get list of all the teachers
router.get('/', verify, async (req, res) => {
    try {
        const teachers = await teacher.find();
        res.json(teachers);
    } catch(err) {
        res.status(404).send(err);
    }
});

// submit teacher information
router.post('/', verify, async (req, res) => {
    // checking if the teacher entry format is correct
    const {error} = teacherValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // checking if the teacher already exists in the database
    const teacherExist = await teacher.findOne({email: req.body.email});
    if (teacherExist) return res.status(400).send('Teacher already exists');

    // creating a new teacher
    const newTeacher = new teacher({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date
    });

    try {
        const savedTeacher = await newTeacher.save();
        res.json(savedTeacher);
    } catch(err) {
        res.status(400).send(err);
    }
});

// getting a list of all favorite teacher
router.get('/favorite', verify, async (req, res) => {
    const token = req.header('auth-token');
    const loggedInStudentId = jwt.verify(token, process.env.TOKEN_SECRET)._id;
    console.log('studentId: ', loggedInStudentId);
    try {
        const favoriteTeachers = await FavoriteTeacher.find({studentId: loggedInStudentId})
        // console.log('favoriteTeachers: ', favoriteTeachers); 
        res.json(favoriteTeachers);

    } catch(err) {
        res.status(400).send(err);
    }
});

// returns most favorite of all teachers
router.get('/mostFavorite', verify, async (req, res) => {
    try {
        const mostFavTeacher = await
            FavoriteTeacher.aggregate([
                {$group: {_id: "$teacherId", count: {$sum: 1}}},
                {$sort: {count: -1}},
                {$limit: 1}
            ]);
            res.json(mostFavTeacher);
    } catch(err) {
        res.status(400).send(err);
    }
});

// get a specific teacher based on it's id
router.get('/:teacherId', verify, async (req, res) => {
    console.log(req.params.teacherId);
    try {
        const teacherById = await teacher.findById(req.params.teacherId);
        res.json(teacherById);
    } catch(err) {
        res.status(400).send(err);
    }
});

// delete a teacher based on it's id
router.delete('/:teacherId', verify, async (req, res) => {
    try {
        const removedTeacher = await teacher.remove({_id: req.params.teacherId});
        res.json(removedTeacher);
    } catch(err) {
        res.status(400).send(err);
    }
});

// update a teacher based on it's id
router.patch('/:teacherId', verify, async (req, res) => {
    try {
        const updatedTeacher = await teacher.updateOne(
            {_id: req.params.teacherId},
            {$set: {
                    name: req.body.name,
                    email: req.body.email
                }
            }
        );
        res.json(updatedTeacher);
    } catch(err) {
        res.status(400).send(err);
    }
});

// router.get('/fav', verify, (req, res) => {
//     const token = req.header('auth-token');
//     var loggedInStudentId = (jwt.verify(token, process.env.TOKEN_SECRET)._id);
//     console.log("studentId: ", loggedInStudentId);
//     try {
//         // const teachersId = await FavoriteTeacher.findOne({ studentId: loggedInStudentId });
//         // // const teachersId = await FavoriteTeacher.findById(loggedInStudentId);
//         // // const teachersId = await FavoriteTeacher.findById(loggedInStudentId);
//         // console.log("teachersId: ", teachersId);
//         // res.json(teachersId);
//     } catch(err) {
//         res.status(400).send(err);
//     }
// });


// adding a teacher favorite
router.post('/favorite/:teacherId', verify, async (req, res) => {

    // getting the student id from jwt token
    const token = req.header('auth-token');
    const loggedInStudentId = jwt.verify(token, process.env.TOKEN_SECRET)._id;
 
    // checking if the teacher is already in the favorite list
    const alreadyFavorite = await FavoriteTeacher.findOne({ studentId: loggedInStudentId, teacherId: req.params.teacherId });
    if (alreadyFavorite) return res.status(400).send('Teacher is already present in the favorite list');
    
    const favoriteTeacher = new FavoriteTeacher({
        studentId: loggedInStudentId,
        teacherId: req.params.teacherId
    });
    try {
        // adding the teacher to their favorite list
        const savedFavoriteTeacher = await favoriteTeacher.save();
        res.json(savedFavoriteTeacher);
    } catch(err) {
        res.status(400).send(err);
    }
});


// removing a teacher from favorite 
router.delete('/favorite/:teacherId', verify, async (req, res) => {
    const token = req.header('auth-token');
    const loggedInStudentId = jwt.verify(token, process.env.TOKEN_SECRET)._id;

    // checking if the teacher is added as favorite or not
    const isFavorite = await FavoriteTeacher.findOne( {studentId: loggedInStudentId, teacherId: req.params.teacherId });
    if (!isFavorite) return res.status(400).send('Teacher is not added as favorite');

    try {
        const removedFavorite = await FavoriteTeacher.remove( {teacherId: req.params.teacherId});
        res.json(removedFavorite);
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;