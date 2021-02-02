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
    return db("items")
}

function findBy(filter) {
    //   console.log("filter", filter);
    return db("items")
        .where(filter)
}

function findById(id) {
    return db("items").where({ id }).first();
}

//add helpers
async function add(item) {
    try {
        const [id] = await db("items").insert(item, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}


//UD
function update(changes, id) {
    return db("items")
        .where({ id })
        .update(changes)
}
function remove(id) {
    return db("items")
        .where({ id })
        .del()
}

//middleware
function isValid(items) {
    return Boolean(items.name);
}