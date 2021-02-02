const db = require("../../database/dbConfig");

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove,
    isValid,

    findUserPotlucks,
    // addUserPotlucks,
    // deleteUserPotlucks,

    findUserAttending,
    findUserAttendingById,
    addUserAttending,
    updateUserAttending,
    removeUserAttending
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


//add helpers
async function add(user) {
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

//potluck ownership stuff
function findUserPotlucks(id) {
    return db("potlucks").where({ owner_id: id })
}

// async function addUserPotlucks(potluck) {
//     try {
//         const [id] = await db("potlucks").insert(potluck, "id");

//         return findById(id);
//     } catch (error) {
//         throw error;
//     }
// }
// function deleteUserPotlucks(id){

// }


//attendee table stuff
function findUserAttending(id) {
    return db("user_attending").where({ attendee_id: id })
}
function findUserAttendingById(id) {
    return db("user_attending").where({ id }).first()
}
async function addUserAttending(attendee) {
    try {
        const [id] = await db("user_attending").insert(attendee, "id");

        return findById(id);
    } catch (error) {
        throw error;
    }
}
function updateUserAttending(id){
    return db("user_attending")
        .where({ id })
        .update(changes)
}

function removeUserAttending(id){
    return db("user_attending")
        .where({ id })
        .del()
}