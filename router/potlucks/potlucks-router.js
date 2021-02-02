const router = require("express").Router();

const Potlucks = require("./potlucks-model");
const { isValid } = require("./potlucks-model");

//GET potlucks
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
            const finalReturn = { ...potlucks, attendees: [], items: [] }
            Potlucks.findAttendees(id)
                .then(attendees => {
                    finalReturn.attendees = attendees.map(item => { return item })
                    Potlucks.findPotluckItems(id)
                        .then(items => {
                            finalReturn.items = items.map((items) => { return items})
                            res.status(200).json(finalReturn);
                            // finalReturn.items = items.map((items) => {
                            //     Potlucks.findItemById(items.item_id)
                            //         .then((item) => {
                            //             console.log({ ...items, item_name: item })
                            //             const toBeReturned = { ...items, item_name: item }
                            //             return toBeReturned
                            //         })
                            //         .catch(err => {
                            //             res.status(500).json({ message: 'Failed to get items' });
                            //         });
                            //         res.status(200).json(finalReturn);
                            // })
                        })
                        .catch(err => {
                            res.status(500).json({ message: 'Failed to get items' });
                        });
                    })
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
                res.status(500).json({error, message: error.message });
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
            returnData = potluck;
            Potlucks.remove(id)
                .then(deleted => {
                    if (deleted) {
                        res.json({ removed: returnData });
                    } else {
                        res.status(404).json({ message: 'Could not find potluck with given id' });
                    }
                })
                .catch(err => {
                    res.status(500).json({err, message: 'Failed to delete potluck' });
                });
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to get potluck' });
        });
});
//add delete item from potluck
router.get("/items/:id", (req, res) => {
    const { id } = req.params;
    Potlucks.findPotluckItems(id)
        .then(items => {
            res.status(200).json(items);
        })
        .catch(err => {
            res.status(500).json({ err, message: 'Failed to get attending' });
        })
})
router.post("/items/:id", (req, res) => {
    const { id } = req.params;
    const { item_id, being_brought_by } = req.body;
    const newItem = { potluck_id: id, item_id: item_id, being_brought_by: being_brought_by }

    Potlucks.addItemToPotluck(newItem)
        .then(user => {
            res.status(201).json(newItem);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });
        });
});
router.delete("/items/:id", (req, res) => {
    const { id } = req.params;

    Potlucks.findPotluckItemsById(id)
        .then(potluck => {
            let potluckItem = potluck
            Potlucks.removeItemFromPotluck(id)
                .then(user => {
                    res.status(201).json({ data: potluckItem });
                })
                .catch(error => {
                    res.status(500).json({ message: error.message });
                });
        })
        .catch(err => {
            res.status(500).json({ err, message: 'Failed to get potluck_items' });
        })
});
module.exports = router;