const db = require("../../database/dbConfig");

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove,
    isValid
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