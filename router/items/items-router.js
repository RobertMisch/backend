const router = require("express").Router();

const Items = require("./items-model");
const { isValid } = require("./items-model");

//GET Items
router.get('/', (req, res) => {
    Items.find()
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get items' });
        });
});
router.get('/:id', (req, res) => {
    const { id } = req.params
    Items.findById(id)
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get items' });
        });
});
//POST
router.post("/", (req, res) => {
    const changes = req.body
    if (isValid(changes)) {
        Items.add(changes)
            .then(item => {
                res.status(201).json({ data: item });
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            });
    } else {
        res.status(400).json({
            message: "please provide a name",
        });
    }
});
//UD
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    if (isValid(changes)) {

        Items.findById(id)
            .then(items => {
                if (items) {
                    Items.update(changes, id)
                        .then(items => {
                            res.status(201).json(changes);
                        });
                } else {
                    res.status(404).json({ message: 'Could not find item with given id' });
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'Failed to update item' });
            });
    } else {
        res.status(400).json({
            message: "item should have a name",
        });
    }
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let returnData = {};
    Items.findById(id)
        .then(items => {
            returnData=items;
            Items.remove(id)
                .then(deleted => {
                    if (deleted) {
                        res.json({ removed: returnData });
                    } else {
                        res.status(404).json({ message: 'Could not find item with given id' });
                    }
                })
                .catch(err => {
                    res.status(500).json({ message: 'Failed to delete item' });
                });
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get items' });
        });
});
module.exports = router;