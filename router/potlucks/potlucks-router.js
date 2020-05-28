const router = require("express").Router();

const Potlucks = require("./potlucks-model");
const { isValid } = require("./potlucks-model");

//GET Items
router.get('/', (req, res) => {
    Potlucks.find()
        .then(potlucks => {
            res.status(200).json(potlucks);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get potlucks' });
        });
});
router.get('/:id', (req, res) => {
    const { id } = req.params
    Potlucks.findById(id)
        .then(potlucks => {
            res.status(200).json(potlucks);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get potlucks' });
        });
});
//POST
router.post("/", (req, res) => {
    const changes = req.body
    if (isValid(changes)) {
        Potlucks.add(changes)
            .then(potluck => {
                res.status(201).json({ data: potluck });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide a json object with {owner_id, name, where, date, category}",
        });
    }
});
//UD
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (isValid(changes)) {

        Potlucks.findById(id)
            .then(potluck => {
                if (potluck) {
                    Potlucks.update(changes, id)
                        .then(potluck => {
                            res.status(201).json(changes);
                        });
                } else {
                    res.status(404).json({ message: 'Could not find potluck with given id' });
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to update potluck' });
            });
    } else {
        res.status(400).json({
            message: "potluck should hae a name",
        });
    }
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let returnData = {};
    Potlucks.findById(id)
        .then(potluck => {
            returnData=potluck;
            Potlucks.remove(id)
                .then(deleted => {
                    if (deleted) {
                        res.json({ removed: returnData });
                    } else {
                        res.status(404).json({ message: 'Could not find potluck with given id' });
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: 'Failed to delete potluck' });
                });
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get potluck' });
        });
});
module.exports = router;