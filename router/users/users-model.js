const db = require("../../database/dbConfig");

module.exports = {
    find,
    findBy,
    findById,
    findUserPotlucks,
    findUserAttending,
    add,
    addUserAttending,
    update,
    remove,
    isValid
};

//normal finds
function find() {
    return db("users")
}

function findBy(filter) {
    //   console.log("filter", filter);
    return db("users")
        .where(filter)
}

function findById(id) {
    return db("users").where({ id }).first();
}

//find extra details in the relational tables
function findUserPotlucks(id) {
    return db("potlucks").where({ owner_id:id })
}
function findUserAttending(id) {
    return db("user_attending").where({ attendee_id:id })
}

//add helpers
async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}
async function addUserAttending(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}

//UD
function update(changes, id) {
    return db("users")
        .where({ id })
        .update(changes)
}
function remove(id) {
    return db("users")
        .where({ id })
        .del()
}

//middleware
function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
}