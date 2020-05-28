const db = require("../../database/dbConfig");

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove,
    isValid,
    findAttendees,
    findPotluckItems,
    findPotluckItemsById,
    addItemToPotluck,
    removeItemFromPotluck
};

//normal finds
function find() {
    return db("potlucks")
}

function findBy(filter) {
    //   console.log("filter", filter);
    return db("potlucks")
        .where(filter)
}

function findById(id) {
    return db("potlucks").where({ id }).first();
}

//add helpers
async function add(item) {
    try {
        const [id] = await db("potlucks").insert(item, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

//UD
function update(changes, id) {
    return db("potlucks")
        .where({ id })
        .update(changes)
}
function remove(id) {
    return db("potlucks")
        .where({ id })
        .del()
}

//middleware
function isValid(potlucks) {
    return Boolean(potlucks.owner_id && potlucks.name && potlucks.where && potlucks.date && potlucks.category);
}

function findAttendees(id) {
    return db("user_attending").where({ potluck_id: id })
}
function findPotluckItems(id) {
    return db("potluck_items").where({potluck_id:id})
}
function findPotluckItemsById(id) {
    return db("potluck_items").where({id})
}
async function addItemToPotluck(item) {
    try {
        const [id] = await db("potluck_items").insert(item, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}
function removeItemFromPotluck(id) {
    return db("potluck_items")
        .where({ id })
        .del()
}