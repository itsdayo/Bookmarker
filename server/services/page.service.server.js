module.exports = function (app) {
  const pageModel = require("../models/page/page.model.server.js");

  app.post("/api/website/:wid/page", createPage);
  app.get("/api/website/:wid/page", findAllPagesForWebsite);
  app.get("/api/page/:pid", findPageById);
  app.put("/api/page/:pid", updatePage);
  app.delete("/api/page/:pid", deletePage);

  function createPage(req, res) {
    var wid = req.params["wid"];
    var page = req.body;
    // page.id = Math.floor(Math.random()*Math.floor(10000)).toString();
    //   page.websiteId = websiteId;
    //  pages.push(page);

    pageModel.createPage(page).then((page) => {
      res.json(page);
    });
  }

  function findAllPagesForWebsite(req, res) {
    var wid = req.params["wid"];
    // var result = [];
    // for (let x = 0; x < pages.length; x++) {
    //   if (pages[x].websiteId === websiteId) {
    //    result.push(pages[x]); }

    pageModel.findAllPagesForWebsite(wid).then((pages) => {
      res.json(pages);
    });
  }

  function findPageById(req, res) {
    var pid = req.params["pid"];
    pageModel.findPageById(pid).then((data) => {
      res.json(data);
    });
  }

  function updatePage(req, res) {
    let pid = req.params["pid"];
    let page = req.body;
    pageModel.updatePage(pid, page).then((data) => {
      res.json(data);
    });
  }

  function deletePage(req, res) {
    let pid = req.params["pid"];
    pageModel.deletePage(pid).then((data) => {
      res.json(data);
    });
  }
};
