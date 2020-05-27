const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  isValid
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

function isValid(user) {
    return Boolean(user.username && user.password && typeof user.password === "string");
  }