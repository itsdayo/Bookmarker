const db = require("../db");

const UserModel = {
  async createUser(user) {
    return db("users")
      .insert(user)
      .returning("*")
      .catch((err) => console.log(err, "createUser"));
  },

  async findUserById(uid) {
    return db("users")
      .where("id", uid)
      .first()
	  .catch((err) => console.log(err, "findUserById"));
  },

  async findUserByUsername(username) {
    return db("users")
      .where("username", username)
      .first()
      .catch((err) => console.log(err, "findUserByUsername"));
  },

  async findUserByCredentials(username, password) {
    return db("users")
      .where("username", username)
      .andWhere("password", password)
      .first()
      .catch((err) => console.log(err, "findUserByCredentials"));
  },

  async updateUser(uid, user) {
    return db("users")
      .where("id", uid)
      .update(user)
      .returning("*")
      .catch((err) => console.log(err, "updateUser"));
  },

  async deleteUser(uid) {
    return db("users")
      .where("id", uid)
      .del()
	  .catch((err) => console.log(err, "deleteUser"));
  },
};

module.exports = UserModel;
