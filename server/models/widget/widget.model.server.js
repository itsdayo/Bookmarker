const db = require("../db");

const WidgetModel = {
  async createWidget(widget) {
    return db("widgets")
      .insert(widget)
      .returning("*")
      .then((result) => {
        return result[0];
      })
      .catch((err) => console.log(err));
  },

  async findAllWidgetsForPage(pid) {
    return db("widgets")
      .where("pageId", pid)
      .catch((err) => console.log(err));
  },

  async findWidgetById(wgid) {
    return db("widgets")
      .where("id", wgid)
      .first()
      .catch((err) => console.log(err));
  },

  async updateWidget(wgid, widget) {
    return db("widgets")
      .where("id", wgid)
      .update(widget)
      .returning("*")
      .catch((err) => console.log(err));
  },

  async deleteWidget(wgid) {
    return db("widgets")
      .where("id", wgid)
      .del()
      .catch((err) => console.log(err));
  },
};

module.exports = WidgetModel;
