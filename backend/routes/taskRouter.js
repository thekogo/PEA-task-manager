const router = require('express').Router();
let Task = require('../models/taskModel');

router.route('/').get( (req, res) => {
    const query = { status: {$ne : 5}}
    Task.aggregate([
        {
        $lookup: {
            from: "users", // collection name in db
            localField: "username",
            foreignField: "username",
            as: "userdetials"
        }
        },
        {
            $match : query,
        }
    ])
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err))
});



router.route('/add').post( (req, res) => {

    const username = req.body.username
    const title = req.body.title
    const description = req.body.description
    const finish = Date.parse(req.body.finish)
    const check = Date.parse(req.body.check)

    console.log(new Date(finish))
    const status = 0

    const newTask = new Task({
        username,
        title,
        description,
        finish,
        check,
        status,
    })
    

    newTask.save()
    .then( () => res.json('Task added!'))
    .catch( (err) => res.status(400).json('Error :' + err))
})

router.route('/:username').get( (req, res) => {
    const username = req.params.username;
    const query = { username: username, status: {$ne : 5}}
    Task.aggregate([
        {
        $lookup: {
            from: "users", // collection name in db
            localField: "username",
            foreignField: "username",
            as: "userdetials"
        }
        },
        {
            $match: query,
        }
    
    ])
    .then(tasks => res.json(tasks))
    .catch( (err) => res.status(400).json('Error : ' + err))
})

router.route('/delete/:id').delete( (req, res) => {
    const id = req.params.id;
    Task.findByIdAndUpdate(id, {status: 5})
    .then( () => res.json('Update'))
    .catch( (err) => res.status(400).json('Error : ' + err))
})

router.route('/edit/:id').patch( (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const finish = Date.parse(req.body.finish)
    const check = Date.parse(req.body.check)
    const status = req.body.status

    const id = req.params.id;
    Task.findByIdAndUpdate(id, {title: title, description: description, finish: finish, check: check, status: status})
    .then( () => res.json('Update'))
    .catch( (err) => res.status(400).json('Error : ' + err))
})

router.route('/show/:id').get( (req, res) => {
    const id = req.params.id;
    console.log(id)
    const query = { status: {$ne : 5}, _id: id}
    Task.findById(id)
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;