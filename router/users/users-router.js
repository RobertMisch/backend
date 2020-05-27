const bcryptjs = require("bcryptjs");
const router = require("express").Router();

const Users = require("./users-model");
const { isValid } = require("./users-model");

//GET USERS
router.get('/', (req, res) => {
    Users.find()
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get users' });
        });
});

//CREATE USER
router.post("/", (req, res) => {
    const credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        // hash the password
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        // save the user to the database
        Users.add(credentials)
            .then(user => {
                res.status(201).json({ data: user });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password. The password shoud be alphanumeric",
        });
    }
});

//UPDATE / DELETE USER
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (isValid(changes)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        // hash the password
        const hash = bcryptjs.hashSync(changes.password, rounds);
        changes.password = hash;

        Users.findById(id)
            .then(users => {
                if (users) {
                    Users.update(changes, id)
                        .then(users => {
                            res.json(users);
                        });
                } else {
                    res.status(404).json({ message: 'Could not find user with given id' });
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to update user' });
            });
    } else {
        res.status(400).json({
            message: "please provide username and password. The password shoud be alphanumeric",
        });
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({ removed: deleted });
            } else {
                res.status(404).json({ message: 'Could not find user with given id' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete user' });
        });
});

module.exports = router;
//MIDDLEWARE


//example stuff from other projects

//MIDDLEWARE DEMO
// function validateProject(req, res, next) {

//     const { name, description } = req.body
//     if (!name || !description) {
//         res.status(400).json({ message: 'missing required field' })
//     } else {
//         next()
//     }
// }

// function validateAction(req, res, next) {

//     const { project_id, description, notes } = req.body
//     if (!description || !notes) {
//         res.status(400).json({ message: 'missing required field' })
//     } else {
//         next()
//     }
// }

// function validateProjectId(req, res, next) {

//     const { id } = req.params

//     projectData.get(id)
//         .then(project => {
//             if (project) {
//                 req.project = project
//                 next()
//             } else {
//                 res.status(404).json({ message: 'Project not found' });
//             }
//         })
//         .catch(error => {
//             res.status(400).json({ message: "invalid project id" })
//         })
// }

//CLEAN API RETURNS
// router.get('/:id', (req, res) => {
//     const { id } = req.params
//     let completion = 0
//     Projects.findById(id)
//         .then(projects => {
//             const finalReturn = { ...projects, tasks: [], resources: [] }
//             // console.log(finalReturn)
//             Projects.findTasksInfo(id)
//                 .then(tasks => {
//                     finalReturn.tasks = tasks.map(item => { return item })
//                     // completion++
//                     // res.status(200).json(finalReturn);
//                     Projects.findByResources(id)
//                         .then(resources => {
//                             finalReturn.resources = resources.map(item => { return item })
//                             // completion++
//                             res.status(200).json(finalReturn);
//                         })
//                         .catch(err => {
//                             res.status(500).json({ err, message: 'Failed to get resources' });
//                         });
//                 })
//                 .catch(err => {
//                     res.status(500).json({ err, message: 'Failed to get task' });
//                 });
//             // if(completion=2){
//             //     res.status(200).json(finalReturn);
//             // }
//         })
//         .catch(err => {
//             res.status(500).json({ message: 'Failed to get projects' });
//         });
// });