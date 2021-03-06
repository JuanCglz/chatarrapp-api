const router = require('express').Router();
const auth = require('../middleware/auth')
let Attempt = require('../models/attempt.model');

//router.use(auth)

router.route('/scores').get((req,res) => {
    Attempt.find()
        .then(attempts => res.json(attempts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Scores for the current month
router.route('/scoresCurrent/:id').get((req,res) => {
    date = new Date()
    month = date.getMonth()
    year = date.getFullYear()
    Attempt.find({date : {$gte: new Date(year,month,1)}}).sort({"score" : "desc"}).limit(5)
        .then(attempts => res.json(attempts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Scores for the past month
router.route('/scoresPast/:id').get((req,res) => {
    date = new Date()
    month = date.getMonth() - 1
    year = date.getFullYear()
    Attempt.find({date : {$gte: new Date(year,month,1), $lte: new Date(year, month, 31)}}).sort({"score" : "desc"}).limit(5)
        .then(attempts => res.json(attempts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Scores for the current week
router.route('/scoresWeek/:id').get((req,res) => {
    date = Date.now()
    today = new Date(date)
    week = 1000 * 60 * 60 * 24 * 7
    lastWeek = new Date(today - week)
    //console.log(today, lastWeek, date, week)
    Attempt.find({date : {$gte: lastWeek, $lte: today}}).sort({"score" : "desc"})
        .then(attempts => res.json(attempts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/isValid').post((req,res) => {
    const user = req.body.username;
    const examID = req.body.examID;
    Attempt.find({username: user, examID: examID})
        .then(attempts => res.json(attempts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const examName = req.body.examName;
    const examID = req.body.examID;
    const score = Number(req.body.score);
    const attempt = 1;
    const date = Date.parse(req.body.date);
    
    const newAttempt = new Attempt({
        username,
        examName,
        examID,
        score,
        attempt,
        date
    });

    newAttempt.save()
        .then(() => res.json('Attempt recorded!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Attempt.findById(req.params.id)
        .then(attempt => res.json(attempt))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => {
    Attempt.findByIdAndDelete(req.params.id)
        .then(attempt => res.json('Attempt deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Attempt.findById(req.params.id)
        .then(attempt => {
            attempt.username = req.body.username;
            attempt.exam = req.body.exam;
            attempt.score = Number(req.body.score);
            attempt.date = Date.parse(req.body.date);

            attempt.save()
                .then(() => res.json('Exam updated!'))
                .catch(err => res.status(400).json('Error: ' + err));

        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;