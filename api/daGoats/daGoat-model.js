const db = require("../../data/dbConfig");

function getAll() {
  return db("daGoats");
}

function getById(id) {
  return db("daGoats").where("id", id).first();
}

async function insert(legend) {
  const [id] = await db("daGoats").insert(legend);
  return getById(id);
}

function remove(id) {
  return db("daGoats").where({ id }).del();
}

module.exports = { getAll, getById, insert, remove };
