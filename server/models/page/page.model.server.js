const db = require("../db");

const PageModel = {
  async createPage(page) {
    return db("pages")
      .insert(page)
      .returning("*")
      .catch((err) => console.log(err));
  },

  async findPageById(pid) {
    return db("pages")
      .where("id", pid)
      .first()
      .catch((err) => console.log(err));
  },

  async findAllPagesForWebsite(wid) {
    return db("pages")
      .where("websiteId", wid)
      .catch((err) => console.log(err));
  },

  async updatePage(pid, page) {
    return db("pages")
      .where("id", pid)
      .update(page)
      .returning("*")
      .catch((err) => console.log(err));
  },

  async deletePage(pid) {
    return db("pages")
      .where("id", pid)
      .del()
      .catch((err) => console.log(err));
  },
};

module.exports = PageModel;
