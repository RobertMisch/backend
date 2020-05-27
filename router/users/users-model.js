const db = require("../../database/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  isValid,
  update,
  remove
};

function find() {
  return db("users")
}

function findBy(filter) {
//   console.log("filter", filter);
  return db("users")
    .where(filter)
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
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