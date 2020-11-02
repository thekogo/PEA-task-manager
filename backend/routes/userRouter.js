const router = require('express').Router();
let User = require('../models/userModel');

router.route('/').get( (req, res) => {
    User.find().select('-updatedAt -createdAt -__v')
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:username').get( (req, res) => {
    const username = req.params.username;
    const query = { username: username }
    User.find(query)
    .then(users => res.json(users))
    .catch( (err) => res.status(400).json('Error : ' + err))
})

router.route('/edit/:id').patch( (req, res) => {
    const displayName = req.body.displayName;
    const position = req.body.position;
    const gdrive = req.body.gdrive;

    const id = req.params.id;
    User.findByIdAndUpdate(id, {displayname: displayName, position: position, gdrive: gdrive})
    .then( () => res.json('Update'))
    .catch( (err) => res.status(400).json('Error : ' + err))
})

module.exports = router;