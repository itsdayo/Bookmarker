const db = require("../db");

const WebsiteModel = {
  async createWebsite(website) {
    return db("websites")
      .insert(website)
      .returning("*")
      .catch((err) => console.log(err));
  },

  async findWebsiteById(wid) {
    return db("websites")
      .where("id", wid)
      .first()
      .catch((err) => console.log(err));
  },

  async findAllWebsitesForUser(uid) {
    return db("websites")
      .where("developerId", uid)
      .orderBy("name", "asc")
      .orderBy("description", "asc")
      .catch((err) => console.log(err));
  },

  async updateWebsite(wid, website) {
    return db("websites")
      .where("id", wid)
      .update(website)
      .returning("*")
      .catch((err) => console.log(err));
  },

  async deleteWebsite(wid) {
    return db("websites")
      .where("id", wid)
      .del()
      .catch((err) => console.log(err));
  },
};

module.exports = WebsiteModel;
